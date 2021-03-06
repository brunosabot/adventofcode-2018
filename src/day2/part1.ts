import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string): Promise<string> => {
  const lines: string[] = lib.splitValues(input);

  let totalAtTwo = 0;
  let totalAtThree = 0;

  lines.forEach(line => {
    const letterCounts = lib.countLetters(line);
    if (lib.getLetterWithCount(letterCounts, 2).length > 0) {
      totalAtTwo += 1;
    }
    if (lib.getLetterWithCount(letterCounts, 3).length > 0) {
      totalAtThree += 1;
    }
  });

  return lib.formatResult(totalAtTwo * totalAtThree);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/2-1.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 2 part 1")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
