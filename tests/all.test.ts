import { assertEquals } from "@std/assert/equals";
import day_1 from "../src/day_1.ts";
import day_2 from "../src/day_2.ts";
import day_3 from "../src/day_3.ts";

interface Stringable {
  toString(): string;
}

const days: [
  number,
  { part1: () => Promise<Stringable>; part2: () => Promise<Stringable> },
  Stringable,
  Stringable,
][] = [
  [1, day_1, 2904518, 18650129],
  [2, day_2, 236, 308],
  [3, day_3, 174960292, 56275602],
];

Deno.test(async function solveAll(t) {
  for (const [day, { part1, part2 }, a1, a2] of days) {
    await t.step(`Day ${day}, part 1`, async () => {
      assertEquals(await part1(), a1);
    });
    await t.step(`Day ${day}, part 2`, async () => {
      assertEquals(await part2(), a2);
    });
  }
});
