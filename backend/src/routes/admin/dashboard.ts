import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { requireAdminAuth } from "../../middleware/adminAuth";
import { getDashboardStats } from "../../models/leadAdmin";
import { sendSuccess } from "../../utils/response";

const router = Router();

router.get(
  "/stats",
  requireAdminAuth,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await getDashboardStats();
      sendSuccess(res, "OK", stats);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
