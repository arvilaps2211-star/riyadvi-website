import { Router } from "express";
import { validateBody } from "../middleware/validation";
import { leadRateLimiter } from "../middleware/rateLimiter";
import { applicationSchema } from "../validators/leadValidators";
import { submitApplication } from "../services/leadService";
import { sendSuccess } from "../utils/response";
import type { NextFunction, Request, Response } from "express";

const router = Router();

/**
 * Backend-ready per Stage 8 Step 10/23. The careers page's "Apply / Inquire"
 * currently links to /contact — there is no dedicated application form yet
 * to connect this to, so this endpoint exists as infrastructure ahead of
 * that frontend work, per the spec's own "only if the existing form is
 * ready" condition. `resumeReference` is a free-text field (a link or
 * note), not a file upload, since no file-storage system exists.
 */
router.post(
  "/",
  leadRateLimiter,
  validateBody(applicationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await submitApplication(req.body);
      sendSuccess(
        res,
        "Your application has been submitted successfully.",
        { id: result.record.id },
        result.duplicate ? 200 : 201,
      );
    } catch (error) {
      next(error);
    }
  },
);

export default router;
