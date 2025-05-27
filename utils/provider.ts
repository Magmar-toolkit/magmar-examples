import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

/**
 * Initializes a JsonRpcProvider using the RPC_URL from .env.
 */
export function getRpcProvider(): ethers.providers.JsonRpcProvider {
  const rpcUrl = process.env.RPC_URL;
  if (!rpcUrl) throw new Error("Missing RPC_URL in environment");
  return new ethers.providers.JsonRpcProvider(rpcUrl);
}

/**
 * Returns a Wallet instance connected to the configured RPC.
 */
export function getSigner(): ethers.Wallet {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error("Missing PRIVATE_KEY in environment");
  return new ethers.Wallet(privateKey, getRpcProvider());
}
