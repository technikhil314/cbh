const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input or falsy input", () => {
    let trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
    trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
    trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe("0");
  });

  it("returns the sha hash if passed a simple string", () => {
    const hash = deterministicPartitionKey("demo");
    expect(hash).toBe("78db71dc1ee4c3a75bf1682f7f9b1fc286a29904ea69d14d3da1e0237087b7346c56bd27ea8fe6140750486ba171f20c00b0a942fcf58fc066a11d5a8a0cdf40")
  })

  it("returns the sha hash if passed a object", () => {
    const hash = deterministicPartitionKey({ demo: "demo" });
    expect(hash).toBe("b6cf4ad02adb7c342d1e885959d68d645a7b10b78a9c183a00d3fa6ffe028609cc16098afc07148fefc620e03a376ccf6449cabed9f1915685a9573b748fbe74")
  })

  it("returns sha if partition key is falsy", () => {
    let hash = deterministicPartitionKey({
      partitionKey: undefined
    });
    expect(hash).toBe("c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862")
    hash = deterministicPartitionKey({
      partitionKey: null
    });
    expect(hash).toBe("58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2")
    hash = deterministicPartitionKey({
      partitionKey: ""
    });
    expect(hash).toBe("b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6")
  })

  it("returns same partition key if length is less than or equals MAX_PARTITION_KEY_LENGTH", () => {
    let hash = deterministicPartitionKey({
      partitionKey: "demo"
    });
    expect(hash).toBe("demo")
    hash = deterministicPartitionKey({
      partitionKey: "eeNISRFnhev9JviDBEZWLsjQsZupwz7yimGYDh8DuLcsrw0jtmBbUB9i3XraUGeDwTx7I7aVFA3GBnqQtkYmV5XnVebnDX6Fnml4c3T6Kbn0k3rNr1wbKiXiOW8NYd5F4SWW5vTa6JSiNnqiNZ5t4dXtyEZooY5eczBjmyRCxEUKVEHlGICpJv0iVpIpgXrC0HKbWAav58xRmfjLSkDsmv2hzJCzvzWF2mEARYMdV0o12Pbrg3cjUwxOA6m1gVp0"
    });
    expect(hash).toBe("eeNISRFnhev9JviDBEZWLsjQsZupwz7yimGYDh8DuLcsrw0jtmBbUB9i3XraUGeDwTx7I7aVFA3GBnqQtkYmV5XnVebnDX6Fnml4c3T6Kbn0k3rNr1wbKiXiOW8NYd5F4SWW5vTa6JSiNnqiNZ5t4dXtyEZooY5eczBjmyRCxEUKVEHlGICpJv0iVpIpgXrC0HKbWAav58xRmfjLSkDsmv2hzJCzvzWF2mEARYMdV0o12Pbrg3cjUwxOA6m1gVp0")
  })

  it("returns hash if partition key length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const hash = deterministicPartitionKey({
      partitionKey: "eeNISRFnhev9JviDBEZWLsjQsZupwz7yimGYDh8DuLcsrw0jtmBbUB9i3XraUGeDwTx7I7aVFA3GBnqQtkYmV5XnVebnDX6Fnml4c3T6Kbn0k3rNr1wbKiXiOW8NYd5F4SWW5vTa6JSiNnqiNZ5t4dXtyEZooY5eczBjmyRCxEUKVEHlGICpJv0iVpIpgXrC0HKbWAav58xRmfjLSkDsmv2hzJCzvzWF2mEARYMdV0o12Pbrg3cjUwxOA6m1gVp00"
    });
    expect(hash).toBe("389ac7ea419e0b3bc29ab440c985c715ac6167027ba09bb89a27fad4c7a23497b4d3ee22c07100e827579163d120e126ba4490cdf8177572b2ef196d265de89b")
  })

  it("returns hash if partition key is not string", () => {
    const hash = deterministicPartitionKey({
      partitionKey: {
        demo: "eeNISRFnhev9JviDBEZWLsjQsZupwz7yimGYDh8DuLcsrw0jtmBbUB9i3XraUGeDwTx7I7aVFA3GBnqQtkYmV5XnVebnDX6Fnml4c3T6Kbn0k3rNr1wbKiXiOW8NYd5F4SWW5vTa6JSiNnqiNZ5t4dXtyEZooY5eczBjmyRCxEUKVEHlGICpJv0iVpIpgXrC0HKbWAav58xRmfjLSkDsmv2hzJCzvzWF2mEARYMdV0o12Pbrg3cjUwxOA6m1gVp00"
      }
    });
    expect(hash).toBe("8bbaf7b7602e01b9342bd593053275d5fe6444139ea1f78f9921b360722dd878270086f5a707be0b962c29386b53eca9374b29bc945f4172817f4e3e3e63b1c0")
  })

  it("returns hash if partition key is not string but sealized json length is less that MAX_PARTITION_KEY_LENGTH", () => {
    const partitionKey = {
      demo: "demo"
    }
    const hash = deterministicPartitionKey({
      partitionKey
    });
    expect(hash).toBe(JSON.stringify(partitionKey))
  })
});
