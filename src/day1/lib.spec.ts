import * as lib from "./lib";

describe("Test day 1 library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-1");
  });

  it("Should split values base on new lines", () => {
    expect(lib.splitValues("1")).toEqual(["1"]);
    expect(lib.splitValues("1\n1")).toEqual(["1", "1"]);
  });

  it("Should convert a string value to an int", () => {
    expect(lib.valueToInt("1")).toBe(1);
    expect(lib.valueToInt("-1")).toBe(-1);
    expect(lib.valueToInt("0")).toBe(0);
  });

  it("Should reduce values in a sum", () => {
    expect([].reduce(lib.sumReduce, 0)).toBe(0);
    expect([1, 1].reduce(lib.sumReduce, 0)).toBe(2);
    expect([-1, 1].reduce(lib.sumReduce, 0)).toBe(0);
  });

  it("Should convert an int to a string", () => {
    expect(lib.formatResult(1)).toBe("1");
    expect(lib.formatResult(-1)).toBe("-1");
    expect(lib.formatResult(0)).toBe("0");
  });
});
