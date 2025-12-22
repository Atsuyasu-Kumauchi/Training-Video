export type PickFormData<T, K extends readonly (keyof T)[]> = Pick<T, K[number]>;

export function pickFormData<T, K extends readonly (keyof T)[]>( obj: T,  keys: K ): PickFormData<T, K> {
    return Object.fromEntries(
      keys.map((key) => [key, obj[key]])
    ) as PickFormData<T, K>;
  }