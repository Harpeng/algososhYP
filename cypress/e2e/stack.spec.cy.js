import { input, circle, circleContent, addButton, deleteButton, clearButton, disabled, notDisabled, circleChanging, circleDefault } from "../constants/constants";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS, LONG_DELAY_IN_MS} from '../../src/constants/delay.ts'

const array = ["1", "2", "3"];

describe("Проверка визуалиции компонента со стэком", () => {
    beforeEach(() => {
      cy.visit("/stack");
    });
    it("Кнопки заблокирована при пустом инпуте", () => {
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(disabled);
        cy.get(clearButton).should(disabled);
      });

    const addItem = (value) => {
        cy.get(input).type(value);
        cy.get(addButton).should(notDisabled);
        cy.get(addButton).click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS)
      };

    it("Ограничение длинны строки", () => {
        cy.get(input).type("hello");
        cy.get(addButton).should(notDisabled);
        cy.get(input).should("have.value", "hell");
      });
    
      it("Добавление элементов в стек - корректно", () => {
        /* --------------------------------------------------- */
        cy.get(input).type("1");
        cy.get(addButton).should(notDisabled);
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(circle)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(circleContent).children("div:first").should("have.text", "top");
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(circle)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(notDisabled);
        cy.get(clearButton).should(notDisabled);
    
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(LONG_DELAY_IN_MS);
        /* --------------------------------------------------- */
        cy.get(input).type("2");
        cy.get(addButton).should(notDisabled);
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        cy.get(circle).then((item) => {
          cy.get(item[1])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleChanging));
        });
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "top");
          cy.get(item[1]).children("div:first").should("have.text", "top");
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circle).then((item) => {
          cy.get(item[1])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleDefault));
        });
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(notDisabled);
        cy.get(clearButton).should(notDisabled);
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(LONG_DELAY_IN_MS);
        /* --------------------------------------------------- */
        cy.get(input).type("3");
        cy.get(addButton).should(notDisabled);
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        cy.get(circle).then((item) => {
          cy.get(item[2])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleChanging));
        });
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "top");
          cy.get(item[1]).children("div:first").should("not.have.text", "top");
          cy.get(item[2]).children("div:first").should("have.text", "top");
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circle).then((item) => {
          cy.get(item[2])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleDefault));
        });
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(notDisabled);
        cy.get(clearButton).should(notDisabled);
      });
    
      it("Удаление элементов из стека и очистка работают корректно", () => {
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(disabled);
        cy.get(clearButton).should(disabled);
    
        // eslint-disable-next-line array-callback-return
        array.map((item) => {
          addItem(item);
        });
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(LONG_DELAY_IN_MS);
        
        cy.get(deleteButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(deleteButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
    
        cy.get(circle).then((item) => {
          cy.get(item[2])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleChanging));
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circle).then((item) => {
          cy.get(item[1])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleDefault));
        });
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "top");
          cy.get(item[1]).children("div:first").should("have.text", "top");
        });
    
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(notDisabled);
        cy.get(clearButton).should(notDisabled);    
      });
    
      it("Очистка стека работает корректно", () => {
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(disabled);
        cy.get(clearButton).should(disabled);
    
        // eslint-disable-next-line array-callback-return
        array.map((item) => {
          addItem(item);
        });
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(LONG_DELAY_IN_MS);
    
        cy.get(clearButton).click();
        // eslint-disable-next-line testing-library/await-async-utils, cypress/no-unnecessary-waiting
        cy.wait(DELAY_IN_MS);
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(disabled);
        cy.get(clearButton).should(disabled);
        cy.get(circle).should("not.exist");
      });
    });
    