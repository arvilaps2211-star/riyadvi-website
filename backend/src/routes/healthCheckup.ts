import { Router } from "express";
import { validateBody } from "../middleware/validation";
import { leadRateLimiter } from "../middleware/rateLimiter";
import { healthCheckupSchema } from "../validators/leadValidators";
import { submitHealthCheckup } from "../services/leadService";
import { sendSuccess } from "../utils/response";
import type { NextFunction, Request, Response } from "express";

const router = Router();

router.post(
  "/",
  leadRateLimiter,
  validateBody(healthCheckupSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await submitHealthCheckup(req.body);
      if (result.duplicate) {
        sendSuccess(
          res,
          "We already have a recent checkup submission from this email. We'll be in touch shortly.",
          { id: result.record.id },
        );
        return;
      }
      sendSuccess(
        res,
        "Your Business Health Checkup has been submitted successfully.",
        { id: result.record.id },
        201,
      );
    } catch (error) {
      next(error);
    }
  },
);

export default router;
