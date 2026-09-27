import { Router } from "express";
import { validateBody } from "../middleware/validation";
import { leadRateLimiter } from "../middleware/rateLimiter";
import { leadMagnetSchema } from "../validators/leadValidators";
import { submitLeadMagnetLead } from "../services/leadService";
import { sendSuccess } from "../utils/response";
import type { NextFunction, Request, Response } from "express";

const router = Router();

/**
 * No guide PDF exists in this repository (Stage 8 Step 9). The lead is
 * still genuinely stored, but the response never claims a download is
 * available and never returns a fake URL.
 */
router.post(
  "/",
  leadRateLimiter,
  validateBody(leadMagnetSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await submitLeadMagnetLead(req.body);
      sendSuccess(
        res,
        "Your information has been received. Resource delivery will be enabled when the guide is available.",
        { id: result.record.id, downloadUrl: null },
        result.duplicate ? 200 : 201,
      );
    } catch (error) {
      next(error);
    }
  },
);

export default router;
