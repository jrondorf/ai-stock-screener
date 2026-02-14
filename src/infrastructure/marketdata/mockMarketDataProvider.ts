import {
  type Candle,
  type Fundamentals,
  type IMarketDataProvider,
  type Quote
} from '../../core/interfaces/IMarketDataProvider';

const nowIso = (): string => new Date().toISOString();

export class MockMarketDataProvider implements IMarketDataProvider {
  public async getQuote(symbol: string): Promise<Quote> {
    return {
      symbol,
      price: 100,
      currency: 'USD',
      timestamp: nowIso()
    };
  }

  public async getHistorical(_symbol: string, _range: string): Promise<Candle[]> {
    const base = 100;
    return [
      { time: nowIso(), open: base, high: base + 3, low: base - 2, close: base + 1, volume: 1000000 },
      {
        time: nowIso(),
        open: base + 1,
        high: base + 4,
        low: base - 1,
        close: base + 2,
        volume: 1100000
      }
    ];
  }

  public async getFundamentals(symbol: string): Promise<Fundamentals> {
    return {
      symbol,
      pe: 15,
      pb: 2,
      roe: 0.18,
      revenueGrowth: 0.12,
      epsGrowth: 0.1,
      debtToEquity: 0.3,
      freeCashFlow: 50000000
    };
  }
}
