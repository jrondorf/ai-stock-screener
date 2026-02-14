import { Router } from 'express';

import { backtestController } from './backtest.controller';

export const backtestRouter: Router = Router();

backtestRouter.post('/run', (req, res) => backtestController.run(req, res));
