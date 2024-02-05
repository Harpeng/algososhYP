import { input, circle, circleContent, addButton, deleteButton, clearButton, delay, shortDelay } from "../constants/constants";
const array = ["1", "2", "3"];

describe("Проверка визуалиции компонента со стэком", () => {
    beforeEach(() => {
      cy.visit("/stack");
    });
    it("Кнопки заблокирована при пустом инпуте", () => {
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("be.disabled");
        cy.get(clearButton).should("be.disabled");
      });

    const addItem = (value) => {
        cy.get(input).type(value);
        cy.get(addButton).should("not.be.disabled");
        cy.get(addButton).click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500)
      };

    it("Ограничение длинны строки", () => {
        cy.get(input).type("hello");
        cy.get(addButton).should("not.be.disabled");
        cy.get(input).should("have.value", "hell");
      });
    
      it("Добавление элементов в стек - корректно", () => {
        /* --------------------------------------------------- */
        cy.get(input).type("1");
        cy.get(addButton).should("not.be.disabled");
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(circle)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(circleContent).children("div:first").should("have.text", "top");
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(shortDelay);
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(circle)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("not.be.disabled");
        cy.get(clearButton).should("not.be.disabled");
    
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(3000);
        /* --------------------------------------------------- */
        cy.get(input).type("2");
        cy.get(addButton).should("not.be.disabled");
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        cy.get(circle).then((item) => {
          cy.get(item[1])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains("circle_changing"));
        });
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "top");
          cy.get(item[1]).children("div:first").should("have.text", "top");
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(shortDelay);
        cy.get(circle).then((item) => {
          cy.get(item[1])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains("circle_default"));
        });
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("not.be.disabled");
        cy.get(clearButton).should("not.be.disabled");
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(delay);
        /* --------------------------------------------------- */
        cy.get(input).type("3");
        cy.get(addButton).should("not.be.disabled");
        cy.get(addButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(addButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
        cy.get(circle).then((item) => {
          cy.get(item[2])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains("circle_changing"));
        });
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "top");
          cy.get(item[1]).children("div:first").should("not.have.text", "top");
          cy.get(item[2]).children("div:first").should("have.text", "top");
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(shortDelay);
        cy.get(circle).then((item) => {
          cy.get(item[2])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains("circle_default"));
        });
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("not.be.disabled");
        cy.get(clearButton).should("not.be.disabled");
      });
    
      it("Удаление элементов из стека и очистка работают корректно", () => {
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("be.disabled");
        cy.get(clearButton).should("be.disabled");
    
        // eslint-disable-next-line array-callback-return
        array.map((item) => {
          addItem(item);
        });
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(delay);
        
        cy.get(deleteButton).click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get(deleteButton)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("loader"));
    
        cy.get(circle).then((item) => {
          cy.get(item[2])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains("circle_changing"));
        });
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(shortDelay);
        cy.get(circle).then((item) => {
          cy.get(item[1])
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains("circle_default"));
        });
        cy.get(circleContent).then((item) => {
          cy.get(item[0]).children("div:first").should("not.have.text", "top");
          cy.get(item[1]).children("div:first").should("have.text", "top");
        });
    
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("not.be.disabled");
        cy.get(clearButton).should("not.be.disabled");    
      });
    
      it("Очистка стека работает корректно", () => {
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("be.disabled");
        cy.get(clearButton).should("be.disabled");
    
        // eslint-disable-next-line array-callback-return
        array.map((item) => {
          addItem(item);
        });
    
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(delay);
    
        cy.get(clearButton).click();
        // eslint-disable-next-line testing-library/await-async-utils, cypress/no-unnecessary-waiting
        cy.wait(1000);
        cy.get(input).should("have.value", "");
        cy.get(addButton).should("be.disabled");
        cy.get(deleteButton).should("be.disabled");
        cy.get(clearButton).should("be.disabled");
        cy.get(circle).should("not.exist");
      });
    });
    