export const name = "library-6";

export interface Point {
  x: number;
  y: number;
}

export const splitValues = (values: string): string[] => values.split("\n");

export const valueToCoordinate = (value: string): Point => {
  const output = value.match(/([0-9]+),\s([0-9]+)/);

  if (output !== null && output.length === 3) {
    const [_, x, y] = output;
    return { x: parseInt(x, 10), y: parseInt(y, 10) };
  }

  return { x: -1, y: -1 };
};

export const getManhattanDistance = (leftPoint: Point, rightPoint: Point) => {
  return Math.abs(rightPoint.x - leftPoint.x) + Math.abs(rightPoint.y - leftPoint.y);
};

export const getMaxX = (coordinates: Point[]) => {
  // +1 because it starts at index 0
  return Math.max(...coordinates.map(({ x }) => x)) + 1;
};

export const getMaxY = (coordinates: Point[]) => {
  // +1 because it starts at index 0
  return Math.max(...coordinates.map(({ y }) => y)) + 1;
};

export const getMapFromSize = (width: number, height: number) => {
  const manhattanMap: Map<Point, string> = new Map();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      manhattanMap.set({ x, y }, "");
    }
  }

  return manhattanMap;
};

export const getClosestCoordinateForPoint = (point: Point, coordinates: Point[]) => {
  let minIndex = -1;
  let minValue = Infinity;
  let draw = false;

  coordinates.forEach((coordinate: Point, index: number) => {
    const manhattanDistance = getManhattanDistance(point, coordinate);
    if (manhattanDistance < minValue) {
      minIndex = index;
      minValue = manhattanDistance;
      draw = false;
    } else if (manhattanDistance === minValue) {
      draw = true;
    }
  });

  if (draw) {
    return "-";
  }

  return formatResult(minIndex);
};

export const getTotalDistanceFromCoordinates = (map: Map<Point, string>, coordinates: Point[]) => {
  map.forEach((value, key) => {
    const totalDistance = coordinates.reduce(
      (acc, coordinate) => acc + getManhattanDistance(key, coordinate),
      0
    );

    map.set(key, `${totalDistance}`);
  });

  return map;
};

export const formatResult = (value: number) => `${value}`;
