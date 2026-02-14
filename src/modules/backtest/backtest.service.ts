import { type BacktestInput } from './backtest.validation';

export interface BacktestResult {
  cagr: number;
  maxDrawdown: number;
  sharpeRatio: number;
  equityCurve: number[];
}

const TRADING_DAYS_PER_YEAR = 252;

const standardDeviation = (values: number[]): number => {
  if (values.length === 0) {
    return 0;
  }

  const mean = values.reduce((sum, current) => sum + current, 0) / values.length;
  const variance =
    values.reduce((sum, current) => sum + (current - mean) ** 2, 0) / values.length;

  return Math.sqrt(variance);
};

export class BacktestService {
  public run({ prices, riskFreeRate }: BacktestInput): BacktestResult {
    const start = prices[0];
    const end = prices[prices.length - 1];
    const years = prices.length / TRADING_DAYS_PER_YEAR;

    const cagr = years > 0 ? (end / start) ** (1 / years) - 1 : 0;

    let peak = prices[0];
    let maxDrawdown = 0;
    const equityCurve = prices.map((price) => price / start);

    for (const price of prices) {
      if (price > peak) {
        peak = price;
      }

      const drawdown = (peak - price) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }

    const returns = prices.slice(1).map((price, index) => price / prices[index] - 1);
    const avgReturn = returns.reduce((sum, value) => sum + value, 0) / returns.length;
    const volatility = standardDeviation(returns);
    const dailyRiskFreeRate = riskFreeRate / TRADING_DAYS_PER_YEAR;

    const sharpeRatio = volatility === 0 ? 0 : (avgReturn - dailyRiskFreeRate) / volatility;

    return { cagr, maxDrawdown, sharpeRatio, equityCurve };
  }
}

export const backtestService = new BacktestService();
