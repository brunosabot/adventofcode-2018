export const name = "library-1";

export const splitValues = (values: string): string[] => values.split("\n");

export const valueToInt = (value: string): number => parseInt(value, 10);

export const sumReduce = (total: number, values: number): number => total + values;

export const formatResult = (value: number) => `${value}`;
