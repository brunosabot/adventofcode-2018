import * as lib from "./lib";

describe("Test day 3 library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-3");
  });

  it("Should split values base on new lines", () => {
    expect(lib.splitValues("1")).toEqual(["1"]);
    expect(lib.splitValues("1\n1")).toEqual(["1", "1"]);
  });

  it("Should parse correctly", () => {
    expect(lib.parseValue("#1 @ 1,3: 4x4")).toEqual({ i: 1, width: 4, height: 4, left: 1, top: 3 });
    expect(lib.parseValue("#2 @ 3,1: 4x4")).toEqual({ i: 2, width: 4, height: 4, left: 3, top: 1 });
    expect(lib.parseValue("#3 @ 5,5: 2x2")).toEqual({ i: 3, width: 2, height: 2, left: 5, top: 5 });
  });

  it("Should reduce correctyl height", () => {
    expect([].reduce(lib.getMaxHeightReducer, 0)).toBe(0);
    expect(
      [
        { i: 1, width: 4, height: 4, left: 1, top: 3 },
        { i: 2, width: 4, height: 4, left: 3, top: 1 }
      ].reduce(lib.getMaxHeightReducer, 0)
    ).toBe(7);
  });

  it("Should reduce correctyl width", () => {
    expect([].reduce(lib.getMaxWidthReducer, 0)).toBe(0);
    expect(
      [
        { i: 1, width: 4, height: 4, left: 1, top: 3 },
        { i: 2, width: 4, height: 4, left: 3, top: 1 }
      ].reduce(lib.getMaxWidthReducer, 0)
    ).toBe(7);
  });

  it("Should convert an int to a string", () => {
    expect(lib.formatResult(1)).toBe("1");
    expect(lib.formatResult(-1)).toBe("-1");
    expect(lib.formatResult(0)).toBe("0");
  });
});
