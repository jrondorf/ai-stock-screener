import {
  type AIAnalysisResult,
  type AIChatInput,
  type AIChatResult,
  type IAIProvider,
  type PortfolioAnalysisInput,
  type StockAnalysisInput
} from '../../core/interfaces/IAIProvider';

const DISCLAIMER = 'This analysis is informational only and not financial advice.';

const baseAnalysis = (summary: string): AIAnalysisResult => ({
  disclaimer: DISCLAIMER,
  summary,
  risks: ['Market volatility', 'Macroeconomic uncertainty'],
  opportunities: ['Revenue expansion', 'Margin improvement']
});

export class MockAIProvider implements IAIProvider {
  public async analyzeStock(input: StockAnalysisInput): Promise<AIAnalysisResult> {
    return baseAnalysis(`Structured analysis for ${input.symbol}.`);
  }

  public async analyzePortfolio(input: PortfolioAnalysisInput): Promise<AIAnalysisResult> {
    return baseAnalysis(`Structured portfolio analysis for ${input.symbols.join(', ')}.`);
  }

  public async chat(input: AIChatInput): Promise<AIChatResult> {
    return {
      disclaimer: DISCLAIMER,
      response: `Context-aware response: ${input.message}`
    };
  }
}
