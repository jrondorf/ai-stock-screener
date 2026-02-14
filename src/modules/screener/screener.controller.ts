import { type Request, type Response } from 'express';

import { screenerService } from './screener.service';
import { runScreenerSchema, saveScreenerSchema } from './screener.types';

export class ScreenerController {
  public run(req: Request, res: Response): Response {
    const parsed = runScreenerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    const results = screenerService.run(parsed.data);
    return res.status(200).json({ results });
  }

  public save(req: Request, res: Response): Response {
    const parsed = saveScreenerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    const saved = screenerService.save(parsed.data);
    return res.status(201).json(saved);
  }

  public list(_req: Request, res: Response): Response {
    return res.status(200).json({ screeners: screenerService.list() });
  }
}

export const screenerController = new ScreenerController();
