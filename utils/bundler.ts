import { UserOperation } from "@magmar-toolkit/magmar-aa-sdk";

/**
 * Formats and logs a batch of user operations for debug and visibility.
 */
export function logUserOps(ops: UserOperation[]): void {
  console.log("\n🔗 Prepared UserOperations:");
  ops.forEach((op, i) => {
    console.log(`\n#${i + 1}`);
    console.log("To:", op.to);
    console.log("Data:", op.data);
    if ("value" in op) console.log("Value:", op.value);
  });
}

/**
 * Validate structure before submission (basic dev-stage sanitation).
 */
export function validateOps(ops: UserOperation[]): boolean {
  return ops.every((op) => op.to && typeof op.data === "string");
}
