import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import applicationsRouter from "./routes/applications";
import consultationRouter from "./routes/consultation";
import contactRouter from "./routes/contact";
import healthRouter from "./routes/health";
import healthCheckupRouter from "./routes/healthCheckup";
import leadMagnetRouter from "./routes/leadMagnet";
import adminAuthRouter from "./routes/admin/auth";
import adminDashboardRouter from "./routes/admin/dashboard";
import adminLeadsRouter from "./routes/admin/leads";
import adminApplicationsRouter from "./routes/admin/applications";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

// Render/Railway/Vercel-style deployments sit behind one reverse-proxy hop.
// Without this, req.ip (which express-rate-limit keys on by default)
// resolves to the proxy's own IP for every request — collapsing every
// visitor into one shared rate-limit bucket instead of limiting per real
// client. `1` trusts exactly one hop; do not set this to `true` (trusts
// the whole chain, spoofable via X-Forwarded-For) unless there are
// multiple proxy hops in front of this server.
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT) || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Restricted CORS (Stage 8 Step 16) — never "*" by default. Both with and
// without a trailing slash are accepted since browsers send Origin without
// one, but people sometimes paste env values with one.
const allowedOrigins = [FRONTEND_URL, FRONTEND_URL.replace(/\/$/, "")];

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin tools (curl, server-to-server, health checks) send no
      // Origin header at all — allow those; only browser cross-origin
      // requests are checked against the allow-list.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    // Required so the browser will send/store the admin HttpOnly cookie on
    // cross-origin requests from the frontend (Phase 9). `origin` above is
    // always a specific allow-listed value, never "*", which is required
    // for credentialed CORS to work at all.
    credentials: true,
  }),
);

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// Lightweight request logging (Stage 8 Step 26) — method, route, status,
// timestamp only. Never logs request bodies, so lead PII and credentials
// never reach the log stream.
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - start;
    // eslint-disable-next-line no-console
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`,
    );
  });
  next();
});

app.get("/", (_req, res) => {
  res.status(200).json({ success: true, message: "Riyadvi API is running" });
});

app.use("/api/health", healthRouter);
app.use("/api/contact", contactRouter);
app.use("/api/consultation", consultationRouter);
app.use("/api/health-checkup", healthCheckupRouter);
app.use("/api/lead-magnet", leadMagnetRouter);
app.use("/api/applications", applicationsRouter);

// Admin Dashboard + Lead Management (Phase 9). Every route below except
// /api/admin/auth/login and /api/admin/auth/logout requires a valid admin
// session cookie — enforced inside each router via requireAdminAuth.
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/dashboard", adminDashboardRouter);
app.use("/api/admin/leads", adminLeadsRouter);
app.use("/api/admin/applications", adminApplicationsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Riyadvi API listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[server] Accepting requests from: ${FRONTEND_URL}`);
});

export default app;
