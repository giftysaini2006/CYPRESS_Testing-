describe('Module F: Buttons and Links Automation Suite', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data.buttons;
    });
  });

  describe('Buttons Interactions (/buttons)', () => {
    beforeEach(() => {
      cy.visit('/buttons');
      cy.cleanDemoQABanners();
    });

    it('BL-001: Verify that the Buttons page loads', () => {
      cy.url().should('include', '/buttons');
      cy.get('h1').should('contain.text', 'Buttons');
      cy.get('#doubleClickBtn').should('be.visible');
      cy.get('#rightClickBtn').should('be.visible');
      cy.contains('button', /^Click Me$/).should('be.visible');
    });

    it('BL-002: Verify that a single click triggers the expected message', () => {
      // Dynamic button has dynamic ID, selected by exact label
      cy.contains('button', /^Click Me$/).click();
      cy.get('#dynamicClickMessage')
        .should('be.visible')
        .and('have.text', testData.dynamicClickMessage);
    });

    it('BL-003: Verify that a double click triggers the expected message', () => {
      cy.get('#doubleClickBtn').dblclick();
      cy.get('#doubleClickMessage')
        .should('be.visible')
        .and('have.text', testData.doubleClickMessage);
    });

    it('BL-004: Verify that a right-click triggers the expected message', () => {
      cy.get('#rightClickBtn').rightclick();
      cy.get('#rightClickMessage')
        .should('be.visible')
        .and('have.text', testData.rightClickMessage);
    });

    it('BL-005: Verify that each action displays the correct result', () => {
      // Perform all three distinct actions in sequence
      cy.get('#doubleClickBtn').dblclick();
      cy.get('#rightClickBtn').rightclick();
      cy.contains('button', /^Click Me$/).click();

      cy.get('#doubleClickMessage').should('have.text', testData.doubleClickMessage);
      cy.get('#rightClickMessage').should('have.text', testData.rightClickMessage);
      cy.get('#dynamicClickMessage').should('have.text', testData.dynamicClickMessage);
    });

    it('BL-006: Verify that triggering one button action does not incorrectly satisfy another actions assertion', () => {
      // Trigger only right click
      cy.get('#rightClickBtn').rightclick();
      cy.get('#rightClickMessage').should('be.visible');
      // Other messages should not exist
      cy.get('#doubleClickMessage').should('not.exist');
      cy.get('#dynamicClickMessage').should('not.exist');
    });

    it('BL-007: Verify that the buttons remain interactable under normal conditions', () => {
      cy.get('#doubleClickBtn').should('be.enabled').and('not.have.attr', 'disabled');
      cy.get('#rightClickBtn').should('be.enabled').and('not.have.attr', 'disabled');
      cy.contains('button', /^Click Me$/).should('be.enabled').and('not.have.attr', 'disabled');
    });

    it('BL-008: Verify that the result messages correspond to the appropriate controls', () => {
      cy.contains('button', /^Click Me$/).click();
      cy.get('#dynamicClickMessage')
        .should('contain.text', 'dynamic click')
        .and('not.contain.text', 'double click')
        .and('not.contain.text', 'right click');
    });
  });

  describe('Links Interactions (/links)', () => {
    beforeEach(() => {
      cy.visit('/links');
      cy.cleanDemoQABanners();
    });

    it('BL-009: Verify that the Links page loads', () => {
      cy.url().should('include', '/links');
      cy.get('h1').should('contain.text', 'Links');
      cy.get('#simpleLink').should('be.visible');
    });

    it('BL-010: Verify simple link target and URL destination without violating single-tab constraint', () => {
      cy.get('#simpleLink')
        .should('have.attr', 'href', 'https://demoqa.com')
        .and('have.attr', 'target', '_blank');

      // Verify endpoint reachability via HTTP request
      cy.request('https://demoqa.com').its('status').should('eq', 200);
    });
  });
});
