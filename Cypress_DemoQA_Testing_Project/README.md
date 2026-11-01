# Automated Web UI Testing Using Cypress on DemoQA

An academic semester project for Software Testing and Quality Assurance, providing a comprehensive, maintainable, and fully automated UI test suite targeting the interactive components of [DemoQA](https://demoqa.com).

---

## 1. Project Overview
This project demonstrates modern end-to-end (E2E) web test automation using the **Cypress** framework. It tests real-world interactive web components—including dynamic forms, hierarchical trees, radio groups, CRUD data grids, JavaScript dialogs, and multi-action buttons—against the publicly hosted DemoQA platform.

* **Target Application**: [https://demoqa.com](https://demoqa.com)
* **Framework**: Cypress v13.17.0
* **Language**: JavaScript (ES6+)
* **Runtime**: Node.js (v24.18.0)
* **Reporting**: Mochawesome HTML & JSON reporting with merged suite statistics
* **Total Automated Tests**: **72 Test Cases** (100% Passing)

---

## 2. Key Objectives
1. Automate functional testing of interactive web elements across 6 core modules.
2. Validate positive and negative input constraints, email format patterns, and boundary conditions.
3. Handle complex DOM interactions: hierarchical tree node expansion, indeterminate checkboxes, modal dialogs, and dynamic ID controls.
4. Manage JavaScript dialogs (standard alerts, 5-second delayed alerts, confirmation accept/dismiss, and prompt stubs).
5. Address real-world third-party application challenges (banner overlays, ad tracker request blocking, and unhandled 3rd-party exceptions).
6. Generate professional, interactive HTML execution reports for university evaluation.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Automation Tool** | Cypress v13.17.0 | Fast, in-browser E2E test runner and assertion framework |
| **Language** | JavaScript (ES6+) | Clean, standard modular test scripts |
| **Runtime Environment** | Node.js v24.18.0 & npm 11.16.0 | Package execution and dependency management |
| **Report Generator** | Mochawesome v7.1.3 & marge v6.2.0 | Formats test results into interactive HTML dashboards |
| **Reporting Merger** | mochawesome-merge v4.3.0 | Merges multi-spec JSON artifacts into a unified report |
| **Target Application** | DemoQA (React + Vite SPA) | Application under test (interactive UI elements) |

---

## 4. Test Modules and Scope

The project implements six isolated, executable test specifications in `cypress/e2e/`:

| Module | Specification File | Target Page | Test Count | Key Scenarios Tested |
| :--- | :--- | :--- | :---: | :--- |
| **Module A** | `textbox.cy.js` | `/text-box` | 12 | Form inputs, multiline addresses, invalid email validation, empty submission. |
| **Module B** | `checkbox.cy.js` | `/checkbox` | 12 | `rc-tree` expansion, nested selection, parent cascade, indeterminate states, deselect. |
| **Module C** | `radiobutton.cy.js` | `/radio-button` | 8 | Yes / Impressive selection, disabled No option verification, output messaging. |
| **Module D** | `webtables.cy.js` | `/webtables` | 16 | Add record, Edit record, Delete record, real-time Search, clear filter, validation. |
| **Module E** | `alerts-windows.cy.js` | `/alerts`, `/browser-windows` | 14 | Alerts, timer alert (5s), confirm accept/cancel, prompt stubbing, window.open stub. |
| **Module F** | `buttons-links.cy.js` | `/buttons`, `/links` | 10 | Double click, right click, dynamic ID single click, action isolation, link attributes. |

---

## 5. Project Directory Structure

```
Cypress_DemoQA_Testing_Project/
├── .gitignore                      # Git ignore patterns (node_modules, reports, logs)
├── cypress.config.js               # Cypress configuration (baseUrl, timeouts, blockHosts)
├── package.json                    # Project metadata, dependencies, and test execution scripts
├── README.md                       # Comprehensive project guide and instructions
├── cypress/
│   ├── e2e/                        # Automated test specifications (6 modules)
│   │   ├── textbox.cy.js           # Module A: Text Box (TB-001 to TB-012)
│   │   ├── checkbox.cy.js          # Module B: Check Box (CB-001 to CB-012)
│   │   ├── radiobutton.cy.js       # Module C: Radio Button (RB-001 to RB-008)
│   │   ├── webtables.cy.js         # Module D: Web Tables (WT-001 to WT-016)
│   │   ├── alerts-windows.cy.js    # Module E: Alerts & Windows (AW-001 to AW-014)
│   │   └── buttons-links.cy.js     # Module F: Buttons & Links (BL-001 to BL-010)
│   ├── fixtures/
│   │   └── testData.json           # Centralized test data for all modules
│   ├── support/
│   │   ├── commands.js             # Custom reusable Cypress commands
│   │   └── e2e.js                  # Global configuration & uncaught exception handler
│   └── reports/                    # Generated Mochawesome reports (HTML and JSON)
│       ├── html/
│       │   └── report.html         # Interactive standalone HTML execution dashboard
│       └── mochawesome/
│           └── merged-report.json  # Merged multi-spec execution JSON
└── docs/                           # Formal university testing documentation
    ├── test-plan.md                # Comprehensive software test plan
    ├── test-cases.md               # 72 detailed test cases with execution evidence
    ├── test-execution-report.md    # Formal test execution metrics & environment breakdown
    ├── defect-report.md            # Defect evaluation template & quality assessment
    └── viva-questions.md           # 38 questions & answers for viva preparation
```

---

## 6. Prerequisites and Installation

### Prerequisites
* **Node.js**: v18.0.0 or higher (v24.18.0 recommended)
* **npm**: v9.0.0 or higher
* Internet connectivity to reach [https://demoqa.com](https://demoqa.com)

### Installation
1. Open a terminal and navigate to the project directory:
   ```bash
   cd Cypress_DemoQA_Testing_Project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Verify the Cypress installation:
   ```bash
   npx cypress verify
   ```

---

## 7. Execution Commands

### Interactive Cypress Test Runner (GUI Mode)
To launch the interactive Cypress desktop application for step-by-step visual debugging:
```bash
npm run cypress:open
```

### Full Headless Regression Execution
To execute all 72 test cases in the headless Electron browser:
```bash
npm test
```

### Headed Browser Execution
To watch the tests execute live inside an automated browser window:
```bash
npm run test:headed
```

### Module-Specific Execution Commands
To execute any individual module independently:
```bash
npm run test:textbox     # Run Module A: Text Box (12 tests)
npm run test:checkbox    # Run Module B: Check Box (12 tests)
npm run test:radio       # Run Module C: Radio Button (8 tests)
npm run test:tables      # Run Module D: Web Tables (16 tests)
npm run test:alerts      # Run Module E: Alerts & Windows (14 tests)
npm run test:buttons     # Run Module F: Buttons & Links (10 tests)
```

### Mochawesome HTML Report Generation
To run the complete suite, compile all spec results, and generate the standalone HTML report:
```bash
npm run test:report
```

---

## 8. Viewing Test Reports
After executing `npm run test:report`, open the generated HTML report in your browser:
* **macOS**:
  ```bash
  open cypress/reports/html/report.html
  ```
* **Linux**:
  ```bash
  xdg-open cypress/reports/html/report.html
  ```
* **Windows**:
  ```cmd
  start cypress/reports/html/report.html
  ```

---

## 9. Academic Documentation Reference

All formal documentation files are stored under the `docs/` directory:
1. [`docs/test-plan.md`](docs/test-plan.md): Scope, automation strategy, entry/exit criteria, and tool comparison.
2. [`docs/test-cases.md`](docs/test-cases.md): Complete matrix of all 72 test cases with actual execution evidence.
3. [`docs/test-execution-report.md`](docs/test-execution-report.md): Execution metrics, environment parameters, and pass rates.
4. [`docs/defect-report.md`](docs/defect-report.md): Defect reporting template, quality assessment, and error classification.
5. [`docs/viva-questions.md`](docs/viva-questions.md): 38 curated viva questions covering testing concepts and Cypress internals.

---

## 10. Known Environmental Limitations
1. **Third-Party Application**: DemoQA is a public, third-party mock application. Test data created during table tests resets upon page refresh because the application stores data only in-memory in React client state.
2. **Third-Party Advertisements**: Fixed Google AdSense banners (`#fixedban`) are blocked and programmatically cleaned via `cy.cleanDemoQABanners()` to avoid element click interception.
3. **Single-Tab Constraint**: Cypress runs directly inside a single browser tab and intentionally does not support multi-tab switching commands. External link behaviors are verified via attribute inspection and `window.open` stubs.

---

## 11. Academic Project Details & Disclaimer

* **Project Title**: Automated Web UI Testing Using Cypress on DemoQA
* **Course / Subject**: Software Testing & Quality Assurance (STQA)
* **Student Name**: [Student Name Placeholder]
* **Student Roll No / ID**: [Roll Number Placeholder]
* **Faculty Advisor / Instructor**: [Faculty Name Placeholder]
* **University / College**: [University Name Placeholder]
* **Submission Date**: November 2026

*Disclaimer: This project was developed strictly for academic, educational, and evaluation purposes using the publicly accessible demo site at `https://demoqa.com`. No proprietary or sensitive systems were altered.*
