import * as fs from "fs";
import * as lib from "./lib";

export const main = async (
  input: string,
  offset: number = 60,
  worker: number = 5
): Promise<string> => {
  const values = lib.splitValues(input).map(lib.convertToResolving);
  const firstsElement = lib.findFirstsResolving(values);
  const childrenGraph = lib.getChildrenGraph(values);
  const parentGraph = lib.getParentGraph(values);

  return lib.formatResult(
    lib.executeTask(firstsElement, childrenGraph, parentGraph, offset, worker)
  );
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(`${__dirname}/../../inputs/7-2.txt`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    `${blue("Result day 7 part 2")} (${yellow(`${timeInSeconds}s`)}): "${green(result)}"`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}
