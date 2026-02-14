import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import express, { type Application, type Request, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { env } from './config/env';
import { aiRouter } from './modules/ai/ai.routes';
import { authRouter } from './modules/auth/auth.routes';
import { backtestRouter } from './modules/backtest/backtest.routes';
import { screenerRouter } from './modules/screener/screener.routes';
import { stocksRouter } from './modules/stocks/stocks.routes';

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 100
  })
);
app.use(express.json());
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.use((req: Request, res: Response, next): void => {
  const requestWithCsrf = req as Request & { csrfToken: () => string };
  res.cookie('csrfToken', requestWithCsrf.csrfToken(), {
    httpOnly: false,
    sameSite: 'strict',
    secure: env.nodeEnv === 'production'
  });
  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/stocks', stocksRouter);
app.use('/screener', screenerRouter);
app.use('/ai', aiRouter);
app.use('/backtest', backtestRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;
