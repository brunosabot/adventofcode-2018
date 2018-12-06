import * as part2 from "./part2";

describe("Test day 6 part 2", () => {
  it("Should handle a successful test", () => {
    expect(part2.main("1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9", 32)).resolves.toBe("16");
  });
});
