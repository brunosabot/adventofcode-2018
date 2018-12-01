import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string): Promise<string> => {
  const list: Set<number> = new Set();
  const values = lib.splitValues(input).map(lib.valueToInt);

  let currentTotal = 0;
  let index = 0;

  while (list.has(currentTotal) === false) {
    list.add(currentTotal);
    currentTotal += values[index];

    if (index === values.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  }

  return lib.formatResult(currentTotal);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/1-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 1 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
