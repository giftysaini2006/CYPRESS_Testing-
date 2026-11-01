describe('Module B: Check Box Automation Suite', () => {
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data.checkBox;
    });
  });

  beforeEach(() => {
    cy.visit('/checkbox');
    cy.cleanDemoQABanners();
  });

  it('CB-001: Verify that the Checkbox page loads', () => {
    cy.url().should('include', '/checkbox');
    cy.get('h1').should('contain.text', 'Check Box');
    cy.get('.check-box-tree-wrapper').should('be.visible');
    cy.get('.rc-tree').should('be.visible');
  });

  it('CB-002: Verify that the checkbox tree can be expanded', () => {
    // Click switcher on root Home node
    cy.get('.rc-tree-switcher').first().click();
    // Child nodes Desktop, Documents, Downloads should become visible
    cy.contains('.rc-tree-title', 'Desktop').should('be.visible');
    cy.contains('.rc-tree-title', 'Documents').should('be.visible');
    cy.contains('.rc-tree-title', 'Downloads').should('be.visible');
  });

  it('CB-003: Verify that nested checkbox options can be selected', () => {
    // Expand Home
    cy.get('.rc-tree-switcher').first().click();
    // Expand Desktop
    cy.contains('.rc-tree-treenode', 'Desktop').find('.rc-tree-switcher').click();
    // Select Notes checkbox
    cy.get('.rc-tree-checkbox[aria-label="Select Notes"]').click();
    cy.get('.rc-tree-checkbox[aria-label="Select Notes"]').should('have.class', 'rc-tree-checkbox-checked');
    cy.get('#result').should('be.visible').and('contain.text', 'notes');
  });

  it('CB-004: Verify that selecting a parent checkbox selects its descendants as expected', () => {
    // Expand Home
    cy.get('.rc-tree-switcher').first().click();
    // Select Desktop parent checkbox
    cy.get('.rc-tree-checkbox[aria-label="Select Desktop"]').click();
    // Verify result contains desktop, notes, commands
    cy.get('#result').should('be.visible')
      .and('contain.text', 'desktop')
      .and('contain.text', 'notes')
      .and('contain.text', 'commands');
  });

  it('CB-005: Verify that selecting a child checkbox updates its parent state appropriately', () => {
    // Expand Home and Desktop
    cy.get('.rc-tree-switcher').first().click();
    cy.contains('.rc-tree-treenode', 'Desktop').find('.rc-tree-switcher').click();
    // Select only Notes
    cy.get('.rc-tree-checkbox[aria-label="Select Notes"]').click();
    // Desktop parent should show indeterminate / partial check state
    cy.get('.rc-tree-checkbox[aria-label="Select Desktop"]')
      .should('have.class', 'rc-tree-checkbox-indeterminate');
    // Home root should also show indeterminate state
    cy.get('.rc-tree-checkbox[aria-label="Select Home"]')
      .should('have.class', 'rc-tree-checkbox-indeterminate');
  });

  it('CB-006: Verify that selected checkbox results are displayed', () => {
    cy.get('.rc-tree-switcher').first().click();
    cy.get('.rc-tree-checkbox[aria-label="Select Downloads"]').click();
    cy.get('#result').should('be.visible');
    cy.get('#result .text-success').should('contain.text', 'downloads');
  });

  it('CB-007: Verify that an individual checkbox can be deselected', () => {
    // Select Home
    cy.get('.rc-tree-checkbox[aria-label="Select Home"]').click();
    cy.get('#result').should('be.visible');
    // Deselect Home
    cy.get('.rc-tree-checkbox[aria-label="Select Home"]').click();
    // Result message should no longer exist
    cy.get('#result').should('not.exist');
  });

  it('CB-008: Verify that selecting multiple checkboxes displays the correct result set', () => {
    // Expand Home and Desktop
    cy.get('.rc-tree-switcher').first().click();
    cy.contains('.rc-tree-treenode', 'Desktop').find('.rc-tree-switcher').click();

    // Select both Notes and Commands
    cy.get('.rc-tree-checkbox[aria-label="Select Notes"]').click();
    cy.get('.rc-tree-checkbox[aria-label="Select Commands"]').click();

    cy.get('#result').should('be.visible');
    cy.get('#result').should('contain.text', 'notes').and('contain.text', 'commands');
  });

  it('CB-009: Verify that the Expand All control expands the checkbox tree', () => {
    // Expand Home branch
    cy.get('.rc-tree-switcher_close').first().click();
    // Expand Desktop branch
    cy.contains('.rc-tree-treenode', 'Desktop').find('.rc-tree-switcher_close').click();
    // Verify nested child node titles are visible
    cy.contains('.rc-tree-title', 'Notes').should('be.visible');
    cy.contains('.rc-tree-title', 'Commands').should('be.visible');
  });

  it('CB-010: Verify that the Collapse All control collapses the checkbox tree', () => {
    // Ensure Home is expanded first
    cy.get('.rc-tree-switcher_close').first().click();
    cy.contains('.rc-tree-title', 'Desktop').should('be.visible');
    // Collapse Home switcher
    cy.get('.rc-tree-switcher_open').first().click();
    // Child nodes should be collapsed and removed from the active tree view
    cy.contains('.rc-tree-title', 'Desktop').should('not.exist');
    cy.contains('.rc-tree-title', 'Home').should('be.visible');
  });

  it('CB-011: Verify that checkbox selection states are accurate', () => {
    // Expand Home and Desktop
    cy.get('.rc-tree-switcher').first().click();
    cy.contains('.rc-tree-treenode', 'Desktop').find('.rc-tree-switcher').click();
    // Check Commands
    cy.get('.rc-tree-checkbox[aria-label="Select Commands"]').click();
    // Verify Commands is checked while Notes is unchecked
    cy.get('.rc-tree-checkbox[aria-label="Select Commands"]').should('have.class', 'rc-tree-checkbox-checked');
    cy.get('.rc-tree-checkbox[aria-label="Select Notes"]').should('not.have.class', 'rc-tree-checkbox-checked');
  });

  it('CB-012: Verify that the selected values correspond to the actual selections', () => {
    // Expand Home
    cy.get('.rc-tree-switcher').first().click();
    // Select Desktop parent
    cy.get('.rc-tree-checkbox[aria-label="Select Desktop"]').click();
    // Inspect displayed items in result
    cy.get('#result span.text-success').then(($items) => {
      const texts = [...$items].map((el) => el.innerText.trim());
      expect(texts).to.include('desktop');
      expect(texts).to.include('notes');
      expect(texts).to.include('commands');
      expect(texts).to.not.include('documents');
    });
  });
});
