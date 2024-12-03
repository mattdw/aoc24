import { assertEquals } from "@std/assert/equals";
import { parseInput, parseInputStepwise } from "../src/day_3.ts";

Deno.test("parsing 1", () => {
  assertEquals(
    parseInput("mul(1,2)aksldhfsjdkfhakmul(3,  4)al asdjflskjdf\nmul(5,6)"),
    [[1, 2], [5, 6]],
  );
});

Deno.test("parsing stepwise", () => {
  let tokens = parseInputStepwise(
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
  );

  assertEquals(tokens, [[2, 4], "dont", [5, 5], [11, 8], "do", [8, 5]]);
});
