import * as part2 from "./part2";

describe("Test day 1 part 2", () => {
  it("Should handle a successful test", () => {
    expect(part2.main("+1, -1")).resolves.toBe("0");
    expect(part2.main("+3, +3, +4, -2, -4")).resolves.toBe("10");
    expect(part2.main("-6, +3, +8, +5, -6")).resolves.toBe("5");
    expect(part2.main("+7, +7, -2, -7, -4")).resolves.toBe("14");
  });
});
