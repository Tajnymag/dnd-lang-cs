export function sortedFind<T extends unknown>(list: T[], item: T, compare: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0): T | undefined {
	let start = 0;
	let end = list.length - 1;

	while (start <= end) {
		const mid = Math.floor((start + end) / 2);

		const rel = compare(list[mid], item);

		if (rel === 0) return list[mid];
		else if (rel < 0) {
			start = mid + 1;
		} else if (rel > 0) {
			end = mid - 1;
		}
	}

	return undefined;
}
