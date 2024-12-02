import { getInput } from "./get_input.ts";

export function pairs<T>(items: T[]): [T, T][] {
  const outs: [T, T][] = [];

  for (let i = 0; i < (items.length - 1); i++) {
    outs.push([items[i], items[i + 1]]);
  }

  return outs;
}

export function reportIsSafe(nums: number[]): boolean {
  const ps = pairs(nums);
  const diffs = ps.map(([a, b]) => a - b);

  const signs = diffs.map((v) => v > 0);

  if (signs.some((v) => v != signs[0])) return false;
  if (diffs.map((v) => Math.abs(v)).some((v) => v < 1 || v > 3)) return false;

  return true;
}

export function droppingOne(nums: number[]): number[][] {
  const outs: number[][] = [];

  for (let i = 0; i < nums.length; i++) {
    const o = [...nums];
    o.splice(i, 1);
    outs.push(o);
  }

  return outs;
}

export function reportIsSafe2(nums: number[]): boolean {
  if (reportIsSafe(nums)) return true;

  return droppingOne(nums).some((r) => reportIsSafe(r));
}

export default {
  async part1() {
    const input = await getInput(2);

    const reports = input.trim().split("\n").map((line) => {
      return line.trim().split(/\D+/).map((v) => Number.parseInt(v));
    });
    return reports.filter(reportIsSafe).length;
  },

  async part2() {
    const input = await getInput(2);

    const reports = input.trim().split("\n").map((line) => {
      return line.trim().split(/\D+/).map((v) => Number.parseInt(v));
    });
    return reports.filter((v) => reportIsSafe2(v)).length;
  },
};
