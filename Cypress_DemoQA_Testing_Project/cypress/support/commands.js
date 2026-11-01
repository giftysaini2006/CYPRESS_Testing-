// ***********************************************************
// cypress/support/commands.js
// Custom reusable commands for DemoQA Cypress automation suite
// ***********************************************************

/**
 * Custom command to remove persistent ad banners and footers that
 * frequently overlap interactive buttons on DemoQA pages.
 */
Cypress.Commands.add('cleanDemoQABanners', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#fixedban').length > 0) {
      cy.get('#fixedban').invoke('remove');
    }
    if ($body.find('footer').length > 0) {
      cy.get('footer').invoke('remove');
    }
    if ($body.find('#adplus-anchor').length > 0) {
      cy.get('#adplus-anchor').invoke('remove');
    }
  });
});

/**
 * Custom command to fill and submit the Text Box form.
 */
Cypress.Commands.add('fillTextBox', ({ fullName, email, currentAddress, permanentAddress } = {}) => {
  if (fullName !== undefined) {
    cy.get('#userName').clear();
    if (fullName) cy.get('#userName').type(fullName);
  }
  if (email !== undefined) {
    cy.get('#userEmail').clear();
    if (email) cy.get('#userEmail').type(email);
  }
  if (currentAddress !== undefined) {
    cy.get('#currentAddress').clear();
    if (currentAddress) cy.get('#currentAddress').type(currentAddress);
  }
  if (permanentAddress !== undefined) {
    cy.get('#permanentAddress').clear();
    if (permanentAddress) cy.get('#permanentAddress').type(permanentAddress);
  }
  cy.cleanDemoQABanners();
  cy.get('#submit').scrollIntoView().click({ force: true });
});

/**
 * Custom command to add a new record to the Web Tables component.
 */
Cypress.Commands.add('addWebTableRecord', (record) => {
  cy.get('#addNewRecordButton').scrollIntoView().click({ force: true });
  cy.get('#registration-form-modal').should('be.visible');
  cy.get('#firstName').clear().type(record.firstName);
  cy.get('#lastName').clear().type(record.lastName);
  cy.get('#userEmail').clear().type(record.userEmail);
  cy.get('#age').clear().type(record.age.toString());
  cy.get('#salary').clear().type(record.salary.toString());
  cy.get('#department').clear().type(record.department);
  cy.get('#submit').click();
  cy.get('#registration-form-modal').should('not.exist');
});
