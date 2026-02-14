import { type Request, type Response } from 'express';

import { MockMarketDataProvider } from '../../infrastructure/marketdata/mockMarketDataProvider';

const provider = new MockMarketDataProvider();

export class StocksController {
  private getSymbol(req: Request): string {
    const { symbol } = req.params;
    return Array.isArray(symbol) ? symbol[0] : symbol;
  }

  public async getQuote(req: Request, res: Response): Promise<Response> {
    const quote = await provider.getQuote(this.getSymbol(req));
    return res.status(200).json(quote);
  }

  public async getHistorical(req: Request, res: Response): Promise<Response> {
    const candles = await provider.getHistorical(
      this.getSymbol(req),
      req.query.range?.toString() ?? '1m'
    );
    return res.status(200).json({ candles });
  }

  public async getFundamentals(req: Request, res: Response): Promise<Response> {
    const fundamentals = await provider.getFundamentals(this.getSymbol(req));
    return res.status(200).json(fundamentals);
  }
}

export const stocksController = new StocksController();
