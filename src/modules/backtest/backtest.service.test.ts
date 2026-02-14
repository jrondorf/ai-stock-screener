import { BacktestService } from './backtest.service';

describe('BacktestService', () => {
  const service = new BacktestService();

  it('calculates expected performance metrics', () => {
    const result = service.run({
      prices: [100, 105, 110, 108, 120],
      riskFreeRate: 0.02
    });

    expect(result.cagr).toBeGreaterThan(0);
    expect(result.maxDrawdown).toBeGreaterThan(0);
    expect(result.sharpeRatio).toBeGreaterThan(0);
    expect(result.equityCurve[0]).toBe(1);
    expect(result.equityCurve[result.equityCurve.length - 1]).toBe(1.2);
  });
});
