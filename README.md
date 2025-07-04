# 🌊 Save Our Oceans Initiative

<div align="center">

![Ocean Cleanup](./screenshot.png)

**Blockchain-powered ocean cleanup fundraising platform on Stacks**

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-orange)](https://stacks.co)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black)](https://nextjs.org)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-blue)](https://clarity-lang.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://typescriptlang.org)

</div>

## 🎯 About the Project

Save Our Oceans Initiative is a decentralized fundraising platform that supports ocean cleanup missions using blockchain technology. This project leverages Clarity smart contracts on the Stacks blockchain to provide transparent and secure donation processes.

### 🌟 Key Features

- **🔒 Blockchain Security**: Clarity smart contracts on Stacks blockchain
- **🌊 Ocean Theme**: Fully marine-themed user interface
- **📊 Real-time Tracking**: Cleanup progress and marine life protection monitoring
- **🗺️ Interactive Map**: Global cleanup operations visualization
- **💰 Milestone-based Funding**: Target-based donation unlocking system
- **📱 Responsive Design**: Mobile-first ocean-themed interface
- **🔄 Real-time Updates**: Live donation and progress updates

### 📊 Ocean Dashboard Components

- **🗺️ Cleanup Map**: Interactive map of global cleanup locations
- **🐠 Marine Life Counter**: Protected species count with animated counters
- **📸 Photo Gallery**: Before/after comparison gallery
- **📊 Pollution Tracker**: Plastic cleanup statistics by type

## 🎯 Funding Goals

| Milestone | Amount | Purpose |
|-----------|--------|---------|
| **25%** | $12,500 STX | Cleanup Equipment & Initial Operations |
| **50%** | $25,000 STX | Advanced Technology Deployment |
| **75%** | $37,500 STX | Marine Life Protection Programs |
| **100%** | $50,000 STX | Full-scale Operations & Community Expansion |

*This is an educational example application. The provided smart contracts have not been audited.*

## 🚀 Development

To run the ocean cleanup platform with Stacks Devnet (private development blockchain environment), follow these steps:

### 🔧 Prerequisites

- **Node.js** v18+ 
- **npm** or **yarn**
- **Clarinet** (Clarity development)
- **Hiro Wallet** (for testing)

### 1. **Start Devnet in Hiro Platform**

   - Log into the [Hiro Platform](https://platform.hiro.so)
   - Navigate to your project and start Devnet (do not opt to update the Devnet deployment plan, as it's pre-configured with some contract calls to initialize the project)
   - Copy your API key from either:
     - The Devnet Stacks API URL: `https://api.platform.hiro.so/v1/ext/<YOUR-API-KEY>/stacks-blockchain-api`
     - Or from https://platform.hiro.so/settings/api-keys

### 2. **Local Environment Configuration**

**Install backend dependencies:**
```bash
cd clarity
npm install
```

**Install frontend dependencies:**
```bash
cd ../front-end
npm install
```


**Create environment file:**
```bash
cp front-end/.env.example front-end/.env
```

**Add your Hiro Platform API key to the `front-end/.env` file:**
```bash
NEXT_PUBLIC_PLATFORM_HIRO_API_KEY=your-api-key-here
```

### 3. **Launch Ocean Cleanup Application**

**Test smart contracts:**
```bash
cd clarity
npm test
```

**Start the Next.js application from the front-end directory:**
```bash
cd ../front-end
npm run dev
```

**View in browser:** Navigate to `http://localhost:3000` to interact with the ocean cleanup platform. If Devnet is running, your test wallets will already be funded and connected for testing.

## 🎨 Ocean Theme Customization

To customize your ocean cleanup campaign, edit the following files:

### 🌊 Color Palette & Theme
- **Ocean Blue**: `#0077BE` - Primary blue tone
- **Seafoam Green**: `#20B2AA` - Sea foam green  
- **Coral**: `#FF7F50` - Coral orange
- **Deep Sea**: `#003366` - Deep sea blue

### 📁 Customizable Files

- **`front-end/src/constants/campaign.ts`** - Campaign title and subtitle
- **`front-end/public/campaign-details.md`** - Campaign description content
- **`front-end/public/campaign/`** - Ocean cleanup operation images
- **`front-end/src/theme.ts`** - Ocean theme color configuration
- **`front-end/src/app/globals.css`** - Wave animations and ocean effects

### 🏗️ Project Structure

```
wave-of-change/
├── clarity/                    # Smart contracts
│   ├── contracts/
│   │   └── fundraising.clar   # Main fundraising contract
│   ├── tests/
│   │   └── fundraising.test.ts # Contract tests
│   └── deployments/           # Deployment configurations
├── front-end/                 # Next.js frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── CleanupMap.tsx      # Interactive cleanup map
│   │   │   ├── MarineLifeCounter.tsx # Marine life counter
│   │   │   ├── PhotoGallery.tsx     # Before/after gallery
│   │   │   ├── PollutionTracker.tsx # Pollution tracking system
│   │   │   └── CampaignDetails.tsx  # Main campaign interface
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   └── theme.ts          # Ocean theme configuration
│   └── public/
│       ├── campaign-details.md     # Campaign description
│       └── campaign/              # Ocean cleanup images
└── README.md
```

The provided Devnet deployment plan (`clarity/deployments/default.devnet-plan.yaml`) includes steps to initialize the campaign with a specific funding goal. You can customize this plan as desired.

When you're ready to deploy to Testnet or Mainnet, you can choose to add similar steps to your testnet/mainnet deployment plans, or you can initialize your campaign manually by calling the `fundraising.initialize-campaign` function on-chain.

## 🔗 About the Smart Contracts

This application uses a Clarity smart contract that handles fund collection.

### `fundraising.clar`

- Allows the contract owner to initialize the campaign with a fundraising goal in USD
- Accepts donations in STX or sBTC
- Tracks individual contributions
- Lets the beneficiary (contract owner) withdraw the raised funds if the goal is hit
- Allows the beneficiary to cancel the campaign and refund the contributions to the donors at any point

### 🌊 Ocean-Themed Features

#### Smart Contract Functions
```clarity
;; Main functions
(define-public (donate (amount uint)))
(define-public (withdraw-funds (amount uint)))
(define-read-only (get-campaign-info))
(define-read-only (get-donation-info (donor principal)))
```

#### Ocean Dashboard Components
- **🗺️ CleanupMap**: Real-time cleanup progress in 5 ocean regions
- **🐠 MarineLifeCounter**: 15 protected marine species counter
- **📸 PhotoGallery**: Swipeable before/after gallery
- **📊 PollutionTracker**: Plastic removal statistics by type

## 🧪 Testing with Devnet

The Hiro Platform's Devnet is a sandboxed, personal blockchain environment for testing your dApps before deploying them to the testnet or mainnet. Each time you start a new Devnet, it will reset the blockchain state and deploy your project contracts from scratch.

This is useful because deployments to the blockchain are permanent and cannot be undone. Ensure you have tested your contracts thoroughly in your Devnet before promoting them to Testnet or Mainnet.

If you make changes to your contract, you will need to push your changes and restart Devnet for the contract changes to appear in your Devnet.

### 1. Start Devnet and Deploy Contracts

1. Open your project in the Hiro Platform
2. Click "Start Devnet" to initialize your testing environment (the contracts will be automatically deployed per your deployment plan)
3. You should see your contracts deployed no later than block 45 in the Devnet dashboard

### 2. Testing Smart Contract Functions

Smart contract functions can be tested directly from your Platform dashboard.

1. Select the Devnet tab to confirm that your contracts are deployed and Devnet is running
2. Click "Interact with Devnet" and then "Call functions"
3. Select your contract and the function you want to test from the dropdown menus
4. Use one of the pre-funded devnet wallets as the caller and another as the recipient (if needed)
5. Click "Call function" to execute the function, which will either succeed or fail based on the function's logic and the caller's permissions
6. Once the function has been submitted, you can watch for the transaction to resolve on-chain in the Devnet dashboard and confirm that the function executed as expected

Remember that any changes to the contracts will require restarting Devnet and redeploying the contracts.

### 3. Ocean Cleanup Integration Testing

With Devnet running, you can test your front-end functionality and validate that it's working in the same way you just tested the ocean cleanup functions.

1. Confirm that your Devnet is running in the Platform dashboard and `npm run dev` is running in the front-end directory
2. Navigate to [http://localhost:3000](http://localhost:3000) to view and interact with the ocean cleanup app
3. Test donation, refunding, and withdrawal functionality using the pre-funded wallets. Use the wallet picker in the upper right corner to choose between different test wallets
4. Navigate to the Devnet dashboard in the Platform to view the transactions as they are submitted and resolved on-chain

You do not need to restart Devnet to test changes to your front-end.

## 🚀 Next Steps

Once you've thoroughly tested your ocean cleanup dApp in Devnet and are confident in its functionality, you can proceed to testing on the Stacks Testnet before launching on Mainnet.

### 🧪 Moving to Testnet

1. Use the [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet) to get test STX tokens
2. Update the environment variables in your `.env` file to add values for `NEXT_PUBLIC_CONTRACT_DEPLOYER_TESTNET_ADDRESS` and `NEXT_PUBLIC_CONTRACT_DEPLOYER_MAINNET_ADDRESS`. Add the STX wallet address you plan to deploy the contract with.
3. Deploy your contracts to the Testnet using the Platform dashboard and your deployment plan
4. Test your application with real network conditions and transaction times
5. Verify your contract interactions in the [Testnet Explorer](https://explorer.hiro.so/?chain=testnet)

### 🌊 Launching Ocean Cleanup on Mainnet

When you're ready to launch your ocean cleanup app:

1. Ensure you have real STX tokens for deployment and transaction costs
2. Update your deployment configuration to target Mainnet
3. Deploy your contracts through the Platform dashboard
4. Update your frontend environment variables to point to Mainnet
5. Launch your ocean cleanup application and begin processing real transactions!

**Remember:** Mainnet deployments are permanent and involve real cryptocurrency transactions. Double-check all contract code and frontend integrations before deploying to Mainnet.

## 🌊 Impact Metrics & Goals

### Target Ocean Impact
- **2.5M pounds** of plastic waste removal
- **15 marine species** protection programs
- **500 miles** of coastline rehabilitation
- **50K people** community engagement and awareness

### Technology Stack

| Category | Technology |
|----------|------------|
| **Blockchain** | Stacks, Clarity Smart Contracts |
| **Frontend** | Next.js 15, React 18, TypeScript |
| **UI/UX** | Chakra UI, Ocean Custom Theme |
| **Styling** | CSS Animations, Wave Effects |
| **Testing** | Vitest, React Testing Library |
| **Deployment** | Hiro Platform, Vercel |

---

<div align="center">

**🌊 Join the Wave of Change - Save Our Oceans! 🌊**

*Together, we can turn the tide on ocean pollution through blockchain technology.*

**Project Statistics:**
- 🎯 **Funding Goal**: $50,000 STX
- ⏱️ **Duration**: 90 days
- 🌍 **Global Impact**: Multiple ocean regions
- 💻 **Technology**: Stacks Blockchain + Next.js
- 🔒 **Security**: Clarity Smart Contracts
- 📱 **Mobile-First**: Responsive ocean theme

</div>
