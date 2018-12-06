import * as part1 from "./part1";

describe("Test day 6 part 1", () => {
  it("Should handle a successful test", () => {
    expect(part1.main("1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9")).resolves.toBe("17");
  });
});
