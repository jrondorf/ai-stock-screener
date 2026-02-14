import { z } from 'zod';

export const backtestSchema = z.object({
  prices: z.array(z.number().positive()).min(2),
  riskFreeRate: z.number().nonnegative().default(0)
});

export type BacktestInput = z.infer<typeof backtestSchema>;
