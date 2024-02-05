describe("Тестирование переходов по страницам", () => {  
    it("Страница с разворотом строки доступна", () => {
      cy.visit("/");
      // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
      cy.wait(500);
      cy.visit("/recursion");
      cy.contains("Строка");
      // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
      cy.wait(500);
    });
    it("Страница с фибоначчи доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
        cy.visit("/fibonacci");
        cy.contains("Фибоначчи");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
      });
      it("Страница с сортировкой доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
        cy.visit("/sorting");
        cy.contains("Сортировка");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
      });
      it("Страница со стеком доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
        cy.visit("/stack");
        cy.contains("Стек");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
      });
      it("Страница со очередью доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
        cy.visit("/queue");
        cy.contains("Очередь");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
      });
      it("Страница со списоком доступна", () => {
        cy.visit("/");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
        cy.visit("/list");
        cy.contains("список");
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
      });
  });