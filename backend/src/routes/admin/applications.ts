import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { requireAdminAuth } from "../../middleware/adminAuth";
import {
  getApplicationById,
  listApplications,
  updateApplicationStatusById,
} from "../../models/applicationAdmin";
import {
  applicationListQuerySchema,
  idParamSchema,
  leadStatusUpdateSchema,
} from "../../validators/adminValidators";
import { sendError, sendSuccess, sendValidationError } from "../../utils/response";
import { flattenZodError } from "../../validators/leadValidators";

const router = Router();

router.use(requireAdminAuth);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = applicationListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      sendValidationError(res, flattenZodError(parsed.error));
      return;
    }
    const result = await listApplications(parsed.data);
    res.status(200).json({ success: true, message: "OK", ...result });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      sendError(res, "Invalid application id.", 400);
      return;
    }
    const application = await getApplicationById(parsedParams.data.id);
    if (!application) {
      sendError(res, "Application not found.", 404);
      return;
    }
    sendSuccess(res, "OK", application);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/status",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedParams = idParamSchema.safeParse(req.params);
      if (!parsedParams.success) {
        sendError(res, "Invalid application id.", 400);
        return;
      }
      const parsedBody = leadStatusUpdateSchema.safeParse(req.body);
      if (!parsedBody.success) {
        sendValidationError(res, flattenZodError(parsedBody.error));
        return;
      }

      const updated = await updateApplicationStatusById(
        parsedParams.data.id,
        parsedBody.data.status,
      );
      if (!updated) {
        sendError(res, "Application not found.", 404);
        return;
      }

      sendSuccess(res, "Status updated successfully.", updated);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
