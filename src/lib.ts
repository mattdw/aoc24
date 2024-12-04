export interface Sliceable<T> extends Iterable<T> {
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
