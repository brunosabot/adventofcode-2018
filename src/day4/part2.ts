import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string): Promise<string> => {
  const lines: lib.ParsedValue[] = lib
    .splitValues(input)
    .map(lib.formatEntry)
    .sort(lib.sortByDate);

  const { guardsAsleep } = lib.getGuardsMaps(lines);

  let maxGuardIndex = -1;
  let maxGuardValue = -1;
  let maxGuardMinute = -1;

  guardsAsleep.forEach((value, key) => {
    const { maxIndex, maxValue } = lib.getMaxMinuteFromMap(lib.getSleepByMinuteFoGuard(key, lines));

    if (maxValue > maxGuardValue) {
      maxGuardIndex = key;
      maxGuardValue = maxValue;
      maxGuardMinute = maxIndex;
    }
  });

  return lib.formatResult(maxGuardIndex * maxGuardMinute);
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/4-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 4 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
