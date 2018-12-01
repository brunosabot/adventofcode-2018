import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string): Promise<string> => {
  const result: number = lib
    .splitValues(input)
    .map(lib.valueToInt)
    .reduce(lib.sumReduce, 0);

  return lib.formatResult(result);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/1-1.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 1 part 1")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
