import TestRenderer from 'react-test-renderer';
import { Circle } from '../circle';
import { ElementStates } from '../../../../types/element-states';

describe("Тестирование компонента Circle", () => {
    test("корректная отрисовка компонента без буквы", () => {
        const circle = TestRenderer.create(<Circle letter="" />).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с буквой отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle letter='text'/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с head отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle head="head"/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с  react-элементом в head отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle head={<Circle />}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с tail отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle tail='tail'/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с react-элементом в tail отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle tail={<Circle />}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с индексом отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle index={1}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент с пропсом isSmall отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle isSmall/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент в состоянии default отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент в состоянии changing отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
    test("Компонент в состоянии modified отрисован корректно", () => {
        const circle = TestRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
        expect(circle).toMatchSnapshot();
    })
})