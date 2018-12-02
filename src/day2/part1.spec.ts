import * as fs from "fs";
import * as part1 from "./part1";

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/2-1.txt`);
const input = inputBuffer.toString();

describe("Test day 2 part 1", () => {
  it("Should handle a successful test", () => {
    expect(part1.main("abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab")).resolves.toBe(
      "12"
    );
    expect(part1.main(input)).resolves.toBe("5478");
  });
});
