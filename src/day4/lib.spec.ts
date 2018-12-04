import * as lib from "./lib";

describe("Test day 4 library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-4");
  });

  it("Should split values base on new lines", () => {
    expect(lib.splitValues("1")).toEqual(["1"]);
    expect(lib.splitValues("1\n1")).toEqual(["1", "1"]);
  });

  it("Should parse Date correctly", () => {
    expect(lib.formatEntry("[1518-11-01 00:00] Guard #10 begins shift")).toEqual({
      date: new Date(1518, 10, 1, 0, 0, 0, 0),
      action: "Guard #10 begins shift"
    });
    expect(lib.formatEntry("[1518-11-01 00:05] falls asleep")).toEqual({
      date: new Date(1518, 10, 1, 0, 5, 0, 0),
      action: "falls asleep"
    });
    expect(lib.formatEntry("[1518-11-01 00:25] wakes up")).toEqual({
      date: new Date(1518, 10, 1, 0, 25, 0, 0),
      action: "wakes up"
    });
  });

  it("Should return a right value for the sort method", () => {
    const value1: lib.ParsedValue = { date: new Date(2018, 12, 4, 10, 0, 0, 0), action: "" };
    const value2: lib.ParsedValue = { date: new Date(2018, 12, 4, 11, 0, 0, 0), action: "" };

    expect(lib.sortByDate(value1, value2)).toBe(-1);
    expect(lib.sortByDate(value2, value1)).toBe(1);
  });

  it("Should convert an int to a string", () => {
    expect(lib.formatResult(1)).toBe("1");
    expect(lib.formatResult(-1)).toBe("-1");
    expect(lib.formatResult(0)).toBe("0");
  });
});
