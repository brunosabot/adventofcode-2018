import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string): Promise<string> => {
  let minCount = Infinity;

  lib.LETTERS.split("").forEach(letter => {
    minCount = Math.min(minCount, lib.reduceLetter(input, letter).length);
  });

  return lib.formatResult(minCount);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/5-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 5 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
