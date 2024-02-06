import { input, circle, circleContent, addButton, deleteButton, clearButton, disabled, notDisabled, circleChanging, circleDefault } from "../constants/constants";
import {SHORT_DELAY_IN_MS, LONG_DELAY_IN_MS} from '../../src/constants/delay.ts'

const array = ["1", "2", "3"];

describe("Проверка визуализации структуры данных 'Очередь'", () => {
    beforeEach(() => {    
      cy.visit("/queue");
    });
  
    it("кнопки заблокированы при пустом инпуте", () => {
      cy.get(input).should("have.value", "");
      cy.get(addButton).should(disabled);
      cy.get(deleteButton).should(disabled);
      cy.get(clearButton).should(disabled);
    });

    const addItem = (value) => {
        cy.get(input).type(value);
        cy.get(addButton).should(notDisabled);
        cy.get(addButton).click();
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      };
  
      it("Ограничение длинны строки в поле ввода работает корректно", () => {
        cy.get(input).type("hello");
        cy.get(addButton).should(notDisabled);
        cy.get(input).should("have.value", "hell");
      });
    
      it("Добавление элементов в очередь работает корректно", () => {
       
        cy.get(input).type("1");
        cy.get(addButton).should(notDisabled);
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        cy.get(circle).then((item) => {
          cy.get(item[0])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleChanging));
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("have.text", "head");
          cy.get(item[0]).children("div:last").should("have.text", "tail");
        });
        cy.get(circle).then((item) => {
          cy.get(item[0])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleDefault));
        });
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(notDisabled);
        cy.get(clearButton).should(notDisabled);
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(LONG_DELAY_IN_MS);
        
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
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("have.text", "head");
          cy.get(item[0]).children("div:last").should("not.have.text", "tail");
          cy.get(item[1]).children("div:last").should("have.text", "tail");
        });
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
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("have.text", "head");
          cy.get(item[1]).children("div:last").should("not.have.text", "tail");
          cy.get(item[2]).children("div:last").should("have.text", "tail");
        });
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
    
        it("Удаление из очереди работает корректно", () => {
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
          cy.get(item[0])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleChanging));
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "head");
          cy.get(item[1]).children("div:first").should("have.text", "head");
          cy.get(item[2]).children("div:last").should("have.text", "tail");
        });
        cy.get(circle).then((item) => {
          cy.get(item[0])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains(circleDefault));
        });
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(notDisabled);
        cy.get(clearButton).should(notDisabled);
      });
    
      it("Очистка из очереди работает корректно", () => {
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
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(clearButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(input).should("have.value", "");
        cy.get(addButton).should(disabled);
        cy.get(deleteButton).should(disabled);
        cy.get(clearButton).should(disabled);
        cy.get(circle).children().nextAll().should('not.exist');
    });
    
  });