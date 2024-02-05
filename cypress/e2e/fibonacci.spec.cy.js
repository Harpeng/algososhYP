describe("Проверка визуалиции компонента с разворотом строки", () => {
    beforeEach(() => {
      cy.visit("/fibonacci");
    });
    it("Кнопка заблокирована при пустом инпуте", () => {
      cy.get("input").as("input");
      cy.get("@input").should("have.value", "");
      cy.get("button").last().as("button");
      cy.get("@button").should("be.disabled");
    });

    it("Визуализация алгоритма работает корректно", () => {
        cy.get("input").as("input");
        cy.get("button").last().as("button");
        cy.get("@input").type(3);
        cy.get("@button").should("not.be.disabled");
        cy.get("@button").click();
        // eslint-disable-next-line jest/valid-expect-in-promise
        cy.get("@button")
          .invoke("attr", "class")
          .then((className) => expect(className).contains("loader"));
    
        cy.get('[class^="circle_circle"]').as("circle");
        cy.get("@circle").then((item) => {
          cy.get(item[0]).children().should("have.text", "1");
        });
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
    
        cy.get("@circle").then((item) => {
          cy.get(item[0]).children().should("have.text", "1");
          cy.get(item[1]).children().should("have.text", "1");
        });
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
    
        cy.get("@circle").then((item) => {
          cy.get(item[0]).children().should("have.text", "1");
          cy.get(item[1]).children().should("have.text", "1");
          cy.get(item[2]).children().should("have.text", "2");
        });
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
    
        cy.get("@circle").then((item) => {
          cy.get(item[0]).children().should("have.text", "1");
          cy.get(item[1]).children().should("have.text", "1");
          cy.get(item[2]).children().should("have.text", "2");
          cy.get(item[3]).children().should("have.text", "3");
        });
        // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
        cy.wait(500);
    
        cy.get("@input").should("have.value", "");
        cy.get("@button").should("be.disabled");
      });
  });