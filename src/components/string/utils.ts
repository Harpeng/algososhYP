export const swapTest = (array: string) => {
    const newArray = array.split("");
    const endString = newArray.length - 1;
    const middleString = Math.ceil(newArray.length / 2);
    for (let i = 0; i < middleString; i++) {
      let j = endString - i;
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };