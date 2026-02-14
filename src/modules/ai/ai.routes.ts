import { Router } from 'express';

import { aiController } from './ai.controller';

export const aiRouter: Router = Router();

aiRouter.post('/analyze-stock', (req, res) => void aiController.analyzeStock(req, res));
aiRouter.post('/analyze-portfolio', (req, res) => void aiController.analyzePortfolio(req, res));
aiRouter.post('/chat', (req, res) => void aiController.chat(req, res));
