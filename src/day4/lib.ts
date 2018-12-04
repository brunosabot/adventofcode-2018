export const name = "library-4";

export interface ParsedValue {
  date: Date;
  action: string;
}

export const splitValues = (values: string): string[] => values.split("\n");

export const formatResult = (value: number) => `${value}`;

export const formatEntry = (line: string) => {
  const output = line.match(/\[([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)\]\s(.*)/);

  if (output !== null && output.length === 7) {
    return {
      date: new Date(
        parseInt(output[1], 10),
        parseInt(output[2], 10) - 1,
        parseInt(output[3], 10),
        parseInt(output[4], 10),
        parseInt(output[5], 10),
        0,
        0
      ),
      action: output[6]
    };
  }

  return { date: new Date(0, 0, 0, 0, 0, 0, 0), action: "" };
};

const MILISECONDS_PER_MINUTE = 60 * 1000;

const getMinuteDiff = (left: Date, right: Date) => {
  return (left.getTime() - right.getTime()) / MILISECONDS_PER_MINUTE;
};

export const getGuardsMaps = (lines: ParsedValue[]) => {
  const guardsAwake: Map<number, number> = new Map();
  const guardsAsleep: Map<number, number> = new Map();
  let currentGuard: number = 0;

  lines.forEach((line, i, array) => {
    if (guardsAwake.has(currentGuard) === false) {
      guardsAwake.set(currentGuard, 0);
    }
    if (guardsAsleep.has(currentGuard) === false) {
      guardsAsleep.set(currentGuard, 0);
    }

    const previousIndex = Math.max(i - 1, 0);
    const currentGuardAwakeValue = guardsAwake.get(currentGuard);
    const currentGuardAsleepValue = guardsAsleep.get(currentGuard);

    if (
      typeof currentGuardAwakeValue === "undefined" ||
      typeof currentGuardAsleepValue === "undefined"
    ) {
      return;
    }

    if (line.action.indexOf("Guard") === 0) {
      const result = line.action.match(/#([0-9]+)/);
      if (result && result[1]) {
        guardsAwake.set(
          currentGuard,
          currentGuardAwakeValue + getMinuteDiff(line.date, array[previousIndex].date)
        );
        currentGuard = parseInt(result[1], 10);
      }
    } else if (line.action === "falls asleep") {
      guardsAwake.set(
        currentGuard,
        currentGuardAwakeValue + getMinuteDiff(line.date, array[previousIndex].date)
      );
    } else if (line.action === "wakes up") {
      guardsAsleep.set(
        currentGuard,
        currentGuardAsleepValue + getMinuteDiff(line.date, array[previousIndex].date)
      );
    }
  });

  return { guardsAwake, guardsAsleep };
};

export const getMaxAsleepGuardFromMap = (guardsAsleep: Map<number, number>) => {
  let maxAsleepGuard: number = -1;

  guardsAsleep.forEach((value: number, key: number, map: Map<number, number>) => {
    const currentMaxAsleepValue = map.get(maxAsleepGuard) || -1;
    if (value > currentMaxAsleepValue) {
      maxAsleepGuard = key;
    }
  });

  return maxAsleepGuard;
};

export const getSleepByMinuteFoGuard = (guard: number, lines: ParsedValue[]) => {
  let currentGuard = -1;
  let sleepMinuteMap = new Map();
  for (let i = 0; i < 60; i++) {
    sleepMinuteMap.set(i, 0);
  }

  lines.forEach((line: ParsedValue, i: number, array: ParsedValue[]) => {
    const previousIndex = Math.max(i - 1, 0);
    if (line.action.indexOf("Guard") === 0) {
      const result = line.action.match(/#([0-9]+)/);
      if (result && result[1]) {
        currentGuard = parseInt(result[1], 10);
      }
    } else if (line.action === "wakes up" && currentGuard === guard) {
      let d = new Date(array[previousIndex].date);
      while (d.getTime() !== line.date.getTime()) {
        let minute = d.getMinutes();
        sleepMinuteMap.set(minute, sleepMinuteMap.get(minute) + 1);
        d.setMinutes(minute + 1);
      }
    }
  });

  return sleepMinuteMap;
};

export const getMaxMinuteFromMap = (map: Map<number, number>) => {
  let maxValue = -1;
  let maxIndex = -1;

  map.forEach((value, key) => {
    if (value > maxValue) {
      maxIndex = key;
      maxValue = value;
    }
  });

  return { maxIndex, maxValue };
};

export const sortByDate = (left: ParsedValue, right: ParsedValue) => {
  return left.date > right.date ? 1 : -1;
};
