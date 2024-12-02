import { getInput } from "./get_input.ts";

interface Sliceable<T> extends Iterable<T> {
  length: number;
  [index: number]: T;
  slice(start?: number, end?: number): Sliceable<T>;
}

export function* pairs<T>(items: Sliceable<T>): Generator<[T, T]> {
  // const outs: [T, T][] = [];

  for (let i = 0; i < (items.length - 1); i++) {
    yield [items[i], items[i + 1]];
  }

  // return outs;
}

export function reportIsSafe(nums: Sliceable<number>): boolean {
  const ps = pairs(nums);

  let lastSign = undefined;
  for (const [a, b] of ps) {
    const diff = a - b;
    const sign = diff > 0;

    if (lastSign !== undefined && lastSign !== sign) {
      return false;
    }
    lastSign = sign;

    const step = Math.abs(diff);
    if (step < 1 || step > 3) {
      return false;
    }
  }

  return true;
}

export function* droppingOne(nums: Sliceable<number>): Generator<number[]> {
  // The alternative non-generator version of this is faster,
  // despite being eager, but it also builds up all possible
  // outputs at once so uses more memory.

  for (let i = 0; i < nums.length; i++) {
    yield [...nums.slice(0, i), ...nums.slice(i+1)];
  }

}

export function reportIsSafe2(nums: Sliceable<number>): boolean {
  // this is redundant because dropping the first element (which is
  // the first iteration of droppingOne()) should only ever be more
  // permissive, not less, so we can skip one report on the longest
  // sequence.
  // if (reportIsSafe(nums)) return true;

  return droppingOne(nums).some(reportIsSafe);
}

export default {
  async part1() {
    const input = await getInput(2);

    const reports = input.trim().split("\n").map((line) => {
      return line.trim().split(" ").map((v) => Number.parseInt(v));
    });
    return reports.filter(reportIsSafe).length;
  },

  async part2() {
    const input = await getInput(2);

    const reports = input.trim().split("\n").map((line) => {
      return line.trim().split(" ").map((v) => Number.parseInt(v));
    });
    return reports.filter(reportIsSafe2).length;
  },
};
