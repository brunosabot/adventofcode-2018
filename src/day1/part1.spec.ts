import * as part1 from "./part1";

describe("Test day 1 part 1", () => {
  it("Should handle a successful test", () => {
    expect(part1.main("+1\n+1\n+1")).resolves.toBe("3");
    expect(part1.main("+1\n+1\n-2")).resolves.toBe("0");
    expect(part1.main("-1\n-2\n-3")).resolves.toBe("-6");
  });
});
