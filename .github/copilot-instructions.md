Copilot Instructions — AI Stock Screener SaaS
Project Overview
This repository contains a production-ready AI-powered global stock screener SaaS application.
The stack:
Backend: Node.js + TypeScript + Express
Database: PostgreSQL + Prisma
Cache: Redis
Frontend: React + TypeScript + Vite + TailwindCSS
AI: OpenAI API (must be abstracted via provider interface)
Testing: Jest
Documentation: OpenAPI (Swagger)
Containerization: Docker + docker-compose
The system must be modular, maintainable, production-ready, and secure.
This is NOT a demo project. All generated code must be runnable.
Core Engineering Rules
1. Strict TypeScript
"strict": true
No any
No implicit returns
Proper interfaces for all services
Explicit return types for public functions
2. Clean Architecture Required
Never mix concerns.
Follow this separation:
Controllers → Handle HTTP only
Services → Business logic only
Infrastructure → External APIs (market data, AI, DB)
Interfaces → Contracts for providers
Routes → Wire controllers
Do not place business logic inside controllers.
3. Provider Abstractions (MANDATORY)
All external integrations must be abstracted.
Required interfaces:
interface IMarketDataProvider {
  getQuote(symbol: string): Promise<Quote>;
  getHistorical(symbol: string, range: string): Promise<Candle[]>;
  getFundamentals(symbol: string): Promise<Fundamentals>;
}
interface IAIProvider {
  analyzeStock(input: StockAnalysisInput): Promise<StockAnalysisResult>;
}
Never call external APIs directly from controllers.
4. Security Rules
No hardcoded API keys
Use environment variables
Use Zod validation on all request bodies
Use JWT authentication with HttpOnly cookies
Password hashing via bcrypt
Use Helmet and rate limiting
Proper error middleware
Never expose stack traces in production
5. AI Rules
The AI must:
Only analyze (never give financial advice)
Always prepend:
"This analysis is informational only and not financial advice."
Use structured JSON outputs
Be implemented behind IAIProvider
Be easily swappable to another LLM provider
6. Database Rules
Use Prisma.
Required initial models:
User
Portfolio
PortfolioHolding
Watchlist
WatchlistItem
Use migrations properly.
No raw SQL unless necessary.
7. Testing Requirements
Backend:
Unit tests for services
Integration test for auth route
Mock external providers
Frontend:
Basic component render tests
API hook tests
All tests must pass.
8. API Documentation
Use Swagger/OpenAPI.
Every route must be documented.
9. Frontend Rules
Use functional React components
Use TypeScript everywhere
Create reusable components
Use proper API client abstraction
Store auth tokens securely
No direct fetch calls inside UI components — use centralized API layer
10. Code Quality
ESLint
Prettier
No unused imports
Meaningful naming
Avoid duplication
Keep functions small
Implementation Strategy
When building new features:
Define types
Define interfaces
Implement service logic
Write tests
Implement controller
Wire routes
Document endpoint
Do not skip steps.
Deliverable Expectations
Generated code must:
Compile
Run locally with npm run dev
Have working backend and frontend
Include Docker setup
Include .env.example
Include README with setup instructions
Important Constraints
Do not assume a specific market data provider key
Do not implement financial advice logic
Do not leave TODO placeholders without implementation
Do not output incomplete scaffolding
Do not mix CommonJS and ESM inconsistently
Goal
Produce a scalable SaaS foundation for an AI-powered global stock screener with:
Authentication
Market data abstraction
AI analysis
Screener engine
Portfolio tracking
Frontend dashboard
Tests
Docker support
The result must be production-quality and extensible.
