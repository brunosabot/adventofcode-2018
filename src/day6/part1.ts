import * as fs from "fs";
import * as lib from "./lib";
import { log } from "util";

export const main = async (input: string): Promise<string> => {
  const coordinates = lib.splitValues(input).map(lib.valueToCoordinate);
  const maxX = lib.getMaxX(coordinates);
  const maxY = lib.getMaxY(coordinates);
  const map = lib.getMapFromSize(maxX, maxY);

  const filledMap = new Map<lib.Point, string>();
  map.forEach((_, key) => {
    filledMap.set(key, lib.getClosestCoordinateForPoint(key, coordinates));
  });

  const indexes: Map<string, number> = new Map();
  for (let i = 0; i < coordinates.length; i++) {
    indexes.set(`${i}`, 0);
  }

  filledMap.forEach((value, key) => {
    if (key.x === 0 || key.x === maxX - 1 || key.y === 0 || key.y === maxY - 1) {
      indexes.delete(value);
    }
  });

  filledMap.forEach(value => {
    const currentValue = indexes.get(value);
    if (typeof currentValue !== "undefined") {
      indexes.set(value, currentValue + 1);
    }
  });

  return lib.formatResult(Math.max(...Array.from(indexes.values())));
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/6-1.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 6 part 1")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
