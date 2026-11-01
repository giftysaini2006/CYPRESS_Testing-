describe('Module D: Web Tables Automation Suite', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data.webTables;
    });
  });

  beforeEach(() => {
    cy.visit('/webtables');
    cy.cleanDemoQABanners();
  });

  it('WT-001: Verify that the Web Tables page loads', () => {
    cy.url().should('include', '/webtables');
    cy.get('h1').should('contain.text', 'Web Tables');
    cy.get('#addNewRecordButton').should('be.visible');
    cy.get('#searchBox').should('be.visible');
    cy.get('table').should('be.visible');
  });

  it('WT-002: Verify that the existing table records are displayed', () => {
    cy.get('table tbody tr').should('have.length.at.least', 3);
    cy.contains('table tbody tr', 'Cierra').should('be.visible');
    cy.contains('table tbody tr', 'Alden').should('be.visible');
    cy.contains('table tbody tr', 'Kierra').should('be.visible');
  });

  it('WT-003: Verify that a new record can be added', () => {
    cy.addWebTableRecord(testData.newRecord);
    cy.contains('table tbody tr', testData.newRecord.userEmail).should('be.visible');
  });

  it('WT-004: Verify that all submitted record fields appear correctly', () => {
    cy.addWebTableRecord(testData.newRecord);
    cy.contains('table tbody tr', testData.newRecord.userEmail).within(() => {
      cy.get('td').eq(0).should('have.text', testData.newRecord.firstName);
      cy.get('td').eq(1).should('have.text', testData.newRecord.lastName);
      cy.get('td').eq(2).should('have.text', testData.newRecord.age.toString());
      cy.get('td').eq(3).should('have.text', testData.newRecord.userEmail);
      cy.get('td').eq(4).should('have.text', testData.newRecord.salary.toString());
      cy.get('td').eq(5).should('have.text', testData.newRecord.department);
    });
  });

  it('WT-005: Verify that a record can be edited', () => {
    cy.addWebTableRecord(testData.newRecord);
    cy.contains('table tbody tr', testData.newRecord.userEmail)
      .find('span[title="Edit"]')
      .click();
    cy.get('#registration-form-modal').should('be.visible');
    cy.get('#firstName').clear().type(testData.updatedRecord.firstName);
    cy.get('#submit').click();
    cy.get('#registration-form-modal').should('not.exist');
  });

  it('WT-006: Verify that edited values appear in the table', () => {
    cy.addWebTableRecord(testData.newRecord);
    cy.contains('table tbody tr', testData.newRecord.userEmail)
      .find('span[title="Edit"]')
      .click();
    cy.get('#firstName').clear().type(testData.updatedRecord.firstName);
    cy.get('#department').clear().type(testData.updatedRecord.department);
    cy.get('#submit').click();

    cy.contains('table tbody tr', testData.newRecord.userEmail).within(() => {
      cy.get('td').eq(0).should('have.text', testData.updatedRecord.firstName);
      cy.get('td').eq(5).should('have.text', testData.updatedRecord.department);
    });
  });

  it('WT-007: Verify that a record can be deleted', () => {
    cy.addWebTableRecord(testData.newRecord);
    cy.contains('table tbody tr', testData.newRecord.userEmail).should('be.visible');
    cy.contains('table tbody tr', testData.newRecord.userEmail)
      .find('span[title="Delete"]')
      .click();
    cy.contains('table tbody tr', testData.newRecord.userEmail).should('not.exist');
  });

  it('WT-008: Verify that the deleted record no longer appears', () => {
    const tempEmail = 'to.delete@test.com';
    const tempRecord = { ...testData.newRecord, userEmail: tempEmail };
    cy.addWebTableRecord(tempRecord);
    cy.contains('table tbody tr', tempEmail).should('be.visible');
    cy.contains('table tbody tr', tempEmail).find('span[title="Delete"]').click();
    cy.get('table tbody').should('not.contain', tempEmail);
  });

  it('WT-009: Verify that the search field filters table records', () => {
    cy.get('#searchBox').type('Vega');
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr').first().should('contain.text', 'Vega');
  });

  it('WT-010: Verify that searching for an existing record returns the expected result', () => {
    cy.get('#searchBox').type(testData.searchQueryExisting);
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).should('contain.text', testData.searchQueryExisting);
    });
  });

  it('WT-011: Verify that searching for a nonexistent record produces the appropriate empty-result behavior', () => {
    cy.get('#searchBox').type(testData.searchQueryNonExistent);
    cy.get('table tbody tr').should('have.length', 0);
  });

  it('WT-012: Verify that required-field validation works according to the actual form', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#submit').click();
    // Modal form remains open because required fields are empty
    cy.get('#registration-form-modal').should('be.visible');
    // HTML5 validation was-validated class applied to form
    cy.get('#userForm').should('have.class', 'was-validated');
  });

  it('WT-013: Verify that email validation behaves correctly', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type('Test');
    cy.get('#lastName').type('User');
    cy.get('#userEmail').type('not-a-valid-email');
    cy.get('#age').type('30');
    cy.get('#salary').type('50000');
    cy.get('#department').type('QA');
    cy.get('#submit').click();

    // Form remains open due to email pattern validation failure
    cy.get('#registration-form-modal').should('be.visible');
    cy.get('#userEmail:invalid').should('exist');
  });

  it('WT-014: Verify that table operations affect the intended record', () => {
    const uniqueEmail = 'target.user@demoqa.com';
    const targetRecord = { ...testData.newRecord, userEmail: uniqueEmail, firstName: 'TargetUser' };
    cy.addWebTableRecord(targetRecord);
    cy.contains('table tbody tr', uniqueEmail).should('be.visible');

    // Delete only the target record
    cy.contains('table tbody tr', uniqueEmail).find('span[title="Delete"]').click();

    // Target record should be removed, but original records remain intact
    cy.get('table tbody').should('not.contain', uniqueEmail);
    cy.contains('table tbody tr', 'Cierra').should('be.visible');
    cy.contains('table tbody tr', 'Alden').should('be.visible');
  });

  it('WT-015: Verify that record values remain consistent after editing and searching', () => {
    const searchTarget = 'Cantrell';
    cy.get('#searchBox').type(searchTarget);
    cy.contains('table tbody tr', searchTarget).within(() => {
      cy.get('td').eq(0).should('have.text', 'Alden');
      cy.get('td').eq(3).should('have.text', 'alden@example.com');
      cy.get('td').eq(4).should('have.text', '12000');
    });
  });

  it('WT-016: Verify that clearing the search field restores the appropriate record list', () => {
    cy.get('#searchBox').type('Alden');
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('#searchBox').clear();
    cy.get('table tbody tr').should('have.length.at.least', 3);
  });
});
