import { type MaybeRefOrGetter, toValue, Ref, watch, ref } from "vue";

export type UseOptimisticValueOptions<T> = {
  /**
   * Compare function used to determine if the optimistic value is different from the original value
   * @param a Optimistic value
   * @param b Original value
   * @returns true if a and b are equals, otherwise false
   * @default ```ts
   * (a: T, b: T) =>
typeof a === "object" ||
typeof b === "object" ||
Array.isArray(a) ||
Array.isArray(b) ? false : a === b
```
   */
  equals?: (a: T, b: T) => boolean;
  /**
   * Vue watch deep options
   * @see https://vuejs.org/guide/essentials/watchers.html#deep-watchers
   */
  deep?: boolean;
};

/**
 * Creates an optimistic ref.
 * Changing this value will not update the original value but when the original value changes, the optimistic value will reflect the change
 * @param value Original value
 * @param opts useOptimisticValue options
 * @returns WritableRef containing the optimistic value
 * @since 1.0.0
 * @example TODO : Write example
 */
export function useOptimisticValue<T>(
  value: MaybeRefOrGetter<T>,
  opts?: UseOptimisticValueOptions<T>
): Ref<T> {
  const isEqual =
    opts?.equals ??
    ((a: T, b: T) =>
      typeof a === "object" ||
      typeof b === "object" ||
      Array.isArray(a) ||
      Array.isArray(b)
        ? false
        : a === b);

  const optimisticValue = ref(toValue(value)) as Ref<T>;

  watch(
    () => toValue(value),
    () => {
      const newValue = toValue(value);
      if (!isEqual(optimisticValue.value, newValue)) {
        optimisticValue.value = newValue;
      }
    },
    { deep: opts?.deep }
  );

  return optimisticValue;
}
