import * as fs from "fs";
import * as util from "util";

const { green, red, yellow } = require("kleur");

const mkdir = util.promisify(fs.mkdir);
const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);
const currentDay = process.argv[2];

const getTestTemplate = (day: string, part: string): string => `
import * as part${part} from "./part${part}";

describe("Test day ${day} part ${part}", () => {
  it("Should handle a successful test", () => {
    expect(part${part}.main("")).resolves.toBe("library-${day}");
  });
});`;

const getLibTestTemplate = (day: string) => `
import * as lib from "./lib";

describe("Test day ${day} library", () => {
  it("Should handle a successful test", () => {
    expect(lib.name).toBe("library-${day}");
  });
});`;

const getScriptTemplate = (day: string, part: string) => `
import * as fs from "fs";
import * as lib from "./lib";

export const main = async (input: string): Promise<string> => {
  return "";
};

type MainType = (i: string) => Promise<string>;

const inputBuffer = fs.readFileSync(\`\${__dirname}/../../inputs/${day}-${part}.txt\`);

const withTimer = async (method: MainType, input: string): Promise<void> => {
  const startTime: number = new Date().getTime();
  const result: string = await method(input);
  const endTime: number = new Date().getTime();

  const timeInSeconds: number = Math.round((100 * (endTime - startTime)) / 1000) / 100;

  const { blue, green, yellow } = require("kleur");
  console.log(
    \`\${blue("Result day ${day} part ${part}")} (\${yellow(\`\${timeInSeconds}s\`)}): "\${green(result)}"\`
  );
};

if (process.env.NODE_ENV !== "test") {
  (async function run() {
    withTimer(main, inputBuffer.toString());
  })();
}`;

console.log(yellow(`Creating files for day ${currentDay}`));

stat(`./src/day${currentDay}`)
  .then(() => {
    console.log(red(`Files already created. Skipping`));
  })
  .catch(async () => {
    await Promise.all([
      mkdir(`./src/day${currentDay}`),
      writeFile(`./inputs/${currentDay}-1.txt`, ""),
      writeFile(`./inputs/${currentDay}-2.txt`, ""),
      writeFile(`src/day${currentDay}/lib.ts`, `export const name = "library-${currentDay}";`),
      writeFile(`src/day${currentDay}/lib.spec.ts`, getLibTestTemplate(currentDay)),
      writeFile(`src/day${currentDay}/part1.ts`, getScriptTemplate(currentDay, "1")),
      writeFile(`src/day${currentDay}/part1.spec.ts`, getTestTemplate(currentDay, "1")),
      writeFile(`src/day${currentDay}/part2.ts`, getScriptTemplate(currentDay, "2")),
      writeFile(`src/day${currentDay}/part2.spec.ts`, getTestTemplate(currentDay, "2"))
    ]);

    console.log(green(`Files created for day ${currentDay}`));
  });
