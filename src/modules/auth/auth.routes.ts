import { Router } from 'express';

import { authController } from './auth.controller';

export const authRouter: Router = Router();

authRouter.post('/register', (req, res) => void authController.register(req, res));
authRouter.post('/login', (req, res) => void authController.login(req, res));
authRouter.post('/refresh', (req, res) => void authController.refresh(req, res));
authRouter.post('/logout', (req, res) => void authController.logout(req, res));
