import * as part2 from "./part2";

describe("Test day 2 part 2", () => {
  it("Should handle a successful test", () => {
    expect(part2.main("abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz")).resolves.toBe("fgij");
  });
});
