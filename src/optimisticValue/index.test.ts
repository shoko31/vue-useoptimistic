import { describe, expect, test } from "vitest";
import { useOptimisticValue } from "./index";
import { nextTick, ref } from "vue";

describe("useOptimisticValue", () => {
  describe("equals original", () => {
    test("number", async () => {
      const originalRef = ref(1);
      const optimisticRef = useOptimisticValue(originalRef);

      expect(originalRef.value).toBe(1);
      expect(optimisticRef.value).toBe(1);
    });
    test("string", async () => {
      const originalRef = ref("Hello world!");
      const optimisticRef = useOptimisticValue(originalRef);

      expect(originalRef.value).toBe("Hello world!");
      expect(optimisticRef.value).toBe("Hello world!");
    });
    test("boolean", async () => {
      const originalRef = ref(true);
      const optimisticRef = useOptimisticValue(originalRef);

      expect(originalRef.value).toBeTruthy();
      expect(optimisticRef.value).toBeTruthy();
    });
    test("Symbol", async () => {
      const startValue: Symbol = Symbol("Start");
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      expect(originalRef.value).toBe(startValue);
      expect(optimisticRef.value).toBe(startValue);
    });
    test("Object", async () => {
      const startValue = { a: 1, b: "h" };
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      expect(originalRef.value).toMatchObject(startValue);
      expect(optimisticRef.value).toMatchObject(startValue);
    });
    test("Array", async () => {
      const startValue = [1, 2, 3];
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      expect(originalRef.value).toEqual(startValue);
      expect(optimisticRef.value).toEqual(startValue);
    });
  });

  describe("does not change original", () => {
    test("number", async () => {
      const originalRef = ref(1);
      const optimisticRef = useOptimisticValue(originalRef);

      optimisticRef.value = 4;
      await nextTick();

      expect(originalRef.value).toBe(1);
      expect(optimisticRef.value).toBe(4);
    });
    test("string", async () => {
      const originalRef = ref("Hello world!");
      const optimisticRef = useOptimisticValue(originalRef);

      optimisticRef.value = "Goodbye world!";
      await nextTick();

      expect(originalRef.value).toBe("Hello world!");
      expect(optimisticRef.value).toBe("Goodbye world!");
    });
    test("boolean", async () => {
      const originalRef = ref(true);
      const optimisticRef = useOptimisticValue(originalRef);

      optimisticRef.value = false;
      await nextTick();

      expect(originalRef.value).toBeTruthy();
      expect(optimisticRef.value).toBeFalsy();
    });
    test("Symbol", async () => {
      const startValue: Symbol = Symbol("Start");
      const optimisticValue: Symbol = Symbol("Optimistic");
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      optimisticRef.value = optimisticValue;
      await nextTick();

      expect(originalRef.value).toBe(startValue);
      expect(optimisticRef.value).toBe(optimisticValue);
    });
    test("Object", async () => {
      const startValue = { a: 1, b: "h" };
      const optimisticValue = { a: 2, b: "i" };
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      optimisticRef.value = optimisticValue;
      await nextTick();

      expect(originalRef.value).toMatchObject(startValue);
      expect(optimisticRef.value).toMatchObject(optimisticValue);
    });
    test("Array", async () => {
      const startValue = [1, 2, 3];
      const optimisticValue = [4, 5];
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      optimisticRef.value = optimisticValue;
      await nextTick();

      expect(originalRef.value).toEqual(startValue);
      expect(optimisticRef.value).toEqual(optimisticValue);
    });
  });

  describe("equals original after original change", () => {
    test("number", async () => {
      const originalRef = ref(1);
      const optimisticRef = useOptimisticValue(originalRef);

      originalRef.value = 10;
      await nextTick();

      expect(originalRef.value).toBe(10);
      expect(optimisticRef.value).toBe(10);
    });
    test("string", async () => {
      const originalRef = ref("Hello world!");
      const optimisticRef = useOptimisticValue(originalRef);

      originalRef.value = "Hello world!!";
      await nextTick();

      expect(originalRef.value).toBe("Hello world!!");
      expect(optimisticRef.value).toBe("Hello world!!");
    });
    test("boolean", async () => {
      const originalRef = ref(true);
      const optimisticRef = useOptimisticValue(originalRef);

      originalRef.value = false;
      await nextTick();

      expect(originalRef.value).toBeFalsy();
      expect(optimisticRef.value).toBeFalsy();
    });
    test("Symbol", async () => {
      const startValue: Symbol = Symbol("Start");
      const endValue: Symbol = Symbol("End");
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      originalRef.value = endValue;
      await nextTick();

      expect(originalRef.value).toBe(endValue);
      expect(optimisticRef.value).toBe(endValue);
    });
    test("Object", async () => {
      const startValue = { a: 1, b: "h" };
      const endValue = { a: 3, b: "j" };
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      originalRef.value = endValue;
      await nextTick();

      expect(originalRef.value).toMatchObject(endValue);
      expect(optimisticRef.value).toMatchObject(endValue);
    });
    test("Array", async () => {
      const startValue = [1, 2, 3];
      const endValue = [6, 7, 8];
      const originalRef = ref(startValue);
      const optimisticRef = useOptimisticValue(originalRef);

      originalRef.value = endValue;
      await nextTick();

      expect(originalRef.value).toEqual(endValue);
      expect(optimisticRef.value).toEqual(endValue);
    });
  });
});
