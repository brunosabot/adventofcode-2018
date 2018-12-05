import * as part1 from "./part1";

describe("Test day 5 part 1", () => {
  it("Should handle a successful test", () => {
    expect(part1.main("dabAcCaCBAcCcaDA")).resolves.toBe("dabCBAcaDA");
  });
});
