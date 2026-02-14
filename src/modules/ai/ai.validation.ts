import { z } from 'zod';

export const analyzeStockSchema = z.object({
  symbol: z.string().min(1),
  timeframe: z.string().optional()
});

export const analyzePortfolioSchema = z.object({
  symbols: z.array(z.string().min(1)).min(1)
});

export const chatSchema = z.object({
  message: z.string().min(1),
  context: z.string().optional()
});
