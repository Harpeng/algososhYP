import {SHORT_DELAY_IN_MS} from '../../src/constants/delay.ts'

describe("Тестирование работоспособности приложения", () => {  
    it("Главная страница доступна", () => {
      cy.visit("/");
      cy.contains("МБОУ АЛГОСОШ");
      // eslint-disable-next-line testing-library/await-async-utils, cypress/no-unnecessary-waiting
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });