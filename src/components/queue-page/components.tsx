import { ChangeEvent, FC, useState } from "react";
import style from "./style.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { queue } from "./type";
import { ElementStates } from "../../types/element-states";
import { TAIL, HEAD } from "../../constants/element-captions";

export const QueuePage: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState<string[]>(queue.getElements());
  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });  

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const setDelay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const addElement = async () => {
    setLoader({ ...loader, add: true });
    setCurrIndex(queue.getTail());
    await setDelay(500);
    queue.enqueue(inputValue);
    setArray([...queue.getElements()]);
    setInputValue("");
    setCurrIndex(null);
    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });
    setCurrIndex(queue.getHead());
    await setDelay(500);
    queue.dequeue();
    setArray([...queue.getElements()]);
    if (queue.isEmpty()) {
      queue.clear();
    }
    setCurrIndex(null);
    setLoader({ ...loader, delete: false });
  };

  const clearElements = async () => {
    setLoader({ ...loader, clear: true });
    await setDelay(500);
    queue.clear();
    setArray([...queue.getElements()]);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={style.form}>
        <Input
          maxLength={4}
          isLimitText
          onChange={onChange}
          value={inputValue}
          disabled={queue.isFull()}
        />
        <Button
          text="Добавить"
          type="button"
          onClick={addElement}
          isLoader={loader.add}
          disabled={!!!inputValue || queue.isFull()}
          data="add-button"
        />
        <Button
          text="Удалить"
          type="button"
          onClick={deleteElement}
          isLoader={loader.delete}
          disabled={queue.isEmpty()}
          data="delete-button"
        />
        <Button
          text="Очистить"
          type="button"
          onClick={clearElements}
          extraClass={style.button}
          isLoader={loader.clear}
          disabled={queue.isEmpty()}
          data="clear-button"
        />
      </div>
      <ul className={style.symbolList}>
        {array?.map((element, index) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={element}
              state={
                index === currIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={
                index === queue.getHead() && !queue.isEmpty() ? HEAD : ""
              }
              tail={
                index === queue.getTailIndex() && !queue.isEmpty()
                  ? TAIL
                  : ""
              }
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
