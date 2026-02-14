import { z } from 'zod';

export const metricSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional()
});

export const screenerFiltersSchema = z.object({
  pe: metricSchema.optional(),
  pb: metricSchema.optional(),
  roe: metricSchema.optional(),
  revenueGrowth: metricSchema.optional(),
  epsGrowth: metricSchema.optional(),
  debtToEquity: metricSchema.optional(),
  freeCashFlow: metricSchema.optional(),
  rsi: metricSchema.optional(),
  sma: metricSchema.optional(),
  ema: metricSchema.optional(),
  macd: metricSchema.optional(),
  volumeTrend: metricSchema.optional()
});

export const screenerStockSchema = z.object({
  symbol: z.string().min(1),
  pe: z.number(),
  pb: z.number(),
  roe: z.number(),
  revenueGrowth: z.number(),
  epsGrowth: z.number(),
  debtToEquity: z.number(),
  freeCashFlow: z.number(),
  rsi: z.number(),
  sma: z.number(),
  ema: z.number(),
  macd: z.number(),
  volumeTrend: z.number()
});

export const runScreenerSchema = z.object({
  filters: screenerFiltersSchema,
  stocks: z.array(screenerStockSchema)
});

export const saveScreenerSchema = z.object({
  name: z.string().min(1),
  filters: screenerFiltersSchema
});

export type ScreenerFilters = z.infer<typeof screenerFiltersSchema>;
export type ScreenerStock = z.infer<typeof screenerStockSchema>;
export type ScreenerRunInput = z.infer<typeof runScreenerSchema>;
export type SaveScreenerInput = z.infer<typeof saveScreenerSchema>;

export interface SavedScreener {
  id: string;
  name: string;
  filters: ScreenerFilters;
}
