import { bubbleSortTest } from "../utils";
import { Direction } from "../../../types/direction";

describe("Тестирование алгоритмов сортировки пузырьком", () => {
    test("Сортировка пустого массива По возрастанию", () => {
        expect(bubbleSortTest([], Direction.Ascending)).toEqual([]);
    })
    test("Сортировка пустого массива по убыванию", () => {
        expect(bubbleSortTest([], Direction.Descending)).toEqual([]);
    })
    test("Сортировка массива с одним элементом По возрастанию", () => {
        expect(bubbleSortTest([1], Direction.Ascending)).toEqual([1]);
    })
    test("Сортировка массива с одним элементом по убыванию", () => {
        expect(bubbleSortTest([1], Direction.Descending)).toEqual([1]);
    })
    test("Сортировка массива с несколькими элементом по убыванию", () => {
        expect(bubbleSortTest([1,6,8,4], Direction.Descending)).toEqual([8,6,4,1]);
    })
    test("Сортировка массива с несколькими элементом по возрастанию", () => {
        expect(bubbleSortTest([1,6,8,4], Direction.Ascending)).toEqual([1,4,6,8]);
    })
})