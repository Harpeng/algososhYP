import { Direction } from "../../types/direction";

export const swapTest = (
    value: number[],
    firstItem: number,
    secondItem: number
  ) => {
    return ([value[firstItem], value[secondItem]] = [
      value[secondItem],
      value[firstItem],
    ]);
  };

  export const bubbleSortTest = (arr: number[], order: Direction): number[] => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (
          order === Direction.Ascending
            ? arr[j] > arr[j + 1]
            : arr[j] < arr[j + 1]
        ) {
          swapTest(arr, j, j + 1);
        }
      }
    }
    return arr;
  };

  export const selectionSortTest = (
    arr: number[],
    order: Direction
  ): number[] => {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < length; j++) {
        if (
          order === Direction.Ascending
            ? arr[j] < arr[maxInd]
            : arr[j] > arr[maxInd]
        ) {
          maxInd = j;
        }
      }
      swapTest(arr, maxInd, i);
    }
    return arr;
  };