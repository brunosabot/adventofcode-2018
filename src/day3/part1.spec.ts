import * as part1 from "./part1";

describe("Test day 3 part 1", () => {
  it("Should handle a successful test", () => {
    expect(part1.main("#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2")).resolves.toBe("4");
  });
});
