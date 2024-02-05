import { inputValue, inputIndex,addToHeadButton, addToTailButton, deleteByIndexButton, addByIndexButton, deleteFromHeadButton, deleteFromTailButton, circle, circleContent, delay, shortDelay } from "../constants/constants";


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
      cy.get(addToHeadButton).should("be.disabled");
      cy.get(addToTailButton).should("be.disabled");
      cy.get(deleteFromHeadButton).should("not.be.disabled");
      cy.get(deleteFromTailButton).should("not.be.disabled");
      cy.get(addByIndexButton).should("be.disabled");
      cy.get(deleteByIndexButton).should("be.disabled");
    });
  
    it("Удаление элемента из head работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(deleteFromHeadButton).should("not.be.disabled");
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
          .get('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[0])
          .get('[class*="circle_small"]')
          .children()
          .should("have.text", circleData[0]);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
    });
  
    it("Удаление элемента из tail работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(deleteFromTailButton).should("not.be.disabled");
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
          .find('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[circleData.length - 1])
          .find('[class*="circle_small"]')
          .children()
          .should("have.text", circleData[circleData.length - 1]);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
    });
  
    it("Добавление элемента в head работает корректно", () => {
      const number = "1";
      cy.get(inputValue).type(number);
      cy.get(addToHeadButton).should("not.be.disabled");
      cy.get(addToHeadButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(addToHeadButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[0]).find('[class*="circle_small"]').children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_modified"));
        cy.get(item[0]).children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
      });
    });
  
    it("Добавление элемента в tail работает корректно", () => {
      const number = "1";
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(inputValue).type(number);
      cy.get(addToTailButton).should("not.be.disabled");
      cy.get(addToTailButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(addToTailButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .find('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[circleData.length - 1])
          .find('[class*="circle_small"]')
          .children()
          .should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circle).then((item) => {
        cy.get(item[circleData.length])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_modified"));
        cy.get(item[circleData.length]).children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circle).then((item) => {
        cy.get(item[circleData.length])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
      });
    });
  
    it("Удаление элемента по индексу работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      let index = 1;
      cy.get(inputIndex).type(index);
      cy.get(deleteByIndexButton).should("not.be.disabled");
      cy.get(deleteByIndexButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(deleteByIndexButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(shortDelay);
      });
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        // eslint-disable-next-line testing-library/await-async-utils
        cy.wait(shortDelay);
      });
      cy.get(circle).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
        cy.get(item[1]).children().should("have.text", "");
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[index])
          .find('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[1])
          .find('[class*="circle_small"]')
          .children()
          .should("have.text", circleData[index]);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(inputIndex).should("have.text", "");
      cy.get(deleteByIndexButton).should("be.disabled");
    });
  
    it("Добавление элемента по индексу работает корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      let index = 1;
      let number = "1";
      cy.get(inputIndex).type(index);
      cy.get(inputValue).type(number);
      cy.get(addByIndexButton).should("not.be.disabled");
      cy.get(addByIndexButton).click();
      // eslint-disable-next-line jest/valid-expect-in-promise
      cy.get(addByIndexButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[0]).find('[class*="circle_small"]').children().should("have.text", number);
        cy.get(item[0])
          .find(`[class*=${"circle_default"}]`)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(`[class*=${"circle_changing"}]`)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[1])
          .find(`[class*=${"circle_default"}]`)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
        cy.get(item[1])
          .find('[class*="circle_small"]')
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_changing"));
        cy.get(item[1]).find('[class*="circle_small"]').children().should("have.text", number);
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circle).then((item) => {
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_modified"));
      });
      // eslint-disable-next-line testing-library/await-async-utils
      cy.wait(shortDelay);
      cy.get(circle).then((item) => {
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains("circle_default"));
      });
      cy.get(inputIndex).should("have.text", "");
      cy.get(inputValue).should("have.text", "");
      cy.get(addByIndexButton).should("be.disabled");
    });
  });