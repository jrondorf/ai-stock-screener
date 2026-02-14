export interface Quote {
  symbol: string;
  price: number;
  currency: string;
  timestamp: string;
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Fundamentals {
  symbol: string;
  pe: number;
  pb: number;
  roe: number;
  revenueGrowth: number;
  epsGrowth: number;
  debtToEquity: number;
  freeCashFlow: number;
}

export interface IMarketDataProvider {
  getQuote(symbol: string): Promise<Quote>;
  getHistorical(symbol: string, range: string): Promise<Candle[]>;
  getFundamentals(symbol: string): Promise<Fundamentals>;
}
