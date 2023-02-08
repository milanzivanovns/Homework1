/// <reference types="Cypress" />

describe("Home page", () => {
    it("Visit home page", () => {
        cy.visit("/");

    });
});

describe("Registration page", () => {
    it("Click on registration button", () => {
        cy.visit("/");
        cy.get('a[href="/register"]').click()
    })
})

describe("Negative registration (Wrong E-mail format)", () => {
    it("Try to register wiht wrong E-mail format", () => {
        cy.visit("/");
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Milan");
        cy.get("#last-name").type("Zivanov");
        cy.get("#email").type("milagmail");
        cy.get("#password").type("12345678");
        cy.get("#password-confirmation").type("12345678");
        cy.get(":checkbox").check();
        cy.get("button").click();
        cy.on('window:alert',(txt)=> {
            expect(txt).to.contains('The email must be a valid email address.');
        })  
        cy.url().should("contain", "/register");
    })
})

describe("Negative registration (Not enough characters in the password)", () => {
    it("Try to register wiht insufficient number of characters", () => {
        cy.visit("/");
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Milan");
        cy.get("#last-name").type("Zivanov");
        cy.get("#email").type("miilan@gmail.com");
        cy.get("#password").type("1");
        cy.get("#password-confirmation").type("1");
        cy.get(":checkbox").check();
        cy.get("button").click();
        cy.on('window:alert',(txt)=> {
            expect(txt).to.contains('The password must be at least 8 characters.');
        })  
        cy.url().should("contain", "/register");
    })
})


describe.only("Negative registration (Confirmed password is not the same as password)", () => {
    it("Try to register wiht wrong confirmation of password", () => {
        cy.visit("/");
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Milan");
        cy.get("#last-name").type("Zivanov");
        cy.get("#email").type("miilan@gmail.com");
        cy.get("#password").type("12345678");
        cy.get("#password-confirmation").type("87654321");
        cy.get(":checkbox").check();
        cy.get("button").click();
        cy.on('window:alert',(txt)=> {
            expect(txt).to.contains('The password confirmation does not match.');
        })  
        cy.url().should("contain", "/register");
    })
})

describe("Negative registration (Unchecked checkbox )", () => {
    it("Try to register wiht Unchecked checkbox", () => {
        cy.visit("/");
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Milan");
        cy.get("#last-name").type("Zivanov");
        cy.get("#email").type("miilan@gmail.com");
        cy.get("#password").type("12345678");
        cy.get("#password-confirmation").type("12345678");
        cy.get(":checkbox").uncheck();
        cy.get("button").click();
        cy.on('window:alert',(txt)=> {
            expect(txt).to.contains('The terms and conditions must be accepted.');
        })  
        cy.url().should("contain", "/register");
    })
})

