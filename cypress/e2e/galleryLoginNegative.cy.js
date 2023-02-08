/// <reference types="Cypress" />

describe("Home page", () => {
    it("Visit home page", () => {
        cy.visit("/");

    });
});

describe("Login page", () => {
    it ("Click on login button", () => {
        cy.visit("/");
        cy.get('a[href="/login"]').click()
    });
});

describe("Negative Login (Wrong E-mail format)", () => {
    it ("Enter wrong email but correct pass", () => {
        cy.visit("/");
        cy.get('a[href="/login"]').click()
        cy.get("#email").type("vivifytestgmail.com");
        cy.get("#password").type("12345678");
        cy.get("button").click();
        cy.url().should("contain", "/login");
    });
});

describe("Negative Login (Wrong password)", () => {
    it ("Enter correct email but wrong pass", () => {
        cy.visit("/");
        cy.get('a[href="/login"]').click()
        cy.get("#email").type("vivifytest@gmail.com");
        cy.get("#password").type("0000000");
        cy.get("button").click();
        cy.get(".alert").should('include.text', 'Bad Credentials');
        cy.url().should("contain", "/login");
    });
});