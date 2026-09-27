import { Router } from "express";
import { validateBody } from "../middleware/validation";
import { leadRateLimiter } from "../middleware/rateLimiter";
import { consultationSchema } from "../validators/leadValidators";
import { submitConsultation } from "../services/leadService";
import { sendSuccess } from "../utils/response";
import type { NextFunction, Request, Response } from "express";

const router = Router();

/**
 * Prepared per Stage 8 Step 7: the frontend does not yet submit a request
 * distinct from /api/contact — this endpoint is ready infrastructure, not
 * currently wired to a UI flow.
 */
router.post(
  "/",
  leadRateLimiter,
  validateBody(consultationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await submitConsultation(req.body);
      if (result.duplicate) {
        sendSuccess(
          res,
          "We already have a recent consultation request from this email. We'll be in touch shortly.",
          { id: result.record.id },
        );
        return;
      }
      sendSuccess(
        res,
        "Your consultation request has been submitted successfully.",
        { id: result.record.id },
        201,
      );
    } catch (error) {
      next(error);
    }
  },
);

export default router;
