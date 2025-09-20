# Secure Vesta

A confidential token vesting platform built with FHE (Fully Homomorphic Encryption) technology. Secure Vesta enables private vesting schedules for teams and investors with encrypted release conditions that remain confidential until the appropriate time.

## Features

- **Encrypted Vesting Schedules**: Vesting details remain confidential until release conditions are met
- **Multi-Party Support**: Perfect for team members, advisors, and investor allocations  
- **Time-Lock Security**: Automated release based on blockchain timestamps and conditions
- **FHE Integration**: Core data encryption using Fully Homomorphic Encryption
- **Wallet Integration**: Seamless connection with popular Web3 wallets

## Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3**: RainbowKit, Wagmi, Viem
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Blockchain**: Ethereum Sepolia Testnet

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VictorLee6/secure-vesta.git
cd secure-vesta
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following environment variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/            # Application pages
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── assets/           # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security

This project implements FHE (Fully Homomorphic Encryption) to ensure that vesting schedules and sensitive data remain encrypted and confidential. The encryption ensures that even the contract deployer cannot access the vesting details until the appropriate release conditions are met.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository.