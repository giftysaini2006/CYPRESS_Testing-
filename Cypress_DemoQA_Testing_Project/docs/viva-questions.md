# Viva Preparation Guide: Software Testing & Cypress Automation

This comprehensive question-and-answer guide is tailored for undergraduate viva examinations in Software Testing, Quality Assurance, and Web Test Automation. Every concept is accompanied by real-world examples drawn directly from this DemoQA automation project.

---

### Q1: What is the primary difference between Software Verification and Software Validation?
* **Verification**: Evaluates work products of a development phase to ensure they meet specified requirements ("Are we building the product right?"). Involves code reviews, inspections, and static analysis without executing code.
* **Validation**: Evaluates the actual software application at the end of or during development to determine if it satisfies specified business and user needs ("Are we building the right product?"). In this project, running Cypress automated UI tests against live DemoQA pages is an act of **Validation**.

---

### Q2: What is Functional Testing, and how does it apply to this project?
* **Answer**: Functional testing validates what the system does by testing software features against functional requirements or specifications, ignoring internal code structure (black-box approach).
* **Project Example**: Testing that entering valid name, email, and addresses into `/text-box` and clicking Submit correctly renders the submitted output in `#output`.

---

### Q3: What is Negative Testing, and why is it essential?
* **Answer**: Negative testing verifies how the application responds to invalid, unexpected, or out-of-boundary inputs. It ensures software fails gracefully with proper feedback rather than crashing or causing data corruption.
* **Project Example**: In `textbox.cy.js` (TB-009), entering `invalid-email-format-without-at` into `#userEmail` causes the input to receive the `.field-error` CSS class and suppresses output generation.

---

### Q4: What is Regression Testing?
* **Answer**: Regression testing is re-running previously created functional tests to verify that recent code changes, bug fixes, or environmental upgrades have not broken existing, working features.
* **Project Example**: Running `npm run test:report` executes all 72 test cases across all six modules to ensure that updating table logic in Module D didn't inadvertently disrupt text box assertions in Module A.

---

### Q5: What is the difference between a Test Scenario and a Test Case?
* **Test Scenario**: A high-level description of what functionality is to be tested (e.g., "Verify Web Table search capability").
* **Test Case**: A detailed, step-by-step procedure with specific preconditions, test inputs, execution steps, expected outcomes, and actual results (e.g., WT-010: "Type 'Cierra' into `#searchBox` and assert every visible `table tbody tr` contains 'Cierra'").

---

### Q6: What is Test Data Management, and why are fixtures used?
* **Answer**: Test data management refers to systematically creating, maintaining, and isolating input data required for test execution. Hardcoding test data directly into test scripts makes tests brittle and difficult to maintain.
* **Project Example**: Storing user information, table records, and expected messages inside `cypress/fixtures/testData.json` allows multiple specs to access centralized, reusable data via `cy.fixture('testData')`.

---

### Q7: How does Cypress architecture differ from Selenium WebDriver?
* **Selenium WebDriver**: Operates *out-of-process*. Test code sends HTTP JSON Wire / W3C commands to a browser driver (chromedriver, geckodriver), which translates them into browser automation commands over a network socket.
* **Cypress**: Operates *in-process*. Cypress executes tests directly inside the browser in the exact same event run-loop as the application under test. This allows direct synchronous access to DOM elements, `window`, `document`, and browser timers.

---

### Q8: What are Cypress Commands, and are they synchronous or asynchronous?
* **Answer**: Cypress commands (e.g., `cy.get()`, `cy.click()`, `cy.type()`) are asynchronous. When called, they do not immediately execute in JavaScript; instead, they are queued and executed sequentially by Cypress's internal command queue runner.

---

### Q9: What are Cypress Assertions, and how do BDD and TDD styles differ?
* **Answer**: Assertions define the expected state of the DOM or application. Cypress integrates Chai, Sinon, and jQuery assertions.
  - **BDD style (`should`, `expect`)**: Readable, natural phrasing (e.g., `cy.get('#userName').should('be.visible')`).
  - **TDD style (`assert`)**: Classical assertion functions (e.g., `assert.equal(val1, val2)`).
* In this project, BDD chaining (`should('be.visible').and('contain.text', '...')`) is predominantly used.

---

### Q10: How does Cypress Automatic Waiting (Auto-Wait) work?
* **Answer**: Unlike Selenium, which requires manual explicit waits (`WebDriverWait`), Cypress automatically polls the DOM and waits up to `defaultCommandTimeout` (configured to 10,000ms in this project) for elements to exist, become visible, stop animating, and become actionable before attempting actions like `.click()` or `.type()`.

---

### Q11: Why is using arbitrary `cy.wait(5000)` considered a testing anti-pattern?
* **Answer**: Hardcoded `cy.wait(milliseconds)` causes tests to either wait longer than necessary (slowing down test runs) or fail when network conditions temporarily exceed the hardcoded duration. It is far better to wait on dynamic assertions or network requests (e.g., `cy.get(selector).should('be.visible')`).

---

### Q12: What is the purpose of `before()` and `beforeEach()` hooks in Cypress?
* **`before()`**: Executes once before all tests in a `describe()` block. Ideal for loading static fixtures (e.g., `cy.fixture('testData').then(...)`).
* **`beforeEach()`**: Executes before *every individual* `it()` test case. Essential for establishing test isolation (e.g., navigating to the URL with `cy.visit()` and executing `cy.cleanDemoQABanners()`).

---

### Q13: What is Test Isolation, and why is it important?
* **Answer**: Test isolation means every test can run independently of all others in any order. If Test A fails, Test B should still execute cleanly without being corrupted by leftover state from Test A.
* **Project Example**: In `webtables.cy.js`, tests create their own temporary record (e.g., `to.delete@test.com`) before deleting it, rather than assuming a previous test created it.

---

### Q14: How does Cypress handle DOM selectors? What selector strategy is preferred?
* **Answer**: Cypress uses CSS selectors via jQuery engine (`cy.get()`). The hierarchy of best selector practices:
  1. Dedicated testing attributes: `[data-cy]`, `[data-test]` (most resilient).
  2. Semantic IDs: `#userName`, `#submit`.
  3. Stable unique classes or combined tags: `table tbody tr`.
  4. Text-based matching: `cy.contains('button', /^Click Me$/)`.
  * Position-based brittle selectors (like `/html/body/div[2]/div[1]`) should always be avoided.

---

### Q15: How do you handle elements with dynamic IDs in Cypress?
* **Answer**: Some web frameworks generate random or dynamic IDs on every render (e.g., DemoQA's single-click button with ID like `#T98zp`).
* **Project Solution**: In `buttons-links.cy.js` (BL-002), we locate the button using an exact regular expression text match: `cy.contains('button', /^Click Me$/).click()`.

---

### Q16: What are Cypress Custom Commands, and where are they registered?
* **Answer**: Custom commands encapsulate repetitive interaction logic into clean, reusable functions added to the `cy` object. They are defined in `cypress/support/commands.js` using `Cypress.Commands.add()`.
* **Project Example**: `cy.fillTextBox(formData)` and `cy.addWebTableRecord(record)`.

---

### Q17: How did this project handle third-party advertisements and banner overlays on DemoQA?
* **Answer**: Three coordinated techniques were implemented:
  1. `blockHosts`: In `cypress.config.js`, blocked Google AdSense, DoubleClick, and analytics domain requests.
  2. `uncaught:exception` handler: In `cypress/support/e2e.js`, returned `false` to prevent ad script errors from failing tests.
  3. Custom command `cy.cleanDemoQABanners()`: Invoked `.remove()` on `#fixedban` and `#Ad.Plus` DOM nodes before clicking.

---

### Q18: How does Cypress handle JavaScript standard alerts (`window:alert`)?
* **Answer**: Cypress automatically accepts standard alerts so they never freeze browser execution. To verify the alert was triggered with expected text, we listen to the `window:alert` event:
```javascript
cy.on('window:alert', (text) => {
  expect(text).to.equal('You clicked a button');
});
```

---

### Q19: How do you handle and verify JavaScript confirmation dialogs (`window:confirm`)?
* **To Accept**: Cypress auto-accepts by default (returns `true`), or explicitly:
  `cy.on('window:confirm', () => true);`
* **To Dismiss / Cancel**: Return `false` in the event callback:
  `cy.on('window:confirm', () => false);`
* **Project Example**: In `alerts-windows.cy.js`, AW-006 confirms that accepting displays `#confirmResult` with "You selected Ok", while AW-007 confirms that dismissing displays "You selected Cancel".

---

### Q20: How do you test a JavaScript `window.prompt()` dialog in Cypress?
* **Answer**: Because `window.prompt` requires user text input, in Cypress we stub the browser's window prompt function before triggering the button:
```javascript
cy.window().then((win) => {
  cy.stub(win, 'prompt').returns('Automated Cypress Tester');
});
cy.get('#promtButton').click();
cy.get('#promptResult').should('contain.text', 'Automated Cypress Tester');
```

---

### Q21: What is the single-tab limitation in Cypress, and how is it addressed?
* **Answer**: Cypress runs inside the browser and controls only one active window/tab; it does not support commands like Selenium's `driver.switchTo().window()`.
* **Solutions**:
  1. Inspect the anchor element's attributes: `cy.get('#simpleLink').should('have.attr', 'target', '_blank').and('have.attr', 'href', '...')`.
  2. Remove `target="_blank"` using `invoke('removeAttr', 'target')` to force navigation in the same tab.
  3. For `window.open()`, stub the method using `cy.stub(win, 'open')` and verify the requested destination URL.

---

### Q22: What is the difference between headless and headed test execution?
* **Headed (`--headed`)**: Launches the visible browser UI window. Ideal during test development and visual debugging.
* **Headless (default `cypress run`)**: Executes tests in a background headless browser instance without rendering a graphical window. It uses less memory and CPU, making it standard for automated CI/CD build pipelines.

---

### Q23: How are automated test reports generated in this project?
* **Answer**: Using Mochawesome:
  1. `cypress run --reporter mochawesome` outputs individual JSON results for each spec under `cypress/reports/mochawesome/`.
  2. `npx mochawesome-merge` combines all spec JSON files into `merged-report.json`.
  3. `npx marge` compiles the merged JSON into a responsive, standalone HTML report at `cypress/reports/html/report.html`.

---

### Q24: What is a Flaky Test, and how do we prevent test flakiness?
* **Answer**: A flaky test is one that exhibits both passing and failing results across different runs with identical code and environment.
* **Prevention Strategies**:
  - Rely on Cypress's automatic retry-and-assert mechanism rather than hardcoded sleeps.
  - Ensure strict test isolation with fresh state in `beforeEach()`.
  - Block third-party network ads that introduce variable network latency.
  - Wait for modal dialogs to finish closing (`should('not.exist')`) before initiating subsequent actions.

---

### Q25: What is the Defect Life Cycle?
* **Answer**: The stages a software defect moves through from initial discovery to closure:
  1. **New**: Bug identified and logged by QA.
  2. **Assigned**: Reviewed by lead and assigned to a developer.
  3. **Open**: Developer actively analyzes the defect.
  4. **Fixed**: Developer fixes code and deploys update.
  5. **Retest**: QA verifies fix using the original test case.
  6. **Closed**: Fix confirmed, ticket resolved.
  7. *(Optional: Reopened if bug persists; Rejected if invalid).*

---

### Q26: What is the difference between Defect Severity and Defect Priority?
* **Severity**: The technical impact of the defect on system operation (Critical, Major, Medium, Low).
  - *Example*: System crash or data loss is Critical severity.
* **Priority**: The business urgency with which the defect must be resolved (P1-Immediate to P4-Low).
  - *Example*: A company logo typo on the homepage is Low severity technically, but High priority due to brand reputation.

---

### Q27: How does testing interactive Checkbox trees work in modern React apps?
* **Answer**: Modern libraries like `rc-tree` use custom SVG or span elements (`.rc-tree-checkbox`) rather than traditional `<input type="checkbox">` elements.
* **Testing Techniques**:
  - Click tree expander switchers (`.rc-tree-switcher`) to render children into the DOM.
  - Verify parent cascade selection and intermediate/partial checked states (`.rc-tree-checkbox-indeterminate`).
  - Assert synchronization between selected node states and displayed summary blocks (`#result`).

---

### Q28: How do you verify dynamic Table CRUD operations in Cypress?
* **Answer**:
  - **Create**: Click Add, complete form modal, submit, assert row exists (`cy.contains('table tbody tr', email).should('be.visible')`).
  - **Read**: Verify cell values across rows and columns.
  - **Update**: Click edit icon, alter fields, submit, assert modified cell displays new value.
  - **Delete**: Click delete icon, assert row no longer exists (`cy.get('table tbody').should('not.contain', email)`).

---

### Q29: How does Table Search Filtering work, and what edge cases should be tested?
* **Answer**: The search field filters rows dynamically in memory based on matching text across any column.
* **Edge Cases Tested**:
  1. Search for existing partial name (returns filtered matching rows).
  2. Search for nonexistent alphanumeric string (returns 0 rows or empty table state).
  3. Clear the search field (verifies all original records are fully restored).

---

### Q30: How does Cypress support screenshots on failure?
* **Answer**: In `cypress.config.js`, setting `screenshotOnRunFailure: true` instructs Cypress to automatically capture and timestamp a PNG screenshot of the browser viewport whenever an assertion fails, saving it to `cypress/screenshots/`.

---

### Q31: What is Test Coverage?
* **Answer**: A quantitative metric that measures the amount of testing performed on a system. It can refer to requirement coverage (e.g., verifying all 6 specified DemoQA modules) or code coverage (percentage of application statements, branches, and functions executed during testing).

---

### Q32: What are the risks and limitations of automating tests against a third-party website?
* **Answer**:
  1. The target website's DOM structure can change at any time without notification.
  2. Server outages or third-party ads can degrade test performance.
  3. No access to the backend database to seed or tear down data via direct API calls.
* **Mitigation**: Using resilient, role-based selectors, blocking ad networks, and designing self-contained tests that handle their own setup.

---

### Q33: How does `.should()` differ from `.then()` in Cypress?
* **`.should()`**: An assertion command that retries continuously until the condition passes or timeout is reached.
* **`.then()`**: A control command that yields the wrapped DOM element or subject as a jQuery object for custom JavaScript operations, executing once without automatic retry.

---

### Q34: How do you test mouse actions like Double Click and Right Click in Cypress?
* **Answer**:
  - Double Click: `cy.get('#doubleClickBtn').dblclick();`
  - Right Click (Context Menu): `cy.get('#rightClickBtn').rightclick();`
  - Normal Click: `cy.get('button').click();`

---

### Q35: What is the purpose of `.cleanDemoQABanners()` in this project?
* **Answer**: It is a custom Cypress command designed to inspect the document body and remove floating Google AdSense banners (`#fixedban`) and advertisement iframes that frequently overlap buttons on DemoQA pages, preventing click interception errors.

---

### Q36: Why should we use Fixtures instead of hardcoding data inside test files?
* **Answer**:
  - **Reusability**: Multiple test suites can reference the same test dataset.
  - **Maintainability**: When test data needs updating, change it in one JSON file rather than modifying dozens of test scripts.
  - **Separation of Concerns**: Test logic is kept cleanly separated from test inputs.

---

### Q37: How did you verify that clearing the search box restores all records in Web Tables?
* **Answer**: In `webtables.cy.js` (WT-016), we first searched for 'Alden', which filtered the table to exactly 1 row (`have.length', 1`). Then we cleared the search box with `cy.get('#searchBox').clear()` and asserted that `table tbody tr` immediately restored to at least 3 rows (`have.length.at.least', 3`).

---

### Q38: How do you summarize the outcome of this project for an examiner?
* **Answer**: "We built an enterprise-standard Cypress test automation suite covering 72 distinct test cases across six core modules on DemoQA. The framework uses a clean page-object-aligned modular architecture, custom support commands, centralized JSON test fixtures, ad-filtering network policies, and Mochawesome HTML reporting. All 72 test cases pass deterministically in 3 minutes and 19 seconds with a 100% pass rate."
