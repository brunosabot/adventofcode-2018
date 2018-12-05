import * as part2 from "./part2";

describe("Test day 5 part 2", () => {
  it("Should handle a successful test", () => {
    expect(part2.main("dabAcCaCBAcCcaDA")).resolves.toBe("library-5");
  });
});
