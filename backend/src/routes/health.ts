import { Router } from "express";
import { checkDatabaseConnection } from "../config/database";
import type { Request, Response } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const dbConnected = await checkDatabaseConnection();
  res.status(200).json({
    success: true,
    message: "Riyadvi API is running",
    api: "ok",
    database: dbConnected ? "connected" : "unavailable",
  });
});

export default router;
