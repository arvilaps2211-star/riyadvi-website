/**
 * Creates an admin_users row with a properly bcrypt-hashed password.
 *
 * There is deliberately no HTTP "register admin" endpoint — admin accounts
 * are provisioned out-of-band, by whoever has direct database/server
 * access, via this script. This keeps "who can create an admin" a
 * deployment/ops decision, not something reachable over the network.
 *
 * Usage:
 *   cd backend
 *   ADMIN_EMAIL=admin@riyadvi.com ADMIN_PASSWORD='a-strong-password' ADMIN_NAME='Admin' \
 *     npm run create-admin
 *
 * Or run without env vars and answer the interactive prompts.
 *
 * The password is never logged, never echoed back, and never stored
 * anywhere except as a bcrypt hash in the database.
 */
import "dotenv/config";
import * as readline from "node:readline";
import { createAdminUser, findAdminUserByEmail } from "../src/models/adminUser";
import { hashPassword } from "../src/services/authService";
import { pool } from "../src/config/database";

function prompt(question: string, hide = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (!hide) {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
      return;
    }

    // Basic hidden-input for the password prompt.
    const stdin = process.stdin;
    process.stdout.write(question);
    let input = "";
    const onData = (char: Buffer) => {
      const c = char.toString("utf8");
      if (c === "\n" || c === "\r" || c === "\u0004") {
        stdin.removeListener("data", onData);
        stdin.setRawMode?.(false);
        stdin.pause();
        process.stdout.write("\n");
        rl.close();
        resolve(input.trim());
        return;
      }
      if (c === "\u0003") {
        process.exit(1);
      }
      if (c === "\u007f") {
        input = input.slice(0, -1);
        return;
      }
      input += c;
    };
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function main(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || (await prompt("Admin email: ")))
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD || (await prompt("Admin password: ", true));
  const name = process.env.ADMIN_NAME || (await prompt("Admin name (optional): "));

  if (!email || !email.includes("@")) {
    console.error("A valid email is required.");
    process.exit(1);
  }
  if (!password || password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const existing = await findAdminUserByEmail(email);
  if (existing) {
    console.error(`An admin user with email ${email} already exists.`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const record = await createAdminUser({ email, passwordHash, name: name || null });

  console.log(`Admin user created: ${record.email} (id: ${record.id})`);
  await pool.end();
}

main().catch((error) => {
  console.error("Failed to create admin user:", error instanceof Error ? error.message : error);
  process.exit(1);
});
