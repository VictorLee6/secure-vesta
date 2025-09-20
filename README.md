# ⏳ Secure Vesta

> **Confidential Token Vesting with Time-Lock Encryption**

Secure Vesta revolutionizes token vesting through advanced cryptographic techniques, ensuring that vesting schedules remain completely confidential until release conditions are met. Built on Ethereum with FHE (Fully Homomorphic Encryption) technology.

## 🌟 Key Features

### 🔐 **Encrypted Vesting Schedules**
- Vesting details remain encrypted until release time
- Zero-knowledge proof capabilities
- Time-lock security mechanisms

### ⏰ **Smart Release Conditions**
- Time-based automatic releases
- Milestone-triggered vesting
- Custom condition support

### 👥 **Multi-Party Architecture**
- Team member allocations
- Investor vesting schedules
- Advisor token distributions

### 🛡️ **Advanced Security**
- FHE encryption for sensitive data
- Reputation-based verification
- Access control mechanisms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/VictorLee6/secure-vesta.git
cd secure-vesta

# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env` file with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Integration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID

# API Configuration
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

## 🏗️ Architecture

### Frontend Stack
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library

### Web3 Integration
- **RainbowKit** - Wallet connection
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum

### Smart Contracts
- **Solidity** - Smart contract language
- **FHE Integration** - Fully homomorphic encryption
- **Sepolia Testnet** - Ethereum test network

## 📁 Project Structure

```
secure-vesta/
├── contracts/           # Smart contracts
│   └── SecureVesta.sol  # Main vesting contract
├── src/
│   ├── components/      # React components
│   ├── pages/          # Application pages
│   ├── lib/            # Utility functions
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
└── scripts/            # Build and deployment scripts
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Smart Contract Development

The project includes a comprehensive FHE-enabled vesting contract:

- **Encrypted Data Storage**: All sensitive vesting data is encrypted
- **Time-Lock Mechanisms**: Automatic release based on blockchain timestamps
- **Conditional Releases**: Milestone and time-based triggers
- **Reputation System**: Trust-based verification

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**: Import from GitHub to Vercel
2. **Configure Environment**: Add environment variables
3. **Deploy**: Automatic deployment on push

### Environment Variables for Production

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

## 🔒 Security Considerations

### FHE Implementation
- All vesting schedules encrypted with FHE
- Release conditions remain confidential
- Zero-knowledge proof capabilities
- Secure multi-party computation

### Smart Contract Security
- Access control mechanisms
- Time-lock security
- Reputation-based verification
- Emergency pause functionality

## 📊 Use Cases

### 🏢 **Corporate Token Vesting**
- Employee stock options
- Executive compensation
- Long-term incentive plans

### 💼 **Investment Vesting**
- VC token allocations
- Angel investor distributions
- Strategic partnership tokens

### 🎯 **Advisor Programs**
- Technical advisor tokens
- Business advisor allocations
- Community contributor rewards

## 🛠️ Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: Check the `/docs` directory
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Security**: Report security issues privately

## 🔗 Links

- **Live Demo**: [Deployed on Vercel]
- **Documentation**: [Project Wiki]
- **Smart Contract**: [Etherscan Sepolia]
- **Community**: [Discord Server]

---

**Built with ❤️ for the decentralized future**

*Secure Vesta - Where time meets encryption*