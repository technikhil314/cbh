const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    const data = JSON.stringify(event);
    return createHash(data);
  }
  const { partitionKey } = event
  const candidate = typeof partitionKey !== "string" ? JSON.stringify(partitionKey) : partitionKey;

  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }
  return createHash(candidate);
};