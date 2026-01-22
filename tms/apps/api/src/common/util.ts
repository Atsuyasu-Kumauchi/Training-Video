export function reduceCollection<T, K, V>(
    items: T[],
    keyFn: (t: T) => K, 
    valueFn: (t: T) => V, 
    mergeFn: (existing: V, incoming: V) => V
): Map<K, V> {
  return items.reduce((map, item) => {
    const key = keyFn(item);
    const value = valueFn(item);

    map.set(key, map.has(key) ? mergeFn(map.get(key) as V, value) : value);

    return map;
  }, new Map<K, V>());
}
