import { assertEquals } from "@std/assert/equals";
import {
  checkOrder,
  fetchAll,
  makeChecksum,
  parseInput,
  reorderUpdate,
  TEST_INPUT,
} from "../src/day_5.ts";

Deno.test("check fetchAll", () => {
  const deps = new Map<number, number[]>();
  deps.set(1, [2, 3]);
  deps.set(2, [4, 5]);
  // introduce a cycle
  deps.set(5, [3]);

  assertEquals(fetchAll(deps, 1, new Set([1, 2, 5])), new Set([2, 3, 4, 5]));
});

Deno.test("check ordering", () => {
  const { updates, deps, reverse } = parseInput(TEST_INPUT);

  assertEquals(updates.map((u) => checkOrder(u, { deps, reverse })), [
    true,
    true,
    true,
    false,
    false,
    false,
  ]);
});

Deno.test("check checksumming", () => {
  const updates = [[75, 47, 61, 53, 29], [97, 61, 53, 29, 13], [75, 29, 13]];

  assertEquals(makeChecksum(updates), 143);
});

Deno.test("part1 test input", () => {
  const { updates, deps, reverse } = parseInput(TEST_INPUT);
  const validUpdates = updates.filter((u) => checkOrder(u, { deps, reverse }));

  const checksum = makeChecksum(validUpdates);

  assertEquals(checksum, 143);
});

Deno.test("part2 test input", () => {
  const { updates, deps, reverse } = parseInput(TEST_INPUT);
  const invalidUpdates = updates.filter((u) =>
    !checkOrder(u, { deps, reverse })
  );

  const reordered = invalidUpdates.map((u) =>
    reorderUpdate(u, { deps, reverse })
  );

  assertEquals(
    reordered,
    [
      [97, 75, 47, 61, 53],
      [61, 29, 13],
      [97, 75, 47, 29, 13],
    ],
  );

  assertEquals(makeChecksum(reordered), 123);
});
