import { button, circleChanging, circleDefault, circleModified, disabled, input, notDisabled } from "../constants/constants";
import {DELAY_IN_MS} from '../../src/constants/delay.ts'

describe("Проверка визуалиции компонента с разворотом строки", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });
  it("Кнопка заблокирована при пустом инпуте", () => {
    cy.get(input).as(input);
    cy.get("@input").should("have.value", "");
    cy.get(button).last().as(button);
    cy.get("@button").should(disabled);
  });
  it("Визуализация алгоритма работает корректно", () => {
    cy.get(input).as(input);
    cy.get(button).last().as(button);
    cy.get("@input").type("puppy");
    cy.get("@button").should(notDisabled);
    cy.get("@button").click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.get("@button")
      .invoke("attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.get('[class^="circle_circle"]').as("circle");
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleChanging));
      cy.get(item[0]).children().should("have.text", "p");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[1]).children().should("have.text", "u");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[2]).children().should("have.text", "p");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleDefault));
      cy.get(item[3]).children().should("have.text", "p");

      cy.get(item[4])
      .invoke("attr", "class")
      .then((className) => expect(className).contains(circleChanging));
    cy.get(item[4]).children().should("have.text", "y");
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
    cy.wait(DELAY_IN_MS);

    cy.get("@circle").then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleModified));
        cy.get(item[0]).children().should("have.text", "y");
  
        cy.get(item[1])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleChanging));
        cy.get(item[1]).children().should("have.text", "u");
  
        cy.get(item[2])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleDefault));
        cy.get(item[2]).children().should("have.text", "p");
  
        cy.get(item[3])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleChanging));
        cy.get(item[3]).children().should("have.text", "p");
  
        cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[4]).children().should("have.text", "p");
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
      cy.wait(DELAY_IN_MS);

      cy.get("@circle").then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleModified));
        cy.get(item[0]).children().should("have.text", "y");
  
        cy.get(item[1])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleModified));
        cy.get(item[1]).children().should("have.text", "p");
  
        cy.get(item[2])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleModified));
        cy.get(item[2]).children().should("have.text", "p");
  
        cy.get(item[3])
          .invoke("attr", "class")
          .then((className) => expect(className).contains(circleModified));
        cy.get(item[3]).children().should("have.text", "u");
  
        cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(circleModified));
      cy.get(item[4]).children().should("have.text", "p");
      });

      // eslint-disable-next-line cypress/no-unnecessary-waiting, testing-library/await-async-utils
      cy.wait(DELAY_IN_MS);

      cy.get("@input").should("have.value", "");
      cy.get("@button").should(disabled);
  });
});
