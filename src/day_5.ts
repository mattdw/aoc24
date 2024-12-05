const TEST_INPUT = `
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
`.trim();

export function parseInput(s: string): {deps: Map<number, number[]>, updates: number[][]} {

	const [depsSection, updatesSection] = s.split("\n\n");

	const deps = depsSection.matchAll(/^(\d+)\|(\d+)$/gm).map(m => [
		Number.parseInt(m[1]),
		Number.parseInt(m[2])
	]);

	const depsMap = new Map<number, number[]>();

	deps.forEach(([x, y]) => {
		const curr = depsMap.get(y) ?? [];
		curr.push(x);
		depsMap.set(y, curr);
	});

	// console.log([...deps]);
	return {
		deps: depsMap,
		updates: []
	};

}


export default {
	async part1() {
		console.log(parseInput(TEST_INPUT));
		return 0;
	},

	async part2() {
		return 0;
	}
}
