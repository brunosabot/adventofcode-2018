import * as fs from "fs";
import * as lib from "./lib";
import { ParsedValue } from "./lib";

export const main = async (input: string): Promise<string> => {
  const lines: ParsedValue[] = lib.splitValues(input).map(lib.parseValue);
  let noOverlap = 0;
  let map = lib.generateMap(
    lines.reduce(lib.getMaxWidthReducer, 0),
    lines.reduce(lib.getMaxHeightReducer, 0)
  );

  lines.forEach(line => {
    map = lib.fillMapWidthData(map, line);
  });

  lines.forEach(line => {
    const { countOverlap } = lib.countMapOverlap(map, line);
    if (countOverlap === 0) {
      noOverlap = line.i;
    }
  });

  return lib.formatResult(noOverlap);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/3-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 3 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
