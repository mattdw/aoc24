export async function getInput(day: number): Promise<string> {
	const fname = `inputs/day_${day}.txt`;
	try {
		return await Deno.readTextFile(fname);
	} catch (e) {
		if (e instanceof Deno.errors.NotFound) {
			const resp = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
				headers: {Cookie: `session=${Deno.env.get('SESSION')}`}
			});
			const result = await resp.text();
			await Deno.writeTextFile(fname, result);
			return result;
		}
	}

	throw new Error("failed to get input");
}
