import "dotenv/config";
import cors from "cors";
import express from "express";
import applicationsRouter from "./routes/applications";
import consultationRouter from "./routes/consultation";
import contactRouter from "./routes/contact";
import healthRouter from "./routes/health";
import healthCheckupRouter from "./routes/healthCheckup";
import leadMagnetRouter from "./routes/leadMagnet";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

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
  }),
);

app.use(express.json({ limit: "100kb" }));

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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[server] Riyadvi API listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`[server] Accepting requests from: ${FRONTEND_URL}`);
});

export default app;
