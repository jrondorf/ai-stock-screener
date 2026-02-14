# AI Stock Screener

## Setup

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`
3. Start infra: `docker compose up -d`
4. Run migrations: `npx prisma migrate dev`
5. Start API: `npm run dev`

## Scripts

- `npm run build`
- `npm test`

## Provider switching

- Market data provider implements `IMarketDataProvider` in `src/core/interfaces/IMarketDataProvider.ts`.
- AI provider implements `IAIProvider` in `src/core/interfaces/IAIProvider.ts`.

## Architecture

- Controllers in `src/modules/*/*.controller.ts`
- Services in `src/modules/*/*.service.ts`
- Infrastructure adapters in `src/infrastructure`
