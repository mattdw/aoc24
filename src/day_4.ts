import { getInput } from "./get_input.ts";
import { pairs } from "./lib.ts";

const LETTER_PAIRS = pairs(["X", "M", "A", "S"]).toArray();

export const TEST_INPUT = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();

interface Grid {
  width: number;
  height: number;
  cells: string[][];
}

export function makeGrid(s: string) {
  const rows: string[][] = [];
  let row: string[] = [];

  for (const c of s.trim()) {
    switch (c) {
      case "\n":
        rows.push(row);
        row = [];
        break;
      case "X":
      case "M":
      case "A":
      case "S":
        row.push(c);
        break;
      case " ":
      case "\t":
        break;
      default:
        console.assert(false, "Bad character", c);
    }
  }

  if (row.length) {
    rows.push(row);
  }

  return {
    cells: rows,
    width: rows[0]?.length ?? 0,
    height: rows.length,
  };
}

export function neighbors(
  c: [number, number],
  gatherFrom: Grid,
): [[number, number], string?][] {
  const outs: [[number, number], string?][] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x == 0 && y == 0) continue;
      const ox = c[0] + x;
      const oy = c[1] + y;

      if (
        ox < 0 || oy < 0 || ox >= gatherFrom.width || oy >= gatherFrom.height
      ) {
        continue;
      }
      const val = gatherFrom.cells[oy][ox];
      outs.push(
        [[ox, oy], val],
      );
    }
  }
  return outs;
}

export function* gridEntries(g: Grid): Generator<[[number, number], string]> {
  for (let x = 0; x < g.width; x++) {
    for (let y = 0; y < g.height; y++) {
      yield [[x, y], g.cells[y][x]];
    }
  }
}

export default {
  async part1() {
    const grid = makeGrid(await getInput(4));
    // console.log(gridEntries(grid).toArray());

    // let pass: number[][] = grid.cells.map(v => v.map(c => c == 'X' ? 1 : 0));
    // console.log(prevPass);

    let sum = 0;
    for (const [co, val] of gridEntries(grid)) {
      if (val !== "X") continue;

      for (
        const [dx, dy] of [
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1],
          [-1, -1],
          [-1, 0],
          [-1, 1],
        ]
      ) {
        let offset = 1;
        let found = true;
        for (const c of "MAS") {
          if (grid.cells[co[1] + dy * offset]?.[co[0] + dx * offset] != c) {
            found = false;
            break;
          }

          offset += 1;
        }
        if (found) sum += 1;
      }
    }

    // DOH it's a straight line not just a search
    // let sum = 0;
    // for (const [from, to] of LETTER_PAIRS) {
    // 	console.log(from, to);
    // 	const prevPass = pass.map(v => v.map(v2 => v2));
    // 	for (const [co, val] of gridEntries(grid)) {
    // 		if (val == to) {
    // 			const neighborVals = neighbors(co, grid)
    // 			.filter(([_, v]) => v == from)
    // 			.map(([nCo, _v]) => {
    // 				// console.log(nCo, _v);
    // 				return prevPass[nCo[1]][nCo[0]]
    // 			})
    // 			.reduce((a, b) => a + b, 0);

    // 			pass[co[1]][co[0]] = neighborVals;

    // 			if (to == "S") {
    // 				sum += neighborVals;
    // 			}
    // 		} else {
    // 			pass[co[1]][co[0]] = 0;
    // 		}
    // 	}
    // 	console.log(pass);
    // }

    return sum;
  },

  async part2() {
    const grid = makeGrid(await getInput(4));
    // const grid = makeGrid(TEST_INPUT);
    // console.log(gridEntries(grid).toArray());

    // let pass: number[][] = grid.cells.map(v => v.map(c => c == 'X' ? 1 : 0));
    // console.log(prevPass);

    let sum = 0;
    for (const [co, val] of gridEntries(grid)) {
      if (val !== "A") continue;

      const offset_pairs = [[[-1, -1], [1, 1]], [[1, -1], [-1, 1]]];
      if (
        offset_pairs.every((coords) => {
          let vals = coords.map(([x, y]) => grid.cells[co[1] + x]?.[co[0] + y])
            .toSorted();
          return vals[0] == "M" && vals[1] == "S";
        })
      ) {
        sum += 1;
      }
    }

    return sum;
  },
};
