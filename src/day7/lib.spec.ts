import * as lib from "./lib";

describe("Test day 7 library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-7");
  });

  it("Should get a children dependency graph", () => {
    expect(lib.getChildrenGraph([{ for: "A", need: "C" }, { for: "F", need: "C" }])).toEqual(
      new Map([["A", []], ["C", ["A", "F"]], ["F", []]])
    );
    expect(lib.getChildrenGraph([{ for: "F", need: "C" }, { for: "A", need: "C" }])).toEqual(
      new Map([["A", []], ["C", ["A", "F"]], ["F", []]])
    );
  });

  it("Should get a parent dependency graph", () => {
    expect(lib.getParentGraph([{ for: "A", need: "C" }, { for: "F", need: "C" }])).toEqual(
      new Map([["A", ["C"]], ["C", []], ["F", ["C"]]])
    );
    expect(lib.getParentGraph([{ for: "F", need: "C" }, { for: "A", need: "C" }])).toEqual(
      new Map([["A", ["C"]], ["C", []], ["F", ["C"]]])
    );
  });

  it("Should get the first value to resolve", () => {
    const graph = new Map([["A", ["C"]], ["C", []], ["F", ["C"]]]);
    expect(lib.findFirstsResolving([{ for: "A", need: "C" }, { for: "F", need: "C" }])).toEqual([
      "C"
    ]);
  });
});
