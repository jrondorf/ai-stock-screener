import { type Request, type Response } from 'express';

import { env } from '../../config/env';
import { authService } from './auth.service';
import { loginSchema, registerSchema } from './auth.validation';

const cookieConfig = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: env.nodeEnv === 'production'
};

const handleAuthError = (res: Response, error: unknown): Response => {
  if (error instanceof Error) {
    if (error.message === 'User already exists') {
      return res.status(409).json({ message: error.message });
    }

    if (error.message === 'Invalid credentials' || error.message === 'Invalid token') {
      return res.status(401).json({ message: error.message });
    }
  }

  return res.status(500).json({ message: 'Internal server error' });
};

export class AuthController {
  public async register(req: Request, res: Response): Promise<Response> {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    try {
      const result = await authService.register(parsed.data);
      res.cookie('refreshToken', result.refreshToken, cookieConfig);
      return res.status(201).json({ user: result.user, accessToken: result.accessToken });
    } catch (error) {
      return handleAuthError(res, error);
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    try {
      const result = await authService.login(parsed.data);
      res.cookie('refreshToken', result.refreshToken, cookieConfig);
      return res.status(200).json({ user: result.user, accessToken: result.accessToken });
    } catch (error) {
      return handleAuthError(res, error);
    }
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Missing refresh token' });
    }

    try {
      const result = await authService.refresh(refreshToken);
      res.cookie('refreshToken', result.refreshToken, cookieConfig);
      return res.status(200).json({ user: result.user, accessToken: result.accessToken });
    } catch (error) {
      return handleAuthError(res, error);
    }
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    res.clearCookie('refreshToken', cookieConfig);
    return res.status(200).json({ message: 'Logged out' });
  }
}

export const authController = new AuthController();
