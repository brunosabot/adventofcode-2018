import * as fs from "fs";
import * as part1 from "./part1";
import * as lib from "./lib";

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/7-1.txt`);
const input = inputBuffer.toString();

describe("Test day 7 part 1", () => {
  it("Should handle a successful test", () => {
    expect(
      part1.main(
        "Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin."
      )
    ).resolves.toBe("CABDFE");
  });
});
