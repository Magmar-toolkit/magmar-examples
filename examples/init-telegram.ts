import { AAmagmarTG } from '@magmar-toolkit/magmar-aa-sdk';
import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.MAGMAR_API_KEY!;
const telegramUserId = process.env.TELEGRAM_ID!;
const walletAddress = process.env.TELEGRAM_WALLET!;
const rpcUrl = process.env.RPC_URL!;
const bundlerEndpoint = process.env.BUNDLER_ENDPOINT!;
const paymasterEndpoint = process.env.PAYMASTER_ENDPOINT!;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

async function main() {
  try {
    const client = new AAmagmarTG(apiKey, {
      chainId: 1,
      telegramUserId,
      walletAddress,
      rpcUrl,
      isSponsoredTrx: true,
      paymaster: 'MAGMAR',
      paymasterEndpoint,
      bundlerEndpoint
    });

    const smartAccountAddress = await client.init(provider);
    console.log('✅ Smart Account Address:', smartAccountAddress);
  } catch (err) {
    console.error('❌ Telegram-based init failed:', err);
  }
}

main();
