import { getInput } from "./get_input.ts";

export function getNumLists(s: string): [number[], number[]] {
  const splits = s.trim().split(/\D+/g).map((v) => Number.parseInt(v));

  const lists: [number[], number[]] = [[], []];
  let which = 0;
  for (const num of splits) {
    lists[which].push(num);
    which = (which + 1) % lists.length;
  }

  return lists;
}

export function countList(nums: number[]): Map<number, number> {
  return new Map(
    Map.groupBy(nums, (v) => v).entries().map(([k, v]) => [k, v.length]),
  );
}

export default {
  part1: async () => {
    const lists = getNumLists(await getInput(1));
    lists.forEach((l) => l.sort());

    let idx = 0;
    let diff = 0;
    while (idx < lists[0].length) {
      diff += Math.abs(lists[0][idx] - lists[1][idx]);
      idx++;
    }

    return diff;
  },

  part2: async () => {
    const lists = getNumLists(await getInput(1));
    const counts = countList(lists[1]);

    let sum = 0;
    for (const num of lists[0]) {
      sum += num * (counts.get(num) ?? 0);
    }
    return sum;
  },
};
