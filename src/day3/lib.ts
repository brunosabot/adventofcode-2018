export const name = "library-3";

export interface ParsedValue {
  i: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export const splitValues = (values: string): string[] => values.split("\n");

export const formatResult = (value: number) => `${value}`;

export const parseValue = (value: string) => {
  const out = value.match(/^#([0-9]+)\s@\s([0-9]+),([0-9]+):\s([0-9]+)x([0-9]+)$/);

  if (out === null) {
    throw new Error("Unable to parse");
  }

  return {
    i: parseInt(out[1], 10),
    left: parseInt(out[2], 10),
    top: parseInt(out[3], 10),
    width: parseInt(out[4], 10),
    height: parseInt(out[5], 10)
  };
};

export const getMaxHeightReducer = (acc: number, value: ParsedValue) => {
  return Math.max(acc, value.top + value.height);
};

export const getMaxWidthReducer = (acc: number, value: ParsedValue) => {
  return Math.max(acc, value.left + value.width);
};

export const generateMap = (width: number, height: number) => {
  const map = new Map();
  for (let i = 1; i <= width; i++) {
    for (let j = 1; j <= height; j++) {
      map.set(i + "-" + j, 0);
    }
  }

  return map;
};

export const fillMapWidthData = (map: Map<string, number>, line: ParsedValue) => {
  for (let i = line.left + 1; i <= line.left + line.width; i++) {
    for (let j = line.top + 1; j <= line.top + line.height; j++) {
      const previousCounter = map.get(i + "-" + j);
      if (typeof previousCounter === "number") {
        map.set(i + "-" + j, previousCounter + 1);
      }
    }
  }

  return map;
};

export const countMapOverlap = (map: Map<string, number>, line: ParsedValue) => {
  let countOverlap = 0;
  for (let i = line.left + 1; i <= line.left + line.width; i++) {
    for (let j = line.top + 1; j <= line.top + line.height; j++) {
      const previousCounter = map.get(i + "-" + j);
      if (typeof previousCounter === "number" && previousCounter > 1) {
        map.set(i + "-" + j, previousCounter + 1);
        countOverlap += 1;
      }
    }
  }

  return { map, countOverlap };
};
