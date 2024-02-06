const input = "input";
const button = "button"
const circle = '[class^="circle_circle"]';
const circleContent = '[class^="circle_content"]';
const addButton = "[data='add-button']";
const deleteButton = "[data='delete-button']";
const clearButton = "[data='clear-button']";
const inputValue = "[data='input-value']";
const inputIndex = "[data='input-index']";
const addToHeadButton = "[data='add-to-head-button']";
const addToTailButton = "[data='add-to-tail-button']";
const deleteFromHeadButton = "[data='delete-from-head-button']";
const deleteFromTailButton = "[data='delete-from-tail-button']";
const addByIndexButton = "[data='add-by-index-button']";
const deleteByIndexButton = "[data='delete-by-index-button']";
const circleChanging = "circle_changing";
const circleDefault = "circle_default";
const circleModified = "circle_modified";
const circleSmall = '[class*="circle_small"]';
const circleDefaultClass = `[class*=${"circle_default"}]`;
const disabled = "be.disabled";
const notDisabled = "not.be.disabled";
const circleChangingClass = `[class*=${"circle_changing"}]`;

export {
  circleChangingClass,
  button,
  circleChanging,
  circleDefault,
  circleModified,
  circleSmall,
  circleDefaultClass,
  disabled,
  notDisabled,
  addByIndexButton,
  deleteByIndexButton,
  inputValue,
  inputIndex,
  addToHeadButton,
  addToTailButton,
  deleteFromHeadButton,
  deleteFromTailButton,
  input,
  circle,
  circleContent,
  addButton,
  deleteButton,
  clearButton,
};
