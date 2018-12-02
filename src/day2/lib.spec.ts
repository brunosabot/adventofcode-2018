import * as lib from "./lib";

describe("Test day 2 library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-2");
  });

  it("Should split values base on new lines", () => {
    expect(lib.splitValues("1")).toEqual(["1"]);
    expect(lib.splitValues("1\n1")).toEqual(["1", "1"]);
  });

  it("Should count letter occurences in a word", () => {
    expect(lib.countLetters("aabcd")).toEqual({ a: 2, b: 1, c: 1, d: 1 });
  });

  it("Should convert a string/number map to an object", () => {
    const map = new Map();
    map.set("a", 2);
    map.set("b", 1);
    map.set("c", 1);
    map.set("d", 1);

    expect(lib.mapToObject(map)).toEqual({ a: 2, b: 1, c: 1, d: 1 });
  });

  it("Should get letters with a specified occurence", () => {
    expect(lib.getLetterWithCount({ a: 2, b: 1, c: 1, d: 1 }, 2)).toEqual(["a"]);
  });

  it("Should convert an int to a string", () => {
    expect(lib.formatResult(1)).toBe("1");
    expect(lib.formatResult(-1)).toBe("-1");
    expect(lib.formatResult(0)).toBe("0");
  });

  it("Should remove the letter in diffence", () => {
    expect(lib.removeDifferences("fghij", "fguij")).toBe("fgij");
  });
});
