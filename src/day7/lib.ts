import { log } from "util";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const name = "library-7";

export interface Resolving {
  for: string;
  need: string;
}

export const splitValues = (values: string): string[] => values.split("\n");

export const convertToResolving = (value: string): Resolving => {
  const output = value.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./);

  if (output !== null && output.length === 3) {
    return { for: output[2], need: output[1] };
  }

  return { for: "", need: "" };
};

export const getChildrenGraph = (values: Resolving[]) => {
  const graph: Map<string, string[]> = new Map();

  values.forEach(value => {
    const currentParent = graph.get(value.for) || [];
    graph.set(value.for, currentParent.sort());

    const currentChildren = graph.get(value.need) || [];
    currentChildren.push(value.for);
    graph.set(value.need, currentChildren.sort());
  });

  return graph;
};

export const getParentGraph = (values: Resolving[]) => {
  const graph: Map<string, string[]> = new Map();

  values.forEach(value => {
    const currentChild = graph.get(value.need) || [];
    graph.set(value.need, currentChild.sort());

    const currentParents = graph.get(value.for) || [];
    currentParents.push(value.need);
    graph.set(value.for, currentParents.sort());
  });

  return graph;
};

export const findFirstsResolving = (values: Resolving[]) => {
  let initial: string[] = [];

  getParentGraph(values).forEach((value, key) => {
    if (value.length === 0) {
      initial.push(key);
    }
  });

  return initial.sort();
};

export const getChildren = (
  firstElements: string[],
  childrenGraph: Map<string, string[]>,
  parentGraph: Map<string, string[]>
): string => {
  let myString = "";
  let toHandle = firstElements;

  while (toHandle.length > 0) {
    const letter = toHandle.shift();
    if (typeof letter !== "undefined") {
      const children = childrenGraph.get(letter);
      if (typeof children !== "undefined") {
        myString += letter;
        toHandle = [...toHandle, ...children].sort();
        toHandle = toHandle.filter(l => myString.indexOf(l) === -1);
        toHandle = toHandle.filter(l => {
          const parents = parentGraph.get(l);

          if (typeof parents === "undefined") {
            return false;
          }

          return parents.every(parent => myString.indexOf(parent) > -1);
        });
      }
    }
  }

  return myString;
};

export const executeTask = (
  firstsElement: string[],
  childrenGraph: Map<string, string[]>,
  parentGraph: Map<string, string[]>,
  offset: number = 60,
  workers: number = 5
) => {
  let myString = "";
  let counter = -1;
  let toHandle = firstsElement;
  const workerMethod = function() {
    let currentLetter: string | undefined = "";
    let getLetterIndex = (letter: string) => LETTERS.split("").indexOf(letter) + 1;

    return function* worker() {
      while (true) {
        currentLetter = toHandle.shift();
        if (typeof currentLetter === "undefined") {
          yield;
          continue;
        }

        for (let i = 1; i <= offset + getLetterIndex(currentLetter); i++) {
          yield;
        }

        const children = childrenGraph.get(currentLetter);
        if (typeof children !== "undefined") {
          myString += currentLetter;
          toHandle = [...toHandle, ...children]
            .sort()
            .filter(l => myString.indexOf(l) === -1)
            .filter(l => {
              const parents = parentGraph.get(l);

              if (typeof parents === "undefined") {
                return false;
              }

              return parents.every(parent => myString.indexOf(parent) > -1);
            });
        }
      }
    };
  };

  const workerList = [];
  for (let i = 0; i < workers; i++) {
    workerList.push(workerMethod()());
  }

  while (myString.length < childrenGraph.size) {
    counter += 1;
    workerList.forEach(worker => worker.next());
  }

  return counter;
};

export const formatResult = (value: number) => `${value}`;
