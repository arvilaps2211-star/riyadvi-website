import { Router } from "express";
import { validateBody } from "../middleware/validation";
import { leadRateLimiter } from "../middleware/rateLimiter";
import { contactSchema } from "../validators/leadValidators";
import { submitContactLead } from "../services/leadService";
import { sendSuccess } from "../utils/response";
import type { NextFunction, Request, Response } from "express";

const router = Router();

router.post(
  "/",
  leadRateLimiter,
  validateBody(contactSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await submitContactLead(req.body);
      if (result.duplicate) {
        sendSuccess(
          res,
          "We already have a recent enquiry from this email. We'll be in touch shortly.",
          { id: result.record.id },
        );
        return;
      }
      sendSuccess(
        res,
        "Your enquiry has been submitted successfully.",
        { id: result.record.id },
        201,
      );
    } catch (error) {
      next(error);
    }
  },
);

export default router;
