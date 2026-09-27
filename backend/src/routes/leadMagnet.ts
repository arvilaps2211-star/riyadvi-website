import { Router } from "express";
import { validateBody } from "../middleware/validation";
import { leadRateLimiter } from "../middleware/rateLimiter";
import { leadMagnetSchema } from "../validators/leadValidators";
import { submitLeadMagnetLead } from "../services/leadService";
import { sendSuccess } from "../utils/response";
import type { NextFunction, Request, Response } from "express";

const router = Router();

/**
 * Phase 10E: the guide PDF now genuinely exists at
 * frontend/public/guides/software-project-planning-guide.pdf, served by
 * Next.js on the frontend's own origin. This route returns that real,
 * relative path — never an absolute backend URL (the file isn't hosted
 * here) and never a fabricated one. If a future resource genuinely has no
 * file yet, this must go back to returning `downloadUrl: null` with honest
 * copy, not a broken or fake link.
 */
const KNOWN_RESOURCES: Record<string, string> = {
  "software-project-planning-guide": "/guides/software-project-planning-guide.pdf",
};

router.post(
  "/",
  leadRateLimiter,
  validateBody(leadMagnetSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await submitLeadMagnetLead(req.body);
      const downloadUrl = KNOWN_RESOURCES[req.body.resource] ?? null;
      const message = downloadUrl
        ? "Your information has been received. You can download the guide below."
        : "Your information has been received. Resource delivery will be enabled when the guide is available.";

      sendSuccess(
        res,
        message,
        { id: result.record.id, downloadUrl },
        result.duplicate ? 200 : 201,
      );
    } catch (error) {
      next(error);
    }
  },
);

export default router;
