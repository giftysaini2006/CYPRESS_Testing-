describe('Module C: Radio Button Automation Suite', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data.radioButton;
    });
  });

  beforeEach(() => {
    cy.visit('/radio-button');
    cy.cleanDemoQABanners();
  });

  it('RB-001: Verify that the Radio Button page loads', () => {
    cy.url().should('include', '/radio-button');
    cy.get('h1').should('contain.text', 'Radio Button');
    cy.contains('Do you like the site?').should('be.visible');
    cy.get('label[for="yesRadio"]').should('be.visible');
    cy.get('label[for="impressiveRadio"]').should('be.visible');
    cy.get('label[for="noRadio"]').should('be.visible');
  });

  it('RB-002: Verify that the Yes option can be selected', () => {
    cy.get('label[for="yesRadio"]').click();
    cy.get('#yesRadio').should('be.checked');
    cy.get('.text-success').should('have.text', 'Yes');
  });

  it('RB-003: Verify that the Impressive option can be selected', () => {
    cy.get('label[for="impressiveRadio"]').click();
    cy.get('#impressiveRadio').should('be.checked');
    cy.get('.text-success').should('have.text', 'Impressive');
  });

  it('RB-004: Verify that selecting an option displays the correct result message', () => {
    cy.get('label[for="yesRadio"]').click();
    cy.get('p.mt-3')
      .should('be.visible')
      .and('contain.text', 'You have selected')
      .and('contain.text', 'Yes');
  });

  it('RB-005: Verify that the No option is disabled if it is disabled in the actual application', () => {
    cy.get('#noRadio').should('be.disabled');
    cy.get('label[for="noRadio"]').should('have.class', 'disabled');
  });

  it('RB-006: Verify that a disabled radio option cannot be selected', () => {
    // Attempt clicking disabled label
    cy.get('label[for="noRadio"]').click();
    cy.get('#noRadio').should('not.be.checked');
    // Result message should not appear
    cy.get('.text-success').should('not.exist');
  });

  it('RB-007: Verify that the result message corresponds to the selected option', () => {
    cy.get('label[for="impressiveRadio"]').click();
    cy.get('.text-success').should('have.text', testData.impressive.expectedText);
    cy.get('#yesRadio').should('not.be.checked');
  });

  it('RB-008: Verify that changing the selection updates the displayed result', () => {
    // Select Yes first
    cy.get('label[for="yesRadio"]').click();
    cy.get('#yesRadio').should('be.checked');
    cy.get('.text-success').should('have.text', 'Yes');

    // Switch selection to Impressive
    cy.get('label[for="impressiveRadio"]').click();
    cy.get('#impressiveRadio').should('be.checked');
    cy.get('#yesRadio').should('not.be.checked');
    cy.get('.text-success').should('have.text', 'Impressive');
  });
});
