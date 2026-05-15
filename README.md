# Activity Roulette

Activity Roulette is a clean, fun React Native app for generating activity ideas based on your mood and context. Choose filters like occasion, budget, indoor/outdoor preference, energy level, time of day, weather, and chaos level, then spin for a polished activity card.

## Features

- Generate random activities from a local seed list of 150+ story-worthy ideas.
- Filter by occasion, budget, location type, energy level, time of day, weather, and optional chaos level.
- Gradual fallback matching returns the best available idea when there is no exact match.
- Save generated activities as favorites.
- Remove favorites when you are done with them.
- Persist favorites locally with AsyncStorage.
- No backend or external APIs required.

## Tech Stack

- React Native
- TypeScript
- Expo
- AsyncStorage
- Functional components and hooks

## Project Structure

```text
/src
  /components   Shared UI components such as cards and filter chips
  /data         Local activity seed data
  /screens      Home, filters, and favorites screens
  /storage      AsyncStorage helpers
  /types        TypeScript data models and filter options
  /utils        Activity matching and fallback logic
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Expo Go on your iOS or Android device, or a configured simulator/emulator

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm start
```

Then scan the QR code with Expo Go or choose an emulator option from the Expo CLI.

### Platform shortcuts

```bash
npm run ios
npm run android
```

### Type-check

```bash
npm run typecheck
```

## How Matching Works

The Generate button first tries to find activities that match every selected filter, including chaos level when one is selected. If there is no exact match, the app scores each activity by how many selected filters it satisfies, then randomly chooses from the strongest relaxed matches. This keeps the result useful even when the selected combination is very specific.
