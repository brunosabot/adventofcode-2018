import * as fs from "fs";
import * as lib from "./lib";
import { ParsedValue } from "./lib";

export const main = async (input: string): Promise<string> => {
  const lines: ParsedValue[] = lib.splitValues(input).map(lib.parseValue);
  let map = lib.generateMap(
    lines.reduce(lib.getMaxWidthReducer, 0),
    lines.reduce(lib.getMaxHeightReducer, 0)
  );

  lines.forEach(line => {
    map = lib.fillMapWidthData(map, line);
  });

  let counter = 0;
  map.forEach((value, key, map) => {
    if (value > 1) {
      counter += 1;
    }
  });

  return lib.formatResult(counter);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/3-1.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 3 part 1")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
