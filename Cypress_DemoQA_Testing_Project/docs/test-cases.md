# Comprehensive Test Cases: Automated Web UI Testing on DemoQA

---

### Execution Summary
* **Total Documented Cases**: 72
* **Passed**: 72
* **Failed**: 0
* **Pending / Blocked**: 0
* **Status Legend**: **PASS** (Verified with actual Cypress test runner execution evidence)

---

## Module A: Text Box (`/text-box`)

| Test Case ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TB-001** | Text Box | Verify page loads successfully | Target site accessible | 1. Navigate to `/text-box`<br>2. Check URL and header | N/A | URL contains `/text-box`, H1 contains 'Text Box', form visible | Page loaded, URL verified, form visible | **PASS** |
| **TB-002** | Text Box | Enter full name | Text Box page loaded | 1. Locate `#userName`<br>2. Type full name<br>3. Verify value | `Alexander Vance` | Field accepts and displays entered name | Name accepted and verified in DOM | **PASS** |
| **TB-003** | Text Box | Enter email address | Text Box page loaded | 1. Locate `#userEmail`<br>2. Type valid email<br>3. Verify value | `alexander.vance@example.edu` | Field accepts and displays entered email | Email accepted and verified | **PASS** |
| **TB-004** | Text Box | Enter current address | Text Box page loaded | 1. Locate `#currentAddress`<br>2. Type address text<br>3. Verify value | `456 Innovation Blvd, Suite 101` | Field accepts and displays current address | Current address input verified | **PASS** |
| **TB-005** | Text Box | Enter permanent address | Text Box page loaded | 1. Locate `#permanentAddress`<br>2. Type permanent address<br>3. Verify value | `789 Academic Way, Boston, MA` | Field accepts and displays permanent address | Permanent address input verified | **PASS** |
| **TB-006** | Text Box | Submit valid information displays output | Form fields populated | 1. Fill all valid fields<br>2. Click Submit (`#submit`) | Valid user fixture | `#output` section becomes visible containing submitted data | `#output` visible with all 4 field rows | **PASS** |
| **TB-007** | Text Box | Submitted values match form inputs | Form submitted with valid data | 1. Fill all fields<br>2. Click Submit<br>3. Inspect output spans | Valid user fixture | Output values strictly match entered inputs | All output text values matched fixtures | **PASS** |
| **TB-008** | Text Box | Handle empty input appropriately | Blank form fields | 1. Leave all fields empty<br>2. Click Submit button | Empty strings | No `#output #name` or `#output #email` element created | No output elements populated | **PASS** |
| **TB-009** | Text Box | Invalid email validation behavior | Text Box page loaded | 1. Enter invalid email without @<br>2. Click Submit | `invalid-email-format-without-at` | `#userEmail` gets `field-error` CSS class; no email output rendered | Class `field-error` applied; output suppressed | **PASS** |
| **TB-010** | Text Box | Fields remain independently editable | Form pre-filled | 1. Type into Name and Email<br>2. Clear and edit Name<br>3. Verify Email untouched | Name: `Updated Name` | Modifying Name does not alter or erase Email field | Name updated; Email remained untouched | **PASS** |
| **TB-011** | Text Box | Multiline address preserves formatting | Text Box page loaded | 1. Type multiline string with `\n` into `#currentAddress` | `Line1\nLine2\nLine3` | Multiline text preserved with line breaks | Multiline text strictly preserved | **PASS** |
| **TB-012** | Text Box | Submission output labels displayed correctly | Valid submission | 1. Submit valid form<br>2. Inspect `#output` labels | Valid user fixture | Labels 'Name:', 'Email:', 'Current Address :' present | All labels present and verified | **PASS** |

---

## Module B: Check Box (`/checkbox`)

| Test Case ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CB-001** | Check Box | Verify page loads | Checkbox page accessible | 1. Visit `/checkbox`<br>2. Verify wrapper and tree | N/A | Header 'Check Box' and `.rc-tree` container visible | Page, header, and tree component visible | **PASS** |
| **CB-002** | Check Box | Expand root tree node | Page loaded, tree closed | 1. Click root switcher `.rc-tree-switcher` | N/A | Desktop, Documents, Downloads nodes become visible | 3 child node branches expanded into DOM | **PASS** |
| **CB-003** | Check Box | Select nested checkbox option | Root and Desktop expanded | 1. Expand Home and Desktop<br>2. Click Notes checkbox | Label: `Select Notes` | Notes checkbox checked; `#result` shows 'notes' | Checkbox checked and result text displayed | **PASS** |
| **CB-004** | Check Box | Parent selection cascades to descendants | Home expanded | 1. Click Desktop checkbox<br>2. Check descendants & result | Label: `Select Desktop` | Descendants (notes, commands) checked; `#result` contains all | Desktop, notes, commands displayed in result | **PASS** |
| **CB-005** | Check Box | Child selection updates parent state | Hierarchy expanded | 1. Select only Notes child checkbox<br>2. Inspect parent Desktop | Label: `Select Notes` | Desktop checkbox displays indeterminate state | Indeterminate CSS class applied to parent | **PASS** |
| **CB-006** | Check Box | Selected checkbox results displayed | Home expanded | 1. Select Downloads branch<br>2. Verify `#result` block | Label: `Select Downloads` | `#result` is visible with text 'downloads' | `#result` displayed with matching text | **PASS** |
| **CB-007** | Check Box | Deselect individual checkbox | Checkbox selected | 1. Select Home<br>2. Click Home again to deselect | Root checkbox | Checkbox unchecked; `#result` removed from DOM | Checkbox unchecked and result destroyed | **PASS** |
| **CB-008** | Check Box | Select multiple non-contiguous checkboxes | Tree branches expanded | 1. Select Notes<br>2. Select Commands<br>3. Inspect `#result` | Notes & Commands | Both items reflect in selection results | `#result` contains notes and commands | **PASS** |
| **CB-009** | Check Box | Verify Expand control expands tree | Home node collapsed | 1. Click Home switcher<br>2. Click Desktop switcher | Tree switchers | Nested child nodes become visible in DOM | Child node titles visible | **PASS** |
| **CB-010** | Check Box | Verify Collapse control collapses tree | Home node expanded | 1. Expand Home<br>2. Click open switcher to collapse | Open tree switcher | Descendants hidden; only root Home node visible | Child nodes hidden; Home visible | **PASS** |
| **CB-011** | Check Box | Verify checkbox selection states accurate | Desktop expanded | 1. Select Commands<br>2. Check state of Notes | Commands checkbox | Commands is checked; sibling Notes remains unchecked | Distinct selection state verified | **PASS** |
| **CB-012** | Check Box | Selected values correspond to actual selection | Home expanded | 1. Select Desktop<br>2. Extract all success text spans | Desktop branch | Results contain desktop, notes, commands; not documents | Exact items present in results array | **PASS** |

---

## Module C: Radio Button (`/radio-button`)

| Test Case ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RB-001** | Radio Button | Verify page loads | Radio button route accessible | 1. Visit `/radio-button`<br>2. Check prompt and options | N/A | H1 'Radio Button' and all 3 radio options visible | Page title and 3 radio controls visible | **PASS** |
| **RB-002** | Radio Button | Select Yes option | Page loaded | 1. Click Yes label (`label[for="yesRadio"]`) | Yes radio | `#yesRadio` is checked; displays 'Yes' | Option checked; success message shows 'Yes' | **PASS** |
| **RB-003** | Radio Button | Select Impressive option | Page loaded | 1. Click Impressive label | Impressive radio | `#impressiveRadio` checked; displays 'Impressive' | Option checked; success message shows 'Impressive' | **PASS** |
| **RB-004** | Radio Button | Display correct result message | Option selected | 1. Click Yes option<br>2. Verify message container | Yes option | `p.mt-3` contains 'You have selected Yes' | Paragraph text matches expected message | **PASS** |
| **RB-005** | Radio Button | Verify No option is disabled | Page loaded | 1. Inspect `#noRadio`<br>2. Inspect label | No radio element | Input has `disabled` attribute; label has `.disabled` | Element is disabled in DOM | **PASS** |
| **RB-006** | Radio Button | Disabled option cannot be selected | Page loaded | 1. Attempt click on No label<br>2. Inspect radio state | No radio element | Input remains unchecked; no result message displayed | Input not checked; no success message | **PASS** |
| **RB-007** | Radio Button | Result message matches selected option | Page loaded | 1. Click Impressive<br>2. Check other options unchecked | Impressive radio | Only Impressive text displayed; Yes is unchecked | Strict correspondence verified | **PASS** |
| **RB-008** | Radio Button | Changing selection updates displayed result | Yes option active | 1. Select Yes<br>2. Switch selection to Impressive | Yes -> Impressive | Selection changes; result updates from 'Yes' to 'Impressive' | Radio toggled and output text updated | **PASS** |

---

## Module D: Web Tables (`/webtables`)

| Test Case ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **WT-001** | Web Tables | Verify page loads | Web Tables route accessible | 1. Visit `/webtables`<br>2. Verify Add button, Search, Table | N/A | Add button, search box, and table grid visible | All primary table controls visible | **PASS** |
| **WT-002** | Web Tables | Display existing table records | Default page state | 1. Inspect `table tbody tr` rows | Seed data | At least 3 default records (Cierra, Alden, Kierra) visible | 3 default records present | **PASS** |
| **WT-003** | Web Tables | Add a new record | Form modal accessible | 1. Click Add<br>2. Fill registration form<br>3. Submit | Fictional user fixture | New row with user email appended to table | Row created and visible in grid | **PASS** |
| **WT-004** | Web Tables | Submitted fields appear correctly | Record added | 1. Add record<br>2. Verify all 6 cell values in row | Sophia Martinez data | First, Last, Age, Email, Salary, Dept match | All 6 cell values match submitted inputs | **PASS** |
| **WT-005** | Web Tables | Edit an existing record | Record present in table | 1. Click Edit icon on record<br>2. Update First Name<br>3. Submit | `SophiaEdited` | Modal closes without error; record updated | Modal closed cleanly after edit | **PASS** |
| **WT-006** | Web Tables | Edited values appear in table | Record edited | 1. Edit First Name and Dept<br>2. Inspect updated table row | `SophiaEdited`, `Software Engineering` | Updated values visible in corresponding cells | Table cells display edited values | **PASS** |
| **WT-007** | Web Tables | Delete a record | Record present in table | 1. Click Delete icon on record<br>2. Check row presence | Test record | Target record row removed from DOM | Row removed successfully | **PASS** |
| **WT-008** | Web Tables | Deleted record no longer appears | Record deleted | 1. Add record<br>2. Delete record<br>3. Verify absence | `to.delete@test.com` | Target email does not exist anywhere in table | Grid body does not contain deleted email | **PASS** |
| **WT-009** | Web Tables | Search field filters records | Table loaded | 1. Type 'Vega' into `#searchBox`<br>2. Check visible rows | `Vega` | Exactly 1 matching row displayed in table | Table filtered to single matching row | **PASS** |
| **WT-010** | Web Tables | Search existing record returns expected result | Table loaded | 1. Search 'Cierra'<br>2. Verify each row contains term | `Cierra` | All rendered rows contain 'Cierra' | Returned row matched search term | **PASS** |
| **WT-011** | Web Tables | Search nonexistent record returns empty | Table loaded | 1. Search random nonexistent string | `ZZZ_NoSuchRecord_999` | Table displays 0 rows | Table rendered 0 rows | **PASS** |
| **WT-012** | Web Tables | Required-field form validation | Modal form open | 1. Click Add<br>2. Submit empty form | Blank inputs | Modal remains open; `.was-validated` class applied | Form prevented submission; marked invalid | **PASS** |
| **WT-013** | Web Tables | Email format validation in modal | Modal form open | 1. Fill fields with invalid email<br>2. Submit | `not-a-valid-email` | Modal remains open; `#userEmail:invalid` flag active | Invalid pattern caught; modal remained open | **PASS** |
| **WT-014** | Web Tables | Table operations affect intended record | Unique record present | 1. Add unique record<br>2. Delete it<br>3. Check existing data | `target.user@demoqa.com` | Target record removed; existing Cierra & Alden remain | Isolated deletion verified; other records preserved | **PASS** |
| **WT-015** | Web Tables | Record consistency across search | Table loaded | 1. Search 'Cantrell'<br>2. Verify cells | `Cantrell` | Alden, alden@example.com, 12000 consistent | Values consistent in filtered view | **PASS** |
| **WT-016** | Web Tables | Clearing search restores records | Filtered table state | 1. Search 'Alden'<br>2. Clear search input | Clear action | Table restores full default list of >=3 rows | Full list restored immediately | **PASS** |

---

## Module E: Alerts and Windows (`/alerts`, `/browser-windows`)

| Test Case ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AW-001** | Alerts | Verify Alerts page loads | Route accessible | 1. Visit `/alerts`<br>2. Verify all 4 action buttons | N/A | Header 'Alerts' and 4 alert trigger buttons visible | Page and all 4 trigger buttons visible | **PASS** |
| **AW-002** | Alerts | Trigger standard JavaScript alert | Alerts page loaded | 1. Register alert stub<br>2. Click `#alertButton` | Alert stub | `window:alert` event fired once | Alert event captured and verified | **PASS** |
| **AW-003** | Alerts | Expected alert text displayed | Alerts page loaded | 1. Listen for `window:alert`<br>2. Click `#alertButton` | `You clicked a button` | Alert text strictly equals expected string | Alert text verified | **PASS** |
| **AW-004** | Alerts | Alert can be accepted | Alerts page loaded | 1. Click `#alertButton`<br>2. Accept alert | Default Cypress behavior | Alert auto-accepted without uncaught error | Alert accepted cleanly | **PASS** |
| **AW-005** | Alerts | Trigger confirmation alert | Alerts page loaded | 1. Register confirm stub<br>2. Click `#confirmButton` | Confirm stub | `window:confirm` event fired once | Confirm dialog event captured | **PASS** |
| **AW-006** | Alerts | Accept confirmation dialog | Alerts page loaded | 1. Bind `window:confirm` to return true<br>2. Click button | Return `true` | `#confirmResult` displays 'You selected Ok' | Output confirmed 'You selected Ok' | **PASS** |
| **AW-007** | Alerts | Dismiss confirmation dialog | Alerts page loaded | 1. Bind `window:confirm` to return false<br>2. Click button | Return `false` | `#confirmResult` displays 'You selected Cancel' | Output confirmed 'You selected Cancel' | **PASS** |
| **AW-008** | Alerts | Delayed alert appears after timer | Alerts page loaded | 1. Register alert stub<br>2. Click `#timerAlertButton`<br>3. Await 5s | `This alert appeared after 5 seconds` | Alert triggers after 5 seconds with exact text | Timer alert captured with expected message | **PASS** |
| **AW-009** | Alerts | Prompt dialog stub input | Alerts page loaded | 1. Stub `window.prompt` with test string<br>2. Click `#promtButton` | `Automated Cypress Tester` | `#promptResult` displays 'You entered <text>' | Prompt result confirmed entered text | **PASS** |
| **AW-010** | Alerts | Prompt output matches user action | Alerts page loaded | 1. Stub prompt with custom name<br>2. Click prompt button | `Viva QA Candidate` | `#promptResult` contains 'You entered Viva QA Candidate' | Text matched prompt stub input | **PASS** |
| **AW-011** | Windows | Verify Browser Windows page loads | Route accessible | 1. Visit `/browser-windows`<br>2. Verify tab and window buttons | N/A | Header 'Browser Windows' and 3 buttons visible | Header and buttons visible | **PASS** |
| **AW-012** | Windows | Handle opening new browser tab | Windows page loaded | 1. Stub `window.open`<br>2. Click `#tabButton` | Window stub | `window.open` called with expected parameters | Stub called as expected | **PASS** |
| **AW-013** | Windows | Verify destination URL and content | Windows route tested | 1. Visit target destination `/sample`<br>2. Verify heading | Route `/sample` | Heading contains 'This is a sample page' | Direct route verified with expected content | **PASS** |
| **AW-014** | Windows | Handle new window without unsupported commands | Windows page loaded | 1. Stub `window.open`<br>2. Click `#windowButton` | Window stub | `window.open` called matching `/sample` destination | Verified window target without multiple tabs | **PASS** |

---

## Module F: Buttons and Links (`/buttons`, `/links`)

| Test Case ID | Module | Test Scenario | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BL-001** | Buttons | Verify Buttons page loads | Route accessible | 1. Visit `/buttons`<br>2. Verify double, right, click buttons | N/A | Header 'Buttons' and all 3 buttons visible | Page loaded, 3 buttons present | **PASS** |
| **BL-002** | Buttons | Single click on dynamic ID button | Buttons page loaded | 1. Locate button by exact text 'Click Me'<br>2. Click it | Exact regex: `/^Click Me$/` | `#dynamicClickMessage` displays 'You have done a dynamic click' | Message displayed and text verified | **PASS** |
| **BL-003** | Buttons | Double click triggers expected message | Buttons page loaded | 1. Locate `#doubleClickBtn`<br>2. Perform `dblclick()` | Double click action | `#doubleClickMessage` displays 'You have done a double click' | Double click message displayed | **PASS** |
| **BL-004** | Buttons | Right click triggers expected message | Buttons page loaded | 1. Locate `#rightClickBtn`<br>2. Perform `rightclick()` | Context menu action | `#rightClickMessage` displays 'You have done a right click' | Right click message displayed | **PASS** |
| **BL-005** | Buttons | Each button action displays distinct result | Buttons page loaded | 1. Perform dblclick, rightclick, click sequentially | All 3 triggers | All 3 individual feedback messages render simultaneously | All 3 distinct messages verified | **PASS** |
| **BL-006** | Buttons | Independent action assertion isolation | Buttons page loaded | 1. Perform only right click<br>2. Verify double and dynamic messages | Right click only | Right click message exists; double and dynamic messages do not | Assertions strictly isolated | **PASS** |
| **BL-007** | Buttons | Buttons remain enabled | Buttons page loaded | 1. Inspect DOM attributes of all buttons | Enablement state | Buttons have `.be.enabled` and lack `disabled` attribute | All buttons confirmed enabled | **PASS** |
| **BL-008** | Buttons | Result message corresponds to control | Dynamic button clicked | 1. Click dynamic button<br>2. Assert message does not contain other actions | Dynamic button | Message contains 'dynamic click' and not 'double click' | Message content accurately matched | **PASS** |
| **BL-009** | Links | Verify Links page loads | Route accessible | 1. Visit `/links`<br>2. Verify header and `#simpleLink` | N/A | Header 'Links' and simple link element visible | Page and link visible | **PASS** |
| **BL-010** | Links | Verify link destination and target attribute | Links page loaded | 1. Inspect `#simpleLink`<br>2. Verify href and target<br>3. Verify HTTP status | `https://demoqa.com` | `href="https://demoqa.com"`, `target="_blank"`, HTTP status 200 | Attributes verified, endpoint returned 200 OK | **PASS** |
