import {SHORT_DELAY_IN_MS} from '../../src/constants/delay.ts'


describe("Тестирование переходов по страницам", () => {  
    it("Страница с разворотом строки доступна", () => {
      cy.visit("/");
      // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.visit("/recursion");
      cy.contains("Строка");
      // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
    });
    it("Страница с фибоначчи доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.visit("/fibonacci");
        cy.contains("Фибоначчи");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
      it("Страница с сортировкой доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.visit("/sorting");
        cy.contains("Сортировка");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
      it("Страница со стеком доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.visit("/stack");
        cy.contains("Стек");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
      it("Страница со очередью доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.visit("/queue");
        cy.contains("Очередь");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
      it("Страница со списоком доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.visit("/list");
        cy.contains("список");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
  });