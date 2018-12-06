import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string, distance: number = 10000): Promise<string> => {
  const coordinates = lib.splitValues(input).map(lib.valueToCoordinate);
  const maxX = lib.getMaxX(coordinates);
  const maxY = lib.getMaxY(coordinates);
  const map = lib.getMapFromSize(maxX, maxY);

  const distanceMap = lib.getTotalDistanceFromCoordinates(map, coordinates);
  let distanceLessThan = 0;
  distanceMap.forEach(value => {
    if (parseInt(value, 10) < distance) {
      distanceLessThan += 1;
    }
  });

  return lib.formatResult(distanceLessThan);
};

type MainType = (i: string, n: number) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/6-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input, 10000);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 6 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
