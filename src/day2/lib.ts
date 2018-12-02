export const name = "library-2";

export const splitValues = (values: string): string[] => values.split("\n");

export const countLetters = (value: string) => {
  const map = new Map();

  value.split("").forEach(letter => {
    map.set(letter, (map.get(letter) || 0) + 1);
  });

  return mapToObject(map);
};

export const mapToObject = (map: Map<string, number>) => {
  const object: { [s: string]: number } = {};
  map.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

export const getLetterWithCount = (counts: { [s: string]: number }, count: number) => {
  const list: string[] = [];
  const keys: string[] = Object.keys(counts);

  keys.forEach(key => {
    if (counts[key] === count) {
      list.push(key);
    }
  });

  return list;
};

export const getDifferences = (stringLeft: string, stringRight: string): string => {
  let i: number = 0;
  let result: string = "";

  while (i < stringRight.length) {
    if (stringLeft[i] !== stringRight[i]) {
      result += stringRight[i];
    }

    i += 1;
  }

  return result;
};

export const removeDifferences = (stringLeft: string, stringRight: string) => {
  let i: number = 0;
  let result: string = "";

  while (i < stringRight.length) {
    if (stringLeft[i] === stringRight[i]) {
      result += stringLeft[i];
    }

    i += 1;
  }

  return result;
};

export const formatResult = (value: number) => `${value}`;
