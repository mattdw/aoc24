import { assertEquals } from "@std/assert/equals";
import { getNumLists, countList } from "../src/day_1.ts";
import day1 from "../src/day_1.ts";

Deno.test(function inputParsing () {
	assertEquals(getNumLists(`1   2
		3  4
5  6   `), [[1, 3, 5], [2, 4, 6]]);
});

Deno.test(async function checkPart1() {
	assertEquals(2904518, await day1.part1());
})

Deno.test(function counts () {
	const counts = countList([1, 1, 2, 2, 2, 3]);

	assertEquals(counts.get(1), 2);
	assertEquals(counts.get(3), 1);
	assertEquals(counts.get(4) ?? 0, 0);
});

Deno.test(async function checkPart2() {
	assertEquals(18650129, await day1.part2());
});
