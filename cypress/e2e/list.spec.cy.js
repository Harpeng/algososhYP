import { inputValue, inputIndex,addToHeadButton, addToTailButton, deleteByIndexButton, addByIndexButton, deleteFromHeadButton, deleteFromTailButton, circle, circleContent, disabled, notDisabled, circleSmall, circleChanging, circleModified, circleDefault, circleDefaultClass, circleChangingClass } from "../constants/constants";
import {SHORT_DELAY_IN_MS} from '../../src/constants/delay.ts'



const getDataFromCircle = (array) => {
    cy.get(circle).then((item) => {
      cy.get(item)
        .children()
        .each((el) => {
          array.push(el.text().trim());
        });
    });
  };
  
  describe("Проверка визуализации компонента список", () => {
    beforeEach(() => {    
      cy.visit("/list");
    });
  
    it("все кнопки при пустом инпуте заблокированы", () => {
      cy.get(inputValue).should("have.value", "");
      cy.get(inputIndex).should("have.value", "");
      cy.get(addToHeadButton).should(disabled);
      cy.get(addToTailButton).should(disabled);
      cy.get(deleteFromHeadButton).should(notDisabled);
      cy.get(deleteFromTailButton).should(notDisabled);
      cy.get(addByIndexButton).should(disabled);
      cy.get(deleteByIndexButton).should(disabled);
    });
  
    it("Удаление элемента из head работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(deleteFromHeadButton).should(notDisabled);
      cy.get(deleteFromHeadButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(deleteFromHeadButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .children()
          .then((item) => {
            cy.get(item[1]).children().should("have.text", "");
          });
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .get(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[0])
          .get(circleSmall)
          .children()
          .should("have.text", circleData[0]);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
    });
  
    it("Удаление элемента из tail работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(deleteFromTailButton).should(notDisabled);
      cy.get(deleteFromTailButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(deleteFromTailButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .children()
          .then((item) => {
            cy.get(item[1]).children().should("have.text", "");
          });
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .children()
          .should("have.text", circleData[circleData.length - 1]);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
    });
  
    it("Добавление элемента в head работает корректно", () => {
      const number = "1";
      cy.get(inputValue).type(number);
      cy.get(addToHeadButton).should(notDisabled);
      cy.get(addToHeadButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(addToHeadButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[0]).find(circleSmall).children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleModified));
        cy.get(item[0]).children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
      });
    });
  
    it("Добавление элемента в tail работает корректно", () => {
      const number = "1";
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(inputValue).type(number);
      cy.get(addToTailButton).should(notDisabled);
      cy.get(addToTailButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(addToTailButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .children()
          .should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).then((item) => {
        cy.get(item[circleData.length])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleModified));
        cy.get(item[circleData.length]).children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).then((item) => {
        cy.get(item[circleData.length])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
      });
    });
  
    it("Удаление элемента по индексу работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      let index = 1;
      cy.get(inputIndex).type(index);
      cy.get(deleteByIndexButton).should(notDisabled);
      cy.get(deleteByIndexButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(deleteByIndexButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(SHORT_DELAY_IN_MS);
      });
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
        cy.get(item[1]).children().should("have.text", "");
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[index])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[1])
          .find(circleSmall)
          .children()
          .should("have.text", circleData[index]);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(inputIndex).should("have.text", "");
      cy.get(deleteByIndexButton).should(disabled);
    });
  
    it("Добавление элемента по индексу работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      let index = 1;
      let number = "1";
      cy.get(inputIndex).type(index);
      cy.get(inputValue).type(number);
      cy.get(addByIndexButton).should(notDisabled);
      cy.get(addByIndexButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(addByIndexButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[0]).find(circleSmall).children().should("have.text", number);
        cy.get(item[0])
          .find(circleDefaultClass)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(circleChangingClass)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[1])
          .find(circleDefaultClass)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
        cy.get(item[1])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleChanging));
        cy.get(item[1]).find(circleSmall).children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).then((item) => {
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleModified));
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circle).then((item) => {
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(circleDefault));
      });
      cy.get(inputIndex).should("have.text", "");
      cy.get(inputValue).should("have.text", "");
      cy.get(addByIndexButton).should(disabled);
    });
  });