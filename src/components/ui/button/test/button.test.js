import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

describe("Тест кнопок", () => {
    test("кнопка с текстом корректно отрисована", () => {
        const button = TestRenderer.create(<Button text="Сортировать" />).toJSON();
        expect(button).toMatchSnapshot();
    });
    test("Кнопки без текста корректно отрисованы", () => {
        const button = TestRenderer.create(<Button text=""/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test("Кнопки заблокированная корректно отрисованы", () => {
        const button = TestRenderer.create(<Button disabled/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test("Кнопки с индикацией загрузки корректно отрисованы", () => {
        const button = TestRenderer.create(<Button isLoader/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test("корректный вызов колбэка по клику", () => {
        const clickCallBack = jest.fn();
        render(<Button onClick={clickCallBack}/>);
        const button = screen.getByRole("button");
        fireEvent.click(button)
    });
})


