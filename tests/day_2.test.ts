import { assertEquals } from "@std/assert/equals";
import { reportIsSafe } from "../src/day_2.ts";

Deno.test("check safe", () => {
  ([
    [[7, 6, 4, 2, 1], true],
    [[1, 2, 7, 8, 9], false],
    [[9, 7, 6, 2, 1], false],
    [[1, 3, 2, 4, 5], false],
    [[8, 6, 4, 4, 1], false],
    [[1, 3, 6, 7, 9], true],
  ] as [number[], boolean][]).forEach(([nums, res]) => {
    assertEquals(reportIsSafe(nums), res);
  });
});

// Deno.test(async function part1() {
//   assertEquals(await day2.part1(), 236);
// });

// Deno.test(async function part2() {
//   assertEquals(await day2.part2(), 308);
// });
