# Copilot Instructions for QLAB-SYS

## Overview
QLAB-SYS is a Next.js 14 application integrated with Firebase/Firestore, Tailwind CSS, and AI tools. It serves as a POS system with additional services like WhatsApp integration, loyalty programs, and profit sharing. The project uses TypeScript and follows specific conventions for architecture, workflows, and code style.

## Architecture
- **Framework**: Next.js 14 with TypeScript.
- **Database**: Firestore with 20+ collections (e.g., clients, services, bookings).
- **AI System**: Zoya sales advisor powered by OpenAI GPT-4o, with 10 specialized tools.
- **Key Directories**:
  - `src/ai/`: AI tools and flows.
  - `src/services/`: External API integrations.
  - `src/types/`: Typed interfaces for Firestore collections.
  - `src/components/`: UI components using Radix UI and Tailwind CSS.

## Developer Workflows
### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   - Default port: 3000.
3. Run Firebase emulators for local database testing:
   ```bash
   firebase emulators:start
   ```

### Testing
- Run all tests:
  ```bash
  npm test
  ```
- Run Zoya AI-specific tests:
  ```bash
  npm run test:zoya
  ```

### Build and Deployment
- Build the project:
  ```bash
  npm run build
  ```
- Deploy to Firebase Hosting:
  ```bash
  firebase deploy
  ```

## Code Style and Conventions
- **Import Path**: Use `@/` alias for `src/`.
- **TypeScript**: Strict mode disabled; prefer interfaces over types.
- **Components**: Use Radix UI and Tailwind CSS with shadcn/ui patterns.
- **File Naming**: kebab-case for files, PascalCase for components.
- **Database**: Firestore collections with typed interfaces defined in `src/types/`.
- **AI Tools**: Zod schemas for validation; structured function calls required.

## Integration Points
- **Firebase**: Firestore, Authentication, Functions.
- **WhatsApp**: External API integration for messaging.
- **AI Tools**: Zoya advisor with specialized tools in `src/ai/tools/`.

## Examples
### Creating a Booking
Refer to `src/ai/tools/createBookingTool.ts` for the implementation of the `createBooking` tool. It:
- Validates input using Zod schemas.
- Matches services using fuzzy string similarity.
- Saves booking data to Firestore.
- Creates queue items for same-day bookings.

### Firebase Emulator Setup
To use Firebase emulators locally:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Start emulators:
   ```bash
   firebase emulators:start
   ```

## Notes
- Always test changes locally before deploying.
- Follow the conventions outlined above to ensure consistency across the codebase.
