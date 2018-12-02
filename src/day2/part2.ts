import * as fs from "fs";
import * as lib from "./lib";

interface StringDiffCounter {
  [s: string]: number;
}

export const main = async (input: string): Promise<string> => {
  const lines: string[] = lib.splitValues(input);

  const lineWithDiffenrences = lines.reduce(
    (acc: StringDiffCounter, lineLeft: string) => {
      lines.forEach((lineRight: string) => {
        const result = lib.getDifferences(lineLeft, lineRight);
        if (result.length === 1) {
          acc[lineLeft] = (acc[lineLeft] || 0) + 1;
        }
      });
      return acc;
    },
    {} as StringDiffCounter
  );

  return lib.removeDifferences(
    Object.keys(lineWithDiffenrences)[0],
    Object.keys(lineWithDiffenrences)[1]
  );
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/2-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 2 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
