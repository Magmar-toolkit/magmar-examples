import { AAmagmar } from "@magmar-toolkit/magmar-aa-sdk";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.MAGMAR_API_KEY!;
const privateKey = process.env.PRIVATE_KEY!;
const bundlerEndpoint = process.env.BUNDLER_ENDPOINT!;
const paymasterEndpoint = process.env.PAYMASTER_ENDPOINT!;
const rpcUrl = process.env.RPC_URL!;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = new ethers.Wallet(privateKey, provider);

async function main() {
  try {
    const client = new AAmagmar(apiKey);
    const smartAccountAddress = await client.init(signer.provider!, {
      chainId: 1,
      privateKey,
      rpcUrl,
      bundlerEndpoint,
      paymaster: "MAGMAR",
      paymasterEndpoint,
    });

    console.log("✅ Smart Account Address:", smartAccountAddress);
  } catch (err) {
    console.error("❌ Initialization failed:", err);
  }
}

main();
