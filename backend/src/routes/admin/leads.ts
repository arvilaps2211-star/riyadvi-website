import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { requireAdminAuth } from "../../middleware/adminAuth";
import {
  findLeadType,
  getLeadDetailById,
  listNormalizedLeads,
  updateLeadStatusById,
} from "../../models/leadAdmin";
import {
  idParamSchema,
  leadListQuerySchema,
  leadStatusUpdateSchema,
} from "../../validators/adminValidators";
import { sendError, sendSuccess, sendValidationError } from "../../utils/response";
import { flattenZodError } from "../../validators/leadValidators";

const router = Router();

router.use(requireAdminAuth);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = leadListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      sendValidationError(res, flattenZodError(parsed.error));
      return;
    }
    const result = await listNormalizedLeads(parsed.data);
    res.status(200).json({ success: true, message: "OK", ...result });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedParams = idParamSchema.safeParse(req.params);
    if (!parsedParams.success) {
      sendError(res, "Invalid lead id.", 400);
      return;
    }
    const lead = await getLeadDetailById(parsedParams.data.id);
    if (!lead) {
      sendError(res, "Lead not found.", 404);
      return;
    }
    sendSuccess(res, "OK", lead);
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
        sendError(res, "Invalid lead id.", 400);
        return;
      }
      const parsedBody = leadStatusUpdateSchema.safeParse(req.body);
      if (!parsedBody.success) {
        sendValidationError(res, flattenZodError(parsedBody.error));
        return;
      }

      const { id } = parsedParams.data;
      const type = await findLeadType(id);
      if (!type) {
        sendError(res, "Lead not found.", 404);
        return;
      }

      const updated = await updateLeadStatusById(id, type, parsedBody.data.status);
      if (!updated) {
        sendError(res, "Lead not found.", 404);
        return;
      }

      sendSuccess(res, "Status updated successfully.", updated);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
