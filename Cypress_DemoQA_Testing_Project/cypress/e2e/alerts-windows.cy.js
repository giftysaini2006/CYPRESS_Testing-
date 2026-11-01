describe('Module E: Alerts and Windows Automation Suite', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data.alerts;
    });
  });

  describe('Alerts Interactions (/alerts)', () => {
    beforeEach(() => {
      cy.visit('/alerts');
      cy.cleanDemoQABanners();
    });

    it('AW-001: Verify that the Alerts page loads', () => {
      cy.url().should('include', '/alerts');
      cy.get('h1').should('contain.text', 'Alerts');
      cy.get('#alertButton').should('be.visible');
      cy.get('#timerAlertButton').should('be.visible');
      cy.get('#confirmButton').should('be.visible');
      cy.get('#promtButton').should('be.visible');
    });

    it('AW-002: Verify that a standard JavaScript alert is triggered', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#alertButton').click().then(() => {
        expect(alertStub).to.be.calledOnce;
      });
    });

    it('AW-003: Verify that the expected alert text is displayed', () => {
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal(testData.simpleAlertText);
      });
      cy.get('#alertButton').click();
    });

    it('AW-004: Verify that an alert can be accepted', () => {
      // Cypress automatically accepts window:alert by default
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#alertButton').click().then(() => {
        expect(alertStub).to.be.called;
      });
    });

    it('AW-005: Verify that a confirmation alert can be triggered', () => {
      const confirmStub = cy.stub().returns(true);
      cy.on('window:confirm', confirmStub);
      cy.get('#confirmButton').click().then(() => {
        expect(confirmStub).to.be.calledOnce;
      });
    });

    it('AW-006: Verify that accepting a confirmation dialog updates the page correctly', () => {
      cy.on('window:confirm', () => true);
      cy.get('#confirmButton').click();
      cy.get('#confirmResult')
        .should('be.visible')
        .and('contain.text', testData.confirmSuccessText);
    });

    it('AW-007: Verify that dismissing a confirmation dialog updates the page correctly', () => {
      cy.on('window:confirm', () => false);
      cy.get('#confirmButton').click();
      cy.get('#confirmResult')
        .should('be.visible')
        .and('contain.text', testData.confirmCancelText);
    });

    it('AW-008: Verify that a delayed alert appears after the configured delay', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('#timerAlertButton').click();
      // Wait for the 5-second delayed alert to trigger
      cy.wrap(alertStub, { timeout: 10000 }).should('have.been.calledWith', testData.timerAlertText);
    });

    it('AW-009: Verify that the prompt dialog behaves correctly if the application supports it', () => {
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns(testData.promptInput);
      });
      cy.get('#promtButton').click();
      cy.get('#promptResult')
        .should('be.visible')
        .and('contain.text', testData.promptInput);
    });

    it('AW-010: Verify that alert-related page output matches the users action', () => {
      const customName = 'Viva QA Candidate';
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns(customName);
      });
      cy.get('#promtButton').click();
      cy.get('#promptResult')
        .should('contain.text', `You entered ${customName}`);
    });
  });

  describe('Browser Windows Interactions (/browser-windows)', () => {
    beforeEach(() => {
      cy.visit('/browser-windows');
      cy.cleanDemoQABanners();
    });

    it('AW-011: Verify that the Browser Windows page loads', () => {
      cy.url().should('include', '/browser-windows');
      cy.get('h1').should('contain.text', 'Browser Windows');
      cy.get('#tabButton').should('be.visible');
      cy.get('#windowButton').should('be.visible');
      cy.get('#messageWindowButton').should('be.visible');
    });

    it('AW-012: Verify that opening a new browser tab or window is handled appropriately', () => {
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpenStub');
      });
      cy.get('#tabButton').click();
      cy.get('@windowOpenStub').should('be.called');
    });

    it('AW-013: Verify that the expected destination or page content is correct', () => {
      // Direct navigation to destination URL to verify content inside Cypress architecture
      cy.visit('/sample');
      cy.url().should('include', '/sample');
      cy.get('#sampleHeading').should('be.visible').and('contain.text', 'This is a sample page');
    });

    it('AW-014: Verify that window-opening behavior is handled without relying on unsupported Cypress commands', () => {
      cy.window().then((win) => {
        cy.stub(win, 'open').as('popupOpen');
      });
      cy.get('#windowButton').click();
      cy.get('@popupOpen').should('have.been.calledWithMatch', /\/sample/);
    });
  });
});
