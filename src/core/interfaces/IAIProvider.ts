export interface StockAnalysisInput {
  symbol: string;
  timeframe?: string;
}

export interface PortfolioAnalysisInput {
  symbols: string[];
}

export interface AIChatInput {
  message: string;
  context?: string;
}

export interface AIAnalysisResult {
  disclaimer: string;
  summary: string;
  risks: string[];
  opportunities: string[];
}

export interface AIChatResult {
  disclaimer: string;
  response: string;
}

export interface IAIProvider {
  analyzeStock(input: StockAnalysisInput): Promise<AIAnalysisResult>;
  analyzePortfolio(input: PortfolioAnalysisInput): Promise<AIAnalysisResult>;
  chat(input: AIChatInput): Promise<AIChatResult>;
}
