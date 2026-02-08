# Digital Nomad App

A mobile app for browsing and discovering cities for digital nomads. Built with Expo (React Native) + TypeScript.

## Tech Stack

- **Framework**: Expo ~54, Expo Router (file-based routing)
- **Language**: TypeScript
- **Styling**: Shopify Restyle (theme-based design system), IcoMoon icons
- **Animations**: React Native Reanimated
- **Maps**: React Native Maps
- **Forms**: React Hook Form + Zod validation
- **Data fetching**: TanStack React Query
- **Storage**: React Native MMKV (encrypted, fast key-value store)
- **Backend**: Supabase (Postgres DB with custom tables/views, Auth)
- **Testing**: React Testing Library (react-native)
- **Web**: Next.js landing page for password reset flow

## Architecture

Hexagonal architecture with vertical slices:

- **Domain layer**: entities, port interfaces (`ICityRepo`, `IAuthRepo`, etc.), and use-case hooks
- **Infrastructure layer**: adapters implementing ports — Supabase and In-Memory variants for repos, storage, and feedback services
- **UI layer**: components and screen containers, decoupled from infrastructure via React Context providers

Adapters are injected at the composition root (`app/_layout.tsx`), making it easy to swap Supabase for in-memory implementations during testing.

## UI Highlights

- Liquid glass bottom tab bar (iOS)

## Running the Project

Install dependencies:

```bash
npm install
```

### iOS

Requires a simulator or device running iOS 18+ (liquid glass tab bar is not supported in Expo Go).

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Start dev server

```bash
npm start
```

## Testing

```bash
npm test
```
