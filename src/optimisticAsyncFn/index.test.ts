import { describe, it } from "vitest";
import { useOptimisticAsyncFn } from "./index";
import { nextTick } from "vue";

describe("useOptimisticAsyncFn", () => {
  describe.concurrent("equals initial value", async () => {
    it("number", async ({ expect }) => {
      const { optimisticValue, value } = useOptimisticAsyncFn(1, () => {});

      expect(value.value).toBe(1);
      expect(optimisticValue.value).toBe(1);
    });
    it("string", async ({ expect }) => {
      const { optimisticValue, value } = useOptimisticAsyncFn(
        "Hello world!",
        () => {}
      );

      expect(value.value).toBe("Hello world!");
      expect(optimisticValue.value).toBe("Hello world!");
    });
    it("boolean", async ({ expect }) => {
      const { optimisticValue, value } = useOptimisticAsyncFn(true, () => {});

      expect(value.value).toBeTruthy();
      expect(optimisticValue.value).toBeTruthy();
    });
    it("Symbol", async ({ expect }) => {
      const startValue: Symbol = Symbol("Start");
      const { optimisticValue, value } = useOptimisticAsyncFn(
        startValue,
        () => {}
      );

      expect(value.value).toBe(startValue);
      expect(optimisticValue.value).toBe(startValue);
    });
    it("Object", async ({ expect }) => {
      const startValue = { a: 1, b: "h" };
      const { optimisticValue, value } = useOptimisticAsyncFn(
        startValue,
        () => {}
      );

      expect(value.value).toMatchObject(startValue);
      expect(optimisticValue.value).toMatchObject(startValue);
    });
    it("Array", async ({ expect }) => {
      const startValue = [1, 2, 3];
      const { optimisticValue, value } = useOptimisticAsyncFn(
        startValue,
        () => {}
      );

      expect(value.value).toEqual(startValue);
      expect(optimisticValue.value).toEqual(startValue);
    });
  });

  describe.concurrent("does not change original until resolve", async () => {
    it("number", async ({ expect }) => {
      const { optimisticValue, value } = useOptimisticAsyncFn(
        1,
        (value, resolve) => {
          setTimeout(() => resolve(value), 100);
        }
      );

      optimisticValue.value = 4;
      await nextTick();

      expect(value.value).toBe(1);
      expect(optimisticValue.value).toBe(4);

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );

      expect(value.value).toBe(4);
      expect(optimisticValue.value).toBe(4);
    });
    it("string", async ({ expect }) => {
      const { optimisticValue, value } = useOptimisticAsyncFn(
        "Hello world!",
        (value, resolve) => {
          setTimeout(() => resolve(value), 100);
        }
      );

      optimisticValue.value = "Goodbye world!";
      await nextTick();

      expect(value.value).toBe("Hello world!");
      expect(optimisticValue.value).toBe("Goodbye world!");

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );

      expect(value.value).toBe("Goodbye world!");
      expect(optimisticValue.value).toBe("Goodbye world!");
    });
    it("boolean", async ({ expect }) => {
      const { optimisticValue, value } = useOptimisticAsyncFn(
        true,
        (value, resolve) => {
          setTimeout(() => resolve(value), 100);
        }
      );

      optimisticValue.value = false;
      await nextTick();

      expect(value.value).toBeTruthy();
      expect(optimisticValue.value).toBeFalsy();

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );

      expect(value.value).toBeFalsy();
      expect(optimisticValue.value).toBeFalsy();
    });
    it("Symbol", async ({ expect }) => {
      const startValue: Symbol = Symbol("Start");
      const changedValue: Symbol = Symbol("Changed");
      const { optimisticValue, value } = useOptimisticAsyncFn(
        startValue,
        (value, resolve) => {
          setTimeout(() => resolve(value), 100);
        }
      );

      optimisticValue.value = changedValue;
      await nextTick();

      expect(value.value).toBe(startValue);
      expect(optimisticValue.value).toBe(changedValue);

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );

      expect(value.value).toBe(changedValue);
      expect(optimisticValue.value).toBe(changedValue);
    });
    it("Object", async ({ expect }) => {
      const startValue = { a: 1, b: "h" };
      const changedValue = { a: 2, b: "i" };
      const { optimisticValue, value } = useOptimisticAsyncFn(
        startValue,
        (value, resolve) => {
          setTimeout(() => resolve(value), 100);
        }
      );

      optimisticValue.value = changedValue;
      await nextTick();

      expect(value.value).toMatchObject(startValue);
      expect(optimisticValue.value).toMatchObject(changedValue);

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );

      expect(value.value).toMatchObject(changedValue);
      expect(optimisticValue.value).toMatchObject(changedValue);
    });
    it("Array", async ({ expect }) => {
      const startValue = [1, 2, 3];
      const changedValue = [4, 5];
      const { optimisticValue, value } = useOptimisticAsyncFn(
        startValue,
        (value, resolve) => {
          setTimeout(() => resolve(value), 100);
        }
      );

      optimisticValue.value = changedValue;
      await nextTick();

      expect(value.value).toEqual(startValue);
      expect(optimisticValue.value).toEqual(changedValue);

      await new Promise<void>((resolve) =>
        setTimeout(() => {
          resolve();
        }, 200)
      );

      expect(value.value).toEqual(changedValue);
      expect(optimisticValue.value).toEqual(changedValue);
    });
  });

  describe.concurrent(
    "equals original after update function rejects",
    async () => {
      it("number", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          1,
          (_, __, reject) => {
            setTimeout(() => reject(), 100);
          }
        );

        optimisticValue.value = 4;
        await nextTick();

        expect(value.value).toBe(1);
        expect(optimisticValue.value).toBe(4);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe(1);
        expect(optimisticValue.value).toBe(1);
      });
      it("string", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          "Hello world!",
          (_, __, reject) => {
            setTimeout(() => reject(), 100);
          }
        );

        optimisticValue.value = "Goodbye world!";
        await nextTick();

        expect(value.value).toBe("Hello world!");
        expect(optimisticValue.value).toBe("Goodbye world!");

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe("Hello world!");
        expect(optimisticValue.value).toBe("Hello world!");
      });
      it("boolean", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          true,
          (_, __, reject) => {
            setTimeout(() => reject(), 100);
          }
        );

        optimisticValue.value = false;
        await nextTick();

        expect(value.value).toBeTruthy();
        expect(optimisticValue.value).toBeFalsy();

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBeTruthy();
        expect(optimisticValue.value).toBeTruthy();
      });
      it("Symbol", async ({ expect }) => {
        const startValue: Symbol = Symbol("Start");
        const changedValue: Symbol = Symbol("Changed");
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (_, __, reject) => {
            setTimeout(() => reject(value), 100);
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toBe(startValue);
        expect(optimisticValue.value).toBe(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe(startValue);
        expect(optimisticValue.value).toBe(startValue);
      });
      it("Object", async ({ expect }) => {
        const startValue = { a: 1, b: "h" };
        const changedValue = { a: 2, b: "i" };
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (_, __, reject) => {
            setTimeout(() => reject(), 100);
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toMatchObject(startValue);
        expect(optimisticValue.value).toMatchObject(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toMatchObject(startValue);
        expect(optimisticValue.value).toMatchObject(startValue);
      });
      it("Array", async ({ expect }) => {
        const startValue = [1, 2, 3];
        const changedValue = [4, 5];
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (_, __, reject) => {
            setTimeout(() => reject(), 100);
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toEqual(startValue);
        expect(optimisticValue.value).toEqual(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toEqual(startValue);
        expect(optimisticValue.value).toEqual(startValue);
      });
    }
  );

  describe.concurrent(
    "equals original after original change (with cancel, before update function finishes)",
    async () => {
      it("number", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          1,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = 4;
        await nextTick();

        expect(value.value).toBe(1);
        expect(optimisticValue.value).toBe(4);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = 2;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe(2);
        expect(optimisticValue.value).toBe(2);
      });
      it("string", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          "Hello world!",
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = "Goodbye world!";
        await nextTick();

        expect(value.value).toBe("Hello world!");
        expect(optimisticValue.value).toBe("Goodbye world!");

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = "Hello from somewhere!";

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe("Hello from somewhere!");
        expect(optimisticValue.value).toBe("Hello from somewhere!");
      });
      it("boolean", async ({ expect }) => {
        const { optimisticValue, value, cancel } = useOptimisticAsyncFn(
          true,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          },
          { exposeCancel: true }
        );

        optimisticValue.value = false;
        await nextTick();

        expect(value.value).toBeTruthy();
        expect(optimisticValue.value).toBeFalsy();

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = true;
        cancel?.();
        await nextTick();

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBeTruthy();
        expect(optimisticValue.value).toBeTruthy();
      });
      it("Symbol", async ({ expect }) => {
        const startValue: Symbol = Symbol("Start");
        const changedValue: Symbol = Symbol("Changed");
        const changed2Value: Symbol = Symbol("Changed2");
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toBe(startValue);
        expect(optimisticValue.value).toBe(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = changed2Value;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe(changed2Value);
        expect(optimisticValue.value).toBe(changed2Value);
      });
      it("Object", async ({ expect }) => {
        const startValue = { a: 1, b: "h" };
        const changedValue = { a: 2, b: "i" };
        const changed2Value = { a: 3, b: "j" };
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toMatchObject(startValue);
        expect(optimisticValue.value).toMatchObject(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = changed2Value;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toMatchObject(changed2Value);
        expect(optimisticValue.value).toMatchObject(changed2Value);
      });
      it("Array", async ({ expect }) => {
        const startValue = [1, 2, 3];
        const changedValue = [4, 5];
        const changed2Value = [1, 3, 8];
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toEqual(startValue);
        expect(optimisticValue.value).toEqual(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = changed2Value;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toEqual(changed2Value);
        expect(optimisticValue.value).toEqual(changed2Value);
      });
    }
  );

  describe.concurrent(
    "equals original after original change (with cancel, after update function finishes)",
    async () => {
      it("number", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          1,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 100);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = 4;
        await nextTick();

        expect(value.value).toBe(1);
        expect(optimisticValue.value).toBe(4);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        value.value = 2;
        await nextTick();

        expect(value.value).toBe(2);
        expect(optimisticValue.value).toBe(2);
      });
      it("string", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          "Hello world!",
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 100);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = "Goodbye world!";
        await nextTick();

        expect(value.value).toBe("Hello world!");
        expect(optimisticValue.value).toBe("Goodbye world!");

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        value.value = "Hello from somewhere!";
        await nextTick();

        expect(value.value).toBe("Hello from somewhere!");
        expect(optimisticValue.value).toBe("Hello from somewhere!");
      });
      it("boolean", async ({ expect }) => {
        const { optimisticValue, value } = useOptimisticAsyncFn(
          true,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 100);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = false;
        await nextTick();

        expect(value.value).toBeTruthy();
        expect(optimisticValue.value).toBeFalsy();

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        value.value = true;
        await nextTick();

        expect(value.value).toBeTruthy();
        expect(optimisticValue.value).toBeTruthy();
      });
      it("Symbol", async ({ expect }) => {
        const startValue: Symbol = Symbol("Start");
        const changedValue: Symbol = Symbol("Changed");
        const changed2Value: Symbol = Symbol("Changed2");
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toBe(startValue);
        expect(optimisticValue.value).toBe(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = changed2Value;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toBe(changed2Value);
        expect(optimisticValue.value).toBe(changed2Value);
      });
      it("Object", async ({ expect }) => {
        const startValue = { a: 1, b: "h" };
        const changedValue = { a: 2, b: "i" };
        const changed2Value = { a: 3, b: "j" };
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toMatchObject(startValue);
        expect(optimisticValue.value).toMatchObject(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = changed2Value;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toMatchObject(changed2Value);
        expect(optimisticValue.value).toMatchObject(changed2Value);
      });
      it("Array", async ({ expect }) => {
        const startValue = [1, 2, 3];
        const changedValue = [4, 5];
        const changed2Value = [1, 3, 8];
        const { optimisticValue, value } = useOptimisticAsyncFn(
          startValue,
          (value, resolve) => {
            const id = setTimeout(() => resolve(value), 200);
            return {
              cancel: () => {
                clearTimeout(id);
              },
            };
          }
        );

        optimisticValue.value = changedValue;
        await nextTick();

        expect(value.value).toEqual(startValue);
        expect(optimisticValue.value).toEqual(changedValue);

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 50)
        );

        value.value = changed2Value;

        await new Promise<void>((resolve) =>
          setTimeout(() => {
            resolve();
          }, 200)
        );

        expect(value.value).toEqual(changed2Value);
        expect(optimisticValue.value).toEqual(changed2Value);
      });
    }
  );
});
