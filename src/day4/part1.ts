import * as fs from "fs";
import * as lib from "./lib";

interface GuardTimeList {
  [name: number]: number;
}

export const main = async (input: string): Promise<string> => {
  const lines: lib.ParsedValue[] = lib
    .splitValues(input)
    .map(lib.formatEntry)
    .sort(lib.sortByDate);

  const { guardsAsleep } = lib.getGuardsMaps(lines);
  const maxAsleepGuard = lib.getMaxAsleepGuardFromMap(guardsAsleep);
  const minuteMap = lib.getSleepByMinuteFoGuard(maxAsleepGuard, lines);

  return lib.formatResult(maxAsleepGuard * lib.getMaxMinuteFromMap(minuteMap).maxIndex);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/4-1.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 4 part 1")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
