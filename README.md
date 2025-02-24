# DMusic - Decentralized Music Streaming Platform

A blockchain-based music streaming platform that enables transparent and secure music distribution. The platform connects artists directly with listeners through smart contracts, ensuring fair compensation and decentralized content delivery.

## Tech Stack

### Frontend
- React + TypeScript
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling
- Web3.js for blockchain integration

### Backend
- Node.js + Express
- In-memory storage (can be extended to PostgreSQL)
- RESTful API endpoints

### Blockchain
- Solidity smart contracts
- Hardhat for development and testing
- OpenZeppelin contracts
- ERC721 for NFT-based music tokens

### Mobile (Expo)
- React Native
- Expo framework
- React Navigation
- Cross-platform (iOS/Android)

## Features

### Web Application
- User authentication with cryptocurrency wallet (MetaMask)
- Music streaming interface
- Artist profiles and portfolios
- Playlist management
- Search functionality
- Responsive design

### Smart Contracts
- Music NFT minting
- Streaming payment processing
- Artist royalty distribution
- Transparent transaction history

### Mobile Apps
- Cross-platform mobile experience
- Seamless music playback
- Playlist management
- Artist discovery
- Profile management

## Project Structure

```
├── client/                  # Web frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utilities and Web3 integration
│   │   └── pages/         # Route components
├── server/                 # Backend API
│   ├── routes.ts          # API endpoints
│   └── storage.ts         # Data storage implementation
├── contracts/             # Solidity smart contracts
│   └── MusicPlatform.sol  # Main contract
├── expo-mobile/           # Mobile application
│   ├── screens/          # Mobile screen components
│   └── App.tsx           # Mobile app entry
└── shared/               # Shared types and schemas
    └── schema.ts         # Data models
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MetaMask wallet
- Expo CLI (for mobile development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/veesajack/Dmusic.git
cd dmusic
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. For mobile development:
```bash
cd expo-mobile
npm install
npx expo start
```

### Environment Variables

Create a `.env` file with the following:

```
ETHEREUM_ENDPOINT=<your-ethereum-node-url>
DEPLOYER_PRIVATE_KEY=<your-private-key>
```

## Development Guidelines

### Web Development
- Follow the component structure in `client/src/components`
- Use shadcn UI components for consistent design
- Implement responsive layouts with Tailwind CSS
- Handle blockchain interactions through Web3 service

### Smart Contract Development
- Use Hardhat for testing and deployment
- Follow OpenZeppelin security best practices
- Implement proper access control
- Add comprehensive test coverage

### Mobile Development
- Use Expo for cross-platform compatibility
- Follow React Native best practices
- Implement responsive layouts
- Test on both iOS and Android

## API Documentation

### User Endpoints
- `GET /api/users/:id` - Get user profile
- `POST /api/users` - Create new user

### Song Endpoints
- `GET /api/songs` - List all songs
- `GET /api/songs/:id` - Get song details
- `POST /api/songs` - Upload new song
- `GET /api/songs/search` - Search songs

### Playlist Endpoints
- `GET /api/playlists` - List all playlists
- `GET /api/playlists/:id` - Get playlist details
- `POST /api/playlists` - Create new playlist
- `POST /api/playlists/:id/songs` - Add song to playlist

## License

MIT License

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.