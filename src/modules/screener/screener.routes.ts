import { Router } from 'express';

import { screenerController } from './screener.controller';

export const screenerRouter: Router = Router();

screenerRouter.post('/run', (req, res) => screenerController.run(req, res));
screenerRouter.post('/save', (req, res) => screenerController.save(req, res));
screenerRouter.get('/list', (req, res) => screenerController.list(req, res));
