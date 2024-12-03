import { AssertionError } from "@std/assert/assertion-error";
import { getInput } from "./get_input.ts";

export function parseInput(s: string) {
  return s.matchAll(/mul\((\d+),(\d+)\)/g).map(
    (v) => [Number.parseInt(v[1]), Number.parseInt(v[2])],
  ).toArray();
}

export function parseInputStepwise(s: string) {
  let idx = 0;

  function nextMatch() {
    const match = s.slice(idx).match(/(do\(\)|don\'t\(\)|mul\((\d+),(\d+)\))/);

    if (match != null) {
      idx += (match.index ?? 0) + match[0].length;
    }
    // console.log(match);
    return match;
  }

  let m;
  const tokens: ("do" | "dont" | [number, number])[] = [];
  // deno-lint-ignore no-cond-assign
  while (m = nextMatch()) {
    if (m[1] == "do()") {
      tokens.push("do");
    } else if (m[1] == "don't()") {
      tokens.push("dont");
    } else if (m[2] && m[3]) {
      tokens.push([parseInt(m[2]), parseInt(m[3])]);
    } else {
      throw new AssertionError("should be unreachable");
    }
  }

  return tokens;
}

export default {
  async part1() {
    return parseInput(await getInput(3)).map(([a, b]) => a * b).reduce(
      (acc, val) => acc + val,
      0,
    );
  },
  async part2() {
    const toks = parseInputStepwise(await getInput(3));

    let enabled = true;
    let sum = 0;
    for (const tok of toks) {
      if (tok == "do") {
        enabled = true;
        continue;
      } else if (tok == "dont") {
        enabled = false;
        continue;
      } else {
        if (enabled) {
          sum += tok[0] * tok[1];
        }
        continue;
      }
    }

    return sum;
  },
};
