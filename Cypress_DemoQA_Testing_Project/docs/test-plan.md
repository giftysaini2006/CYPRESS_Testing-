# Comprehensive Test Plan: Automated Web UI Testing Using Cypress on DemoQA

---

## 1. Introduction
This Test Plan details the end-to-end automated testing strategy for the DemoQA web platform (`https://demoqa.com`). DemoQA is an industry-standard web application designed with diverse UI components, rich client-side interactivity, dynamic forms, and asynchronous DOM manipulations. This project is prepared as an academic Software Testing and Quality Assurance semester submission demonstrating enterprise-level test automation concepts.

### Difference Between Manual and Automated Testing
* **Manual Testing**: Involves human interaction with the user interface to verify features, discover exploratory bugs, and assess visual design. While flexible and essential for usability, manual testing is repetitive, time-intensive, susceptible to human fatigue, and impractical for continuous regression cycles across release builds.
* **Automated Testing**: Utilizes software scripts (specifically Cypress) to execute predefined test cases repeatedly, precisely, and rapidly. Automated testing provides immediate regression feedback, deterministic validation of form rules and DOM states, and scalable execution across CI/CD environments.

---

## 2. Project Objectives
1. Automate functional testing of interactive web elements across six dedicated core modules.
2. Validate form inputs using both positive test cases (valid inputs, expected state persistence) and negative test cases (malformed email, boundary constraints, empty submissions).
3. Validate DOM tree structures, dynamic radio selection, table CRUD lifecycles, and JavaScript window interactions.
4. Eliminate third-party ad interference (Google Ads banners, iframes) using automated banner cleanup and request-blocking strategies.
5. Generate verifiable HTML reports and execution metrics using Mochawesome.
6. Prepare structured academic documentation for university viva evaluation.

---

## 3. Scope of Testing

### 3.1 Features Included
* **Module A: Text Box (`/text-box`)**: Form input rendering, single and multi-line address text persistence, empty input handling, live email regex validation, and output synchronization.
* **Module B: Check Box (`/checkbox`)**: Hierarchical tree expansion, nested branch selection (`rc-tree`), parent-to-child cascade selection, partial/indeterminate states, multiple selection, and deselect verification.
* **Module C: Radio Button (`/radio-button`)**: Radio button mutual exclusivity, selection state verification, disabled button validation, and dynamic feedback messaging.
* **Module D: Web Tables (`/webtables`)**: Full CRUD operations (Create new record, Read grid rows, Update/Edit modal, Delete row), real-time search filtering, and field validation.
* **Module E: Alerts, Frames & Windows (`/alerts`, `/browser-windows`)**: Standard JavaScript alerts, 5-second delayed alerts, confirmation accept/dismiss dialogs, prompt dialog stubs, and window opening interception.
* **Module F: Buttons & Links (`/buttons`, `/links`)**: Action-specific button triggers (Double click, Right click / context menu, Dynamic ID single click), and link attribute target verification.

### 3.2 Features Excluded
* Backend database persistence validation (DemoQA is an in-memory client-side React mock application; data refreshes on browser reload).
* Payment gateway and secure user authentication workflows.
* Non-functional testing (Performance profiling, load testing, penetration testing, and multi-user concurrency).
* Book Store API backend microservices testing.

---

## 4. Target Application Details
* **Application Under Test (AUT)**: DemoQA
* **URL**: `https://demoqa.com`
* **Technology Architecture**: Single Page Application (SPA) built with React and bundled via modern Vite tooling.
* **UI Component Libraries**: React Bootstrap, `rc-tree` hierarchical node component, Bootstrap modal dialogs, and HTML5 standard tables.

---

## 5. Automation Tool Selection: Why Cypress?
Cypress was selected over legacy WebDriver frameworks (such as Selenium) for the following reasons:
1. **In-Browser Execution Architecture**: Unlike Selenium, which operates outside the browser via network JSON wire protocols or W3C WebDriver endpoints, Cypress executes directly inside the browser in the exact run loop as the application.
2. **Native DOM Synchronization & Auto-Wait**: Cypress automatically waits for DOM elements to appear, become actionable, and finish animations before executing actions, drastically minimizing flaky tests without artificial `sleep()` calls.
3. **Rich Event Interception**: Built-in support for intercepting JavaScript alerts (`window:alert`), confirmation boxes (`window:confirm`), and prompt dialogs (`cy.stub(win, 'prompt')`).
4. **Network and Ad Management**: Enables blocking external advertisement trackers (`blockHosts`) to avoid test flakiness caused by third-party script crashes.

---

## 6. Testing Approach
* **Data-Driven Automation**: Centralized test data is maintained in `cypress/fixtures/testData.json` rather than hardcoding values into spec files.
* **Modular Spec Architecture**: Each functional module has an isolated specification file in `cypress/e2e/`.
* **Hooks & State Isolation**: `before()` loads fixtures; `beforeEach()` navigates to the target route and triggers `cy.cleanDemoQABanners()` to eliminate banner overlaps.
* **Custom Command Abstraction**: Reusable interactions (`cy.fillTextBox()`, `cy.addWebTableRecord()`) encapsulate complex DOM actions in `cypress/support/commands.js`.

---

## 7. Test Environment
* **Operating System**: macOS (Darwin arm64)
* **Runtime**: Node.js v24.18.0, npm 11.16.0
* **Framework**: Cypress 13.17.0
* **Test Runner / Browser**: Electron 118 (Headless) & Headed Chrome
* **Viewport Resolution**: 1366 x 768 (Desktop standard)
* **Reporting Tools**: Mochawesome v7.1.3, Mochawesome Merge v4.3.0, Mochawesome Report Generator (marge) v6.2.0

---

## 8. Entry and Exit Criteria

### 8.1 Entry Criteria
* Node.js and npm installed and verified.
* Cypress binary verified (`npx cypress verify` exits with code 0).
* Target web application (`https://demoqa.com`) reachable and returning HTTP 200 OK.
* Fixture dataset and custom commands configured.

### 8.2 Exit Criteria
* All 6 planned test modules are implemented with valid assertions.
* 100% of planned test cases executed against the live application.
* Zero unresolved test script selector errors or timing bottlenecks.
* Mochawesome HTML and JSON reports successfully generated and verified.
* Comprehensive testing documentation produced.

---

## 9. Test Data Management
Test data is stored in `cypress/fixtures/testData.json`. Key characteristics:
* Fictional, realistic names and educational email domains (`@example.edu`, `@university.edu`).
* Explicit boundary values for age (1-99), salary digits, and multiline address blocks with explicit newlines (`\n`).
* Non-persistent test records (unique emails) to prevent collisions during grid operations.
* Avoidance of real personal credentials, tokens, or confidential information.

---

## 10. Risks and Limitations
1. **Third-Party Application Stability**: DemoQA is a public resource outside local development control. Slow server responses or third-party ads can cause temporary network delays. *Mitigation*: Configured `pageLoadTimeout: 60000`, `defaultCommandTimeout: 10000`, and `blockHosts` in `cypress.config.js`.
2. **Third-Party JavaScript Errors**: AdSense code periodically throws uncaught exceptions. *Mitigation*: Registered global `Cypress.on('uncaught:exception', () => false)` in `cypress/support/e2e.js`.
3. **Single-Tab Constraint in Cypress**: Cypress operates within a single browser tab and does not support multi-tab switching (`switchToWindow`). *Mitigation*: Window-opening behaviors are tested using `cy.stub(win, 'open')` and direct route assertions without violating Cypress design principles.

---

## 11. Test Execution Strategy & Deliverables
* **Execution Strategy**: Modules can be run individually for fast debugging (`npm run test:textbox`, `npm run test:checkbox`, etc.) or collectively for regression (`npm run test:report`).
* **Deliverables**:
  1. Automated test suites (`cypress/e2e/*.cy.js`).
  2. Mochawesome HTML Report (`cypress/reports/html/report.html`).
  3. Structured Test Plan (`docs/test-plan.md`).
  4. Test Case Matrix with Execution Evidence (`docs/test-cases.md`).
  5. Test Execution Report (`docs/test-execution-report.md`).
  6. Defect Report & Analysis (`docs/defect-report.md`).
  7. Academic Viva Questions & Answers (`docs/viva-questions.md`).
  8. Project Overview & Execution Guide (`README.md`).
