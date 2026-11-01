describe('Module A: Text Box Automation Suite', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data.textBox;
    });
  });

  beforeEach(() => {
    cy.visit('/text-box');
    cy.cleanDemoQABanners();
  });

  it('TB-001: Verify that the Text Box page loads successfully', () => {
    cy.url().should('include', '/text-box');
    cy.get('h1').should('contain.text', 'Text Box');
    cy.get('#userForm').should('be.visible');
  });

  it('TB-002: Verify that a user can enter a full name', () => {
    cy.get('#userName')
      .should('be.visible')
      .type(testData.validUser.fullName)
      .should('have.value', testData.validUser.fullName);
  });

  it('TB-003: Verify that a user can enter an email address', () => {
    cy.get('#userEmail')
      .should('be.visible')
      .type(testData.validUser.email)
      .should('have.value', testData.validUser.email);
  });

  it('TB-004: Verify that a user can enter a current address', () => {
    cy.get('#currentAddress')
      .should('be.visible')
      .type(testData.validUser.currentAddress)
      .should('have.value', testData.validUser.currentAddress);
  });

  it('TB-005: Verify that a user can enter a permanent address', () => {
    cy.get('#permanentAddress')
      .should('be.visible')
      .type(testData.validUser.permanentAddress)
      .should('have.value', testData.validUser.permanentAddress);
  });

  it('TB-006: Verify that submitting valid information displays the submitted data', () => {
    cy.fillTextBox(testData.validUser);
    cy.get('#output').should('be.visible');
    cy.get('#output #name').should('be.visible');
    cy.get('#output #email').should('be.visible');
    cy.get('#output p#currentAddress').should('be.visible');
    cy.get('#output p#permanentAddress').should('be.visible');
  });

  it('TB-007: Verify that submitted values match the values entered into the form', () => {
    cy.fillTextBox(testData.validUser);
    cy.get('#output #name').should('contain.text', testData.validUser.fullName);
    cy.get('#output #email').should('contain.text', testData.validUser.email);
    cy.get('#output p#currentAddress').should('contain.text', testData.validUser.currentAddress);
    cy.get('#output p#permanentAddress').should('contain.text', testData.validUser.permanentAddress);
  });

  it('TB-008: Verify that the form handles empty input appropriately', () => {
    cy.cleanDemoQABanners();
    cy.get('#submit').scrollIntoView().click({ force: true });
    // When submitting empty fields, no output block is populated with values
    cy.get('#output #name').should('not.exist');
    cy.get('#output #email').should('not.exist');
  });

  it('TB-009: Verify that an invalid email address is handled according to the applications actual validation behavior', () => {
    cy.fillTextBox(testData.invalidEmailUser);
    // DemoQA applies field-error class to #userEmail on invalid submission
    cy.get('#userEmail').should('have.class', 'field-error');
    // Output should not render or should not contain an email confirmation
    cy.get('#output #email').should('not.exist');
  });

  it('TB-010: Verify that fields remain independently editable', () => {
    cy.get('#userName').type('Initial Name');
    cy.get('#userEmail').type('initial@example.com');
    // Modify only user name
    cy.get('#userName').clear().type('Updated Name');
    cy.get('#userName').should('have.value', 'Updated Name');
    cy.get('#userEmail').should('have.value', 'initial@example.com');
  });

  it('TB-011: Verify that multiline address fields preserve the entered text', () => {
    const multilineText = 'First Line\nSecond Line\nThird Line';
    cy.get('#currentAddress').type(multilineText);
    cy.get('#currentAddress').should('have.value', multilineText);
  });

  it('TB-012: Verify that submission output is displayed correctly', () => {
    cy.fillTextBox(testData.validUser);
    cy.get('#output').within(() => {
      cy.get('#name').should('contain.text', 'Name:');
      cy.get('#email').should('contain.text', 'Email:');
      cy.get('#currentAddress').should('contain.text', 'Current Address :');
      cy.get('#permanentAddress').should('contain.text', 'Permananet Address :');
    });
  });
});
