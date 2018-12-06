import * as lib from "./lib";

describe("Test day 6 library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-6");
  });

  it("Should split values base on new lines", () => {
    expect(lib.splitValues("1")).toEqual(["1"]);
    expect(lib.splitValues("1\n1")).toEqual(["1", "1"]);
  });

  it("Should convert value to property", () => {
    expect(lib.valueToCoordinate("1, 1")).toEqual({ x: 1, y: 1 });
    expect(lib.valueToCoordinate("1, 6")).toEqual({ x: 1, y: 6 });
    expect(lib.valueToCoordinate("8, 3")).toEqual({ x: 8, y: 3 });
    expect(lib.valueToCoordinate("3, 4")).toEqual({ x: 3, y: 4 });
    expect(lib.valueToCoordinate("5, 5")).toEqual({ x: 5, y: 5 });
    expect(lib.valueToCoordinate("8, 9")).toEqual({ x: 8, y: 9 });
  });

  it("Should get Manhattan distance between two points", () => {
    expect(lib.getManhattanDistance({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(0);
    expect(lib.getManhattanDistance({ x: 0, y: 0 }, { x: 0, y: 2 })).toBe(2);
    expect(lib.getManhattanDistance({ x: 0, y: 0 }, { x: 2, y: 2 })).toBe(4);
  });

  it("Should get maxium x from coordinates", () => {
    expect(lib.getMaxX([{ x: 0, y: 0 }])).toBe(1);
    expect(lib.getMaxX([{ x: 0, y: 0 }, { x: 2, y: 2 }])).toBe(3); // Or not to be, on s'est promis...
  });

  it("Should get maxium x from coordinates", () => {
    expect(lib.getMaxY([{ x: 0, y: 0 }])).toBe(1);
    expect(lib.getMaxY([{ x: 0, y: 0 }, { x: 2, y: 2 }])).toBe(3); // Or not to be, on s'est promis...
  });

  it("Should convert an int to a string", () => {
    expect(lib.formatResult(1)).toBe("1");
    expect(lib.formatResult(-1)).toBe("-1");
    expect(lib.formatResult(0)).toBe("0");
  });
});
