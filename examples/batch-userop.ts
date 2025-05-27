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
    await client.init(signer.provider!, {
      chainId: 1,
      privateKey,
      rpcUrl,
      bundlerEndpoint,
      paymaster: "MAGMAR",
      paymasterEndpoint,
    });

    const batchedCalls = [
      {
        to: process.env.TARGET_CONTRACT_1!,
        data: "0xabcdef", // Replace with actual calldata
      },
      {
        to: process.env.TARGET_CONTRACT_2!,
        data: "0x123456", // Replace with actual calldata
      },
    ];

    const tx = await client.sendBatchUserOp(batchedCalls);
    console.log("✅ Batch UserOp sent. Tx Hash:", tx.hash);
  } catch (err) {
    console.error("❌ Batch UserOp failed:", err);
  }
}

main();
