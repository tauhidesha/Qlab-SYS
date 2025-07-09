# QLAB-SYS Agent Guide

## Commands
- **Dev**: `npm run dev` (port 3000)
- **Build**: `npm run build` 
- **Type Check**: `npm run typecheck`
- **Lint**: `npm run lint`
- **Test**: `npm test` (Jest)
- **Test Single**: `npm run test:zoya` (Zoya AI tests)
- **Seed DB**: `npm run seed:firestore` (requires Firebase emulator)
- **Firebase Emulator**: `firebase emulators:start`

## Architecture
- **Next.js 14** app with TypeScript, Firebase/Firestore, Tailwind CSS
- **AI System**: Zoya sales advisor (OpenAI GPT-4o) with 10 specialized tools
- **Database**: Firestore with 20+ collections (clients, services, transactions, bookings, staff, etc.)
- **Services**: WhatsApp integration, POS system, loyalty program, profit sharing
- **Key Directories**: `src/ai/` (AI tools/flows), `src/services/` (external APIs), `src/types/` (data models)

## Code Style
- **Import Path**: Use `@/` alias for `src/`
- **TypeScript**: Strict disabled, prefer interfaces over types
- **Components**: Radix UI + Tailwind with shadcn/ui patterns
- **Fonts**: Poppins (body/headline), monospace (code)
- **File Naming**: kebab-case for files, PascalCase for components
- **Database**: Firestore collections with typed interfaces in `src/types/`
- **AI Tools**: Zod schemas for validation, structured function calls required
