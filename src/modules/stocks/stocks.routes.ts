import { Router } from 'express';

import { stocksController } from './stocks.controller';

export const stocksRouter: Router = Router();

stocksRouter.get('/:symbol/quote', (req, res) => void stocksController.getQuote(req, res));
stocksRouter.get('/:symbol/historical', (req, res) => void stocksController.getHistorical(req, res));
stocksRouter.get('/:symbol/fundamentals', (req, res) => void stocksController.getFundamentals(req, res));
