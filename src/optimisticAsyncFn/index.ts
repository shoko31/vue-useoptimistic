import { computed, ref, Ref, watch } from "vue";
import {
  useOptimisticValue,
  type UseOptimisticValueOptions,
} from "../optimisticValue";

export type UseOptimisticAsyncFnOptions<T> = {
  /**
   * Should the optimistic value change back to the original value when the update function rejects (fails) ?
   * @default true
   */
  rollbackOnReject?: boolean;
  /**
   * Should the update function be cancelled when the original value is changed ?
   * @default true
   */
  cancelOnValueChange?: boolean;
  /**
   * If true, exposes a manual cancel function the user can call to cancel the optimistic change
   */
  exposeCancel?: boolean;
  /**
   * Should the optimistic value change back to the original value when the calce function is manually called ?
   * @default true
   */
  rollbackOnManualCancel?: boolean;
} & UseOptimisticValueOptions<T>;

/**
 * Function that can be interupted if necessary.
 * If the function is cancelled but does not return a cancel method, it will continue running but the result will be ignored
 */
export type CancelableUpdateFunction<T> = (
  optimisticValue: T,
  resolve: (value: T) => void,
  reject: (reason?: any) => void,
  isCancelled: () => boolean
) => {
  cancel?: () => void;
} | void;

/**
 * Optimistic value with asynchronous/cancelable update function
 * @param initialValue Initial value
 * @param updateFn Update function runned everytime the optimistic value is updated
 * @param opts options
 */
export function useOptimisticAsyncFn<T>(
  initialValue: T,
  updateFn: CancelableUpdateFunction<T>,
  opts?: UseOptimisticAsyncFnOptions<T>
) {
  const value = ref<T>(initialValue) as Ref<T>;

  let previous: undefined | ReturnType<CancelableUpdateFunction<T>> = undefined;
  let runId: undefined | number = undefined;

  const optimisticValue = useOptimisticValue(value, opts);
  const awaitedOptimisticValue = computed({
    get(): T {
      return optimisticValue.value;
    },
    set(val: T) {
      optimisticValue.value = val;

      if (previous !== undefined && previous?.cancel !== undefined) {
        previous.cancel();
        previous = undefined;
        runId = undefined;
      }

      const id = Math.random() * Date.now();
      runId = id;
      previous = updateFn(
        val,
        (newValue) => {
          // Update to new value only for last set call
          if (runId !== undefined && runId === id) {
            previous = undefined;
            runId = undefined;
            value.value = newValue;
          }
        },
        () => {
          if (runId !== undefined && runId === id) {
            previous = undefined;
            runId = undefined;
            if ((opts?.rollbackOnReject ?? true) === true) {
              // Revert to previous value on update fails
              optimisticValue.value = value.value;
            }
          }
        },
        () => runId === undefined || runId !== id
      );
    },
  });

  function cancel() {
    if (previous !== undefined && previous?.cancel !== undefined) {
      previous.cancel();
      previous = undefined;
    }
    runId = undefined;
  }

  watch(
    value,
    () => {
      if (opts?.cancelOnValueChange !== false) {
        cancel();
      }
    },
    { deep: opts?.deep }
  );

  if (opts?.exposeCancel === true) {
    return {
      value,
      optimisticValue: awaitedOptimisticValue,
      cancel: () => {
        cancel();
        if (opts.rollbackOnManualCancel !== false) {
          optimisticValue.value = value.value;
        }
      },
    };
  }
  return { value, optimisticValue: awaitedOptimisticValue };
}
