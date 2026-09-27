import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { adminLoginRateLimiter } from "../../middleware/rateLimiter";
import { validateBody } from "../../middleware/validation";
import { requireAdminAuth, type AdminAuthedRequest } from "../../middleware/adminAuth";
import { adminLoginSchema } from "../../validators/adminValidators";
import {
  findAdminUserByEmail,
  findAdminUserById,
  toPublicAdminUser,
  touchLastLogin,
} from "../../models/adminUser";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  signAdminToken,
  verifyPassword,
} from "../../services/authService";
import { sendError, sendSuccess } from "../../utils/response";

const router = Router();

/**
 * Generic invalid-credentials message on every failure path below —
 * wrong email, wrong password, inactive account are all indistinguishable
 * to the caller, so a login attempt can never be used to enumerate which
 * admin emails exist.
 */
const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";

router.post(
  "/login",
  adminLoginRateLimiter,
  validateBody(adminLoginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as { email: string; password: string };

      const admin = await findAdminUserByEmail(email);
      if (!admin || !admin.is_active) {
        sendError(res, INVALID_CREDENTIALS_MESSAGE, 401);
        return;
      }

      const passwordOk = await verifyPassword(password, admin.password_hash);
      if (!passwordOk) {
        sendError(res, INVALID_CREDENTIALS_MESSAGE, 401);
        return;
      }

      const token = signAdminToken({ sub: admin.id, email: admin.email });
      res.cookie(ADMIN_COOKIE_NAME, token, adminCookieOptions());

      await touchLastLogin(admin.id);

      sendSuccess(res, "Logged in successfully.", {
        admin: toPublicAdminUser(admin),
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post("/logout", (req: Request, res: Response) => {
  const { maxAge: _maxAge, ...clearOptions } = adminCookieOptions();
  res.clearCookie(ADMIN_COOKIE_NAME, clearOptions);
  sendSuccess(res, "Logged out successfully.");
});

router.get(
  "/me",
  requireAdminAuth,
  async (req: AdminAuthedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.admin) {
        sendError(res, "Authentication required.", 401);
        return;
      }
      const admin = await findAdminUserById(req.admin.id);
      if (!admin || !admin.is_active) {
        sendError(res, "Authentication required.", 401);
        return;
      }
      sendSuccess(res, "OK", { admin: toPublicAdminUser(admin) });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
