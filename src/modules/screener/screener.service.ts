import crypto from 'node:crypto';

import {
  type SavedScreener,
  type SaveScreenerInput,
  type ScreenerFilters,
  type ScreenerRunInput,
  type ScreenerStock
} from './screener.types';

const savedScreeners: SavedScreener[] = [];

const isWithinRange = (value: number, min?: number, max?: number): boolean => {
  if (min !== undefined && value < min) {
    return false;
  }

  if (max !== undefined && value > max) {
    return false;
  }

  return true;
};

const stockMatchesFilters = (stock: ScreenerStock, filters: ScreenerFilters): boolean =>
  Object.entries(filters).every(([metric, range]) => {
    if (!range) {
      return true;
    }

    const stockValue = stock[metric as keyof ScreenerStock];
    if (typeof stockValue !== 'number') {
      return true;
    }

    return isWithinRange(stockValue, range.min, range.max);
  });

export class ScreenerService {
  public run(input: ScreenerRunInput): ScreenerStock[] {
    return input.stocks.filter((stock) => stockMatchesFilters(stock, input.filters));
  }

  public save(input: SaveScreenerInput): SavedScreener {
    const screener: SavedScreener = {
      id: crypto.randomUUID(),
      name: input.name,
      filters: input.filters
    };

    savedScreeners.push(screener);
    return screener;
  }

  public list(): SavedScreener[] {
    return [...savedScreeners];
  }
}

export const screenerService = new ScreenerService();
