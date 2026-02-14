import { type Request, type Response } from 'express';

import { MockAIProvider } from '../../infrastructure/ai/mockAIProvider';
import { analyzePortfolioSchema, analyzeStockSchema, chatSchema } from './ai.validation';

const aiProvider = new MockAIProvider();

export class AIController {
  public async analyzeStock(req: Request, res: Response): Promise<Response> {
    const parsed = analyzeStockSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    const result = await aiProvider.analyzeStock(parsed.data);
    return res.status(200).json(result);
  }

  public async analyzePortfolio(req: Request, res: Response): Promise<Response> {
    const parsed = analyzePortfolioSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    const result = await aiProvider.analyzePortfolio(parsed.data);
    return res.status(200).json(result);
  }

  public async chat(req: Request, res: Response): Promise<Response> {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    const result = await aiProvider.chat(parsed.data);
    return res.status(200).json(result);
  }
}

export const aiController = new AIController();
