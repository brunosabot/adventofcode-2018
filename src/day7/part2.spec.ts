import * as part2 from "./part2";

describe("Test day 7 part 2", () => {
  it("Should handle a successful test", () => {
    expect(
      part2.main(
        "Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin.",
        0,
        2
      )
    ).resolves.toBe("15");
  });
});
