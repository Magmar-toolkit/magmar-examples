# Magmar SDK Example — Programmable Wallets in Action

> A comprehensive reference implementation showcasing the advanced capabilities of the [Magmar AA SDK](https://github.com/magmar-toolkit/magmar-aa-sdk). Built for developers who want to move beyond key-based wallets and into composable, programmable, and secure smart account infrastructures.

---

## ⚙️ Overview

**Magmar** redefines wallet architecture:

- 🧠 **Programmable Smart Accounts** via `AAmagmar` and `AAmagmarTG`
- 🔐 **Multi-factor & Social Recovery** with extensible key infrastructure
- 💼 **Modular ERC-4337 UserOperations** for batching, automation, and atomic logic
- ⚖️ **Permission Control Layers** with paymasters, guards, session keys, and policy enforcement

This repository provides real-world usage examples for:

| Feature                      | Module/Example                        |
| ---------------------------- | ------------------------------------- |
| 🔑 Private Key Bootstrapping | `init-privatekey.ts`                  |
| 🌐 Particle Auth Integration | `init-social-particle.ts`             |
| 🧭 Web3Auth Login Flow       | `init-social-web3auth.ts`             |
| 💬 Telegram Integration      | `init-telegram.ts` (via `AAmagmarTG`) |
| ⚙️ Batch Transactions        | `batch-userop.ts`                     |

---

## 🧬 Architecture: Modular Wallet Stack

```mermaid
flowchart TD
  subgraph Application Layer
    A1[(User Interface)]
    A2[Injected Provider]
  end

  subgraph SDK Layer
    B1[(Magmar SDK)]
    B2[init - provider, options]
    B3[Session & Wallet Resolver]
    B4[UserOperation Composer]
  end

  subgraph Infrastructure Layer
    C1[(Bundler ERC-4337 compliant)]
    C2[Paymaster - Sponsored tx]
    C3[EntryPoint Contract]
    C4[(Smart Contract Wallet via Factory)]
  end

  subgraph Execution Targets
    D1[DeFi Protocols - Uniswap, Aave]
    D2[NFT Marketplaces - Blur, OpenSea]
    D3[DAO Contracts]
    D4[Automation Modules]
  end

  A1 --> A2
  A2 --> B1
  B1 --> B2 --> B3 --> B4
  B4 --> C1
  B4 --> C2
  C1 --> C3 --> C4

  C4 --> D1
  C4 --> D2
  C4 --> D3
  C4 --> D4

  style C2 stroke-dasharray: 5 5
  style D1 stroke:#0e9aa7
  style D2 stroke:#f6cd61
  style D3 stroke:#fe8a71
  style D4 stroke:#b388eb
```

---

## 🧠 Initialization Modes

### 🔐 Private Key / RPC

```ts
import { AAmagmar } from "@magmar-toolkit/magmar-aa-sdk";

const client = new AAmagmar(apiKey);
const smartAddress = await client.init(ethersProvider, {
  chainId: 1,
  privateKey: "0x...",
  bundlerEndpoint: "https://...",
  paymaster: "MAGMAR",
  paymasterEndpoint: "https://...",
});
```

### 🌐 Social Login via Particle

```ts
import { ParticleNetwork } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { AAmagmar } from "@magmar-toolkit/magmar-aa-sdk";

const particle = new ParticleNetwork({
  /* config */
});
const ethersProvider = new ethers.providers.Web3Provider(
  new ParticleProvider(particle.auth)
);

const client = new AAmagmar(apiKey);
await client.init(ethersProvider, { chainId: 1 });
```

### 💬 Telegram Login (MagmarTG)

```ts
import { AAmagmarTG } from "@magmar-toolkit/magmar-aa-sdk";

const client = new AAmagmarTG(apiKey, {
  telegramUserId: "12345678",
  walletAddress: "0xABC...DEF",
  rpcUrl: "https://mainnet.infura.io/v3/...",
  chainId: 1,
  isSponsoredTrx: true,
});

await client.init(ethersProvider);
```

---

## 🧪 Execution Flow (ERC-4337 UserOp)

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant SDK as Magmar SDK
    participant Bundler
    participant EntryPoint
    participant Wallet as Smart Wallet

    Dev->>SDK: init(provider, options)
    SDK->>Bundler: sendUserOp()
    Bundler->>EntryPoint: handleOps()
    EntryPoint->>Wallet: executeBatch()
    Wallet-->>EntryPoint: success
```

## 🔐 Recovery Flow (Social Recovery / Delegated Keys)

```mermaid
sequenceDiagram
    participant User as Original Wallet Owner
    participant Guardian as Recovery Contact
    participant SDK as Magmar SDK
    participant EntryPoint
    participant Wallet as Smart Wallet

    Note over User, Guardian: Trigger lost access flow

    User->>SDK: initiateRecovery({ walletAddress })
    SDK->>Guardian: Request guardian signature(s)
    Guardian-->>SDK: Sign recovery payload
    SDK->>EntryPoint: submitRecoveryUserOp()
    EntryPoint->>Wallet: executeRecovery(newOwner)
    Wallet-->>EntryPoint: Ownership reassigned
    SDK-->>User: Access restored
```

---

## 📦 Project Layout

```
magmar-sdk-example/
├── examples/
│   ├── init-privatekey.ts        # SDK bootstrap with raw key
│   ├── init-social-particle.ts   # Particle + ethersProvider
│   ├── init-social-web3auth.ts   # Web3Auth modal integration
│   ├── init-telegram.ts          # AAmagmarTG setup
│   └── batch-userop.ts           # Multi-call ERC-4337 UserOp
├── utils/
│   ├── bundler.ts                # Bundler formatting logic
│   └── provider.ts               # RPC & signer utils
├── .env.example
├── README.md
└── package.json
```

---

## 🛠️ Local Development

```bash
git clone https://github.com/your-org/magmar-sdk-example && cd magmar-sdk-example
yarn install
cp .env.example .env
```

Run any example:

```bash
ts-node examples/init-privatekey.ts
```

---

## 🧠 About Magmar

Magmar is not a wallet — it's a smart operating system for wallet logic.

- 📜 **ERC-4337 Abstraction Layer**
- 🛡️ **Security Modules**: social recovery, passkeys, MPC, 2FA
- ⚙️ **Composable Wallet Logic**: plug-in paymasters, modules, guards
- 🔁 **Atomic UserOp Batching**: DeFi, DAO, and NFT flows

---

## 🌐 Learn More

- [Magmar AA SDK](https://github.com/magmar-toolkit/magmar-aa-sdk)
- [ERC-4337 Explainer](https://eips.ethereum.org/EIPS/eip-4337)
- [Web3Auth](https://web3auth.io/docs)
- [Particle Network](https://docs.particle.network)

---

> Magmar is Web3-native programmable finance — brought to life.
