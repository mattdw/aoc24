import { getInput } from "./get_input.ts";

export const TEST_INPUT = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

export function parseInput(s: string): {
  deps: Map<number, number[]>;
  reverse: Map<number, number[]>;
  updates: number[][];
} {
  const [depsSection, updatesSection] = s.split("\n\n");

  const deps = depsSection.matchAll(/^(\d+)\|(\d+)$/gm).map((m) => [
    Number.parseInt(m[1]),
    Number.parseInt(m[2]),
  ]);

  const depsMap = new Map<number, number[]>();
  const reverseMap = new Map<number, number[]>();

  deps.forEach(([x, y]) => {
    const curr = depsMap.get(y) ?? [];
    curr.push(x);
    depsMap.set(y, curr);

    const currRev = reverseMap.get(x) ?? [];
    currRev.push(y);
    reverseMap.set(x, currRev);
  });

  const updates = updatesSection.trim().split("\n").map((line) => {
    return line.trim().split(",").map((v) => Number.parseInt(v));
  });

  // console.log([...deps]);
  return {
    deps: depsMap,
    reverse: reverseMap,
    updates,
  };
}

export function fetchAll(
  map: Map<number, number[]>,
  n: number,
  relevant: Set<number>,
): Set<number> {
  const outs = new Set<number>();
  const queue = [n];

  while (queue.length) {
    const nxt = queue.pop()!;
    if (!relevant.has(nxt)) continue;
    const vals = map.get(nxt) ?? [];
    vals.forEach((v) => {
      if (!outs.has(v)) {
        queue.push(v);
        outs.add(v);
      }
    });
  }

  return outs;
}

export function checkOrder(
  update: number[],
  maps: { deps: Map<number, number[]>; reverse: Map<number, number[]> },
): boolean {
  const updateNumbers = new Set(update);
  const seen = new Set<number>();

  for (const n of update) {
    const deps = fetchAll(maps.reverse, n, updateNumbers);
    if (Array.from(deps).some((v) => seen.has(v))) {
      return false;
    }
    seen.add(n);
  }
  return true;
}

export function makeChecksum(validUpdates: number[][]): number {
  return validUpdates.map((v) => {
    console.assert(v.length % 2 == 1, "Not an odd length");
    const middleIndex = Math.floor(v.length / 2);
    return v[middleIndex];
  }).reduce((a, b) => a + b, 0);
}

export function reorderUpdate(
  update: number[],
  maps: { deps: Map<number, number[]>; reverse: Map<number, number[]> },
): number[] {
  const numbers = new Set(update);

  return update.toSorted((a, b) => {
    if (fetchAll(maps.deps, a, numbers).has(b)) {
      return 1;
    }

    if (fetchAll(maps.deps, b, numbers).has(a)) {
      return -1;
    }

    return 0;
  });
}

export default {
  async part1() {
    const { deps, reverse, updates } = parseInput(await getInput(5));

    // updates.forEach(u => {
    // 	console.log(u.toString());
    // });

    const validUpdates = updates.filter((u) =>
      checkOrder(u, { reverse, deps })
    );

    // console.log(validUpdates);
    return makeChecksum(validUpdates);
  },

  async part2() {
    const { updates, deps, reverse } = parseInput(await getInput(5));
    const invalidUpdates = updates.filter((u) =>
      !checkOrder(u, { deps, reverse })
    );

    const reordered = invalidUpdates.map((u) =>
      reorderUpdate(u, { deps, reverse })
    );

    return makeChecksum(reordered);
  },
};
