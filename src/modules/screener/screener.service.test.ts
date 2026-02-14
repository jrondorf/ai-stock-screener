import { ScreenerService } from './screener.service';

describe('ScreenerService', () => {
  const service = new ScreenerService();

  it('filters stocks using configured metrics', () => {
    const result = service.run({
      filters: {
        pe: { max: 20 },
        roe: { min: 0.1 },
        rsi: { min: 30, max: 70 }
      },
      stocks: [
        {
          symbol: 'PASS',
          pe: 12,
          pb: 2,
          roe: 0.2,
          revenueGrowth: 0.1,
          epsGrowth: 0.1,
          debtToEquity: 0.3,
          freeCashFlow: 10,
          rsi: 50,
          sma: 100,
          ema: 98,
          macd: 2,
          volumeTrend: 1.2
        },
        {
          symbol: 'FAIL',
          pe: 25,
          pb: 2,
          roe: 0.2,
          revenueGrowth: 0.1,
          epsGrowth: 0.1,
          debtToEquity: 0.3,
          freeCashFlow: 10,
          rsi: 50,
          sma: 100,
          ema: 98,
          macd: 2,
          volumeTrend: 1.2
        }
      ]
    });

    expect(result).toHaveLength(1);
    expect(result[0].symbol).toBe('PASS');
  });
});
