import { type Request, type Response } from 'express';

import { backtestService } from './backtest.service';
import { backtestSchema } from './backtest.validation';

export class BacktestController {
  public run(req: Request, res: Response): Response {
    const parsed = backtestSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parsed.error.issues });
    }

    const result = backtestService.run(parsed.data);
    return res.status(200).json(result);
  }
}

export const backtestController = new BacktestController();
