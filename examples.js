const CODES = {
    "rq1_compress_explanation":`
An example of MetaGPT with compressed input: even when given the full requirement document, it first summarizes it and then generates the analysis, causing many requirement points to be missed.
`,

    "rq1_metagpt_compress_example":`
## Original Requirements
    **Ctrip Travel System**: A one-stop travel service platform providing booking services for hotels, flights, and vacation packages.
This phase focuses on the following modules:
1. **Ctrip Homepage Navigation and Entry Points** – Main navigation bar and quick access to core services.
2. **User Authentication Module** – Includes account-password login, SMS verification login, registration process, and logout functionality.
3. **Flight Search Module** – Features quick search on the homepage, flight route parameter configuration, city selection, date/return date selection, passenger and cabin options, search history, result page display with filtering and sorting, flight details expansion, and booking entry.
4. **Order Module** – Covers booking page data entry, frequent passengers, contact information, dynamic price linkage, value-added services, payment countdown and methods, order list and details, and order cancellation.
5. **Frequent Information Management** – CRUD operations and batch deletion for frequent travelers, addresses, contacts, and reimbursement documents.
6. **Personal Center and Account Security** – Personal information display and editing, password/phone/email modification.
7. **Flight Status Query** – Search by flight number or departure/arrival cities, with history records and detailed flight information.
8. **Reimbursement Document Management** – Access to lists of pending/in-progress/completed reimbursement documents (application process reserved).
9. **Airport Guides and Navigation** – Airport list, weather cards, and detailed airport information (introduction, transportation, contact numbers, etc.).
10. **Comprehensive Airport Index** – Entry for domestic/international airport lists with categorized tab navigation.
`,

    "rq1_fragmented_explanation":`
    
`,

    "rq1_fragmented_example":`
    
`,

    "rq1_bad_case_1_explanation":`
The requirement of "Adding passengers" is not clearly stated and does not specify that duplicate passengers cannot be added.
`,

    "rq1_bad_case_1":`
<pre><code class="language-yaml">id: REQ-6-1-3
name: Add Passenger
description: |-
    Enter new passenger information.
    The form includes:
    - Basic information: document type (required, default is Resident ID card), name (required), document number (required).
    - Contact information: mobile number (country code + number), email (optional).
    - Additional information: discount (pending) type (adult/student/child/disabled veteran).
    Reference: ![image](./reference/add_passenger.png)
dependencies:
    - REQ-6-1-1
scenarios:
    # Scenario 0: Open Page
    - id: REQ-6-1-3:SCE-0
      name: Open Add Page
      prerequisites:
        - REQ-6-1-1:SCE-0
      steps:
        - action: Click “+添加” at the top of the list.
          expectation: Enter the add passenger form page, with all fields empty.

    # Scenario 1: Success Path
    - id: REQ-6-1-3:SCE-1
      name: Successfully Add Passenger
      prerequisites:
        - REQ-6-1-3:SCE-0
      steps:
        - action: Select the document type “居民身份证”.
        - action: Enter a valid name.
        - action: Enter a valid 18-digit ID number.
        - action: Enter a valid mobile number.
        - action: Click “保存”.
        expectation: Show a “saved successfully” message.

    # Scenario 2: Missing Fields
    - id: REQ-6-1-3:SCE-2
      name: Add Failure - Missing Required Fields
      # ... (omitted details)

    # Scenario 3: Format Error
    - id: REQ-6-1-3:SCE-3
      name: Add Failure - Format Validation Error
      # ... (omitted details)
</code></pre>

<div class="alert alert-warning mt-2 mb-0">
    <strong><i class="fas fa-exclamation-circle me-1"></i> Analysis: Missing Implicit Constraint</strong><br/>
    The requirement clearly defines:
    <ul class="mb-1">
        <li><i class="fas fa-check text-success me-1"></i> Happy path (adding a valid passenger)</li>
        <li><i class="fas fa-check text-success me-1"></i> Input validation (missing fields, format errors)</li>
    </ul>
    However, it <strong>fails to specify</strong>:
    <ul class="mb-0">
        <li><i class="fas fa-times text-danger me-1"></i> <strong>Duplicate Check:</strong> What happens if adding a passenger with an existing ID number?</li>
    </ul>
    <div class="mt-2 text-muted">
        This leads to a backend error (e.g., 500 SQL Constraint Violation) during testing because the generated code didn't handle the "duplicate entry" exception gracefully.
    </div>
</div>
`,

    "rq1_bad_case_2_explanation":`
Limited Feedback Signal from Tests: As shown in the example below, when the test feedback only checks whether each element’s \`.toBeVisible() == false\`, it is difficult to infer which intermediate step failed, requiring multiple iterations. For efficiency, we set a testing budget.
`,

    "rq1_bad_case_2_code":`
<pre><code class="language-typescript">test('Recently Viewed Products', async ({ page }) => {
    // [Step 1] Visit Product A
    // Key Action: Navigate to Product A page
    const postPromiseA = page.waitForResponse(resp => resp.url().includes('/api/recently-viewed') && resp.status() === 200);
    await page.goto('http://localhost:5178/product/209');
    await expect(page.getByRole('heading', { name: 'Product A' })).toBeVisible();
    await postPromiseA;

    // [Step 2] Visit Product B
    // Key Action: Navigate to Product B page
    const postPromiseB = page.waitForResponse(resp => resp.url().includes('/api/recently-viewed') && resp.status() === 200);
    await page.goto('http://localhost:5178/product/210');
    await expect(page.getByRole('heading', { name: 'Product B' })).toBeVisible();
    await postPromiseB;

    // [Step 3] Visit Product C
    // Key Action: Navigate to Product C page
    const postPromiseC = page.waitForResponse(resp => resp.url().includes('/api/recently-viewed') && resp.status() === 200);
    await page.goto('http://localhost:5178/product/211');
    await expect(page.getByRole('heading', { name: 'Product C' })).toBeVisible();
    await postPromiseC;

    // [Final Assertion] Check "Recently Viewed" section on Product C page
    // Expectation: Product A and B should be visible
    const recentlyViewed = page.locator('.recently-viewed');
    await expect(recentlyViewed).toBeVisible();
    await expect(recentlyViewed.getByRole('link', { name: 'Product A' }).first()).toBeVisible();
    await expect(recentlyViewed.getByRole('link', { name: 'Product B' }).first()).toBeVisible();
});</code></pre>

<div class="alert alert-warning mt-2 mb-0">
    <strong><i class="fas fa-search me-1"></i> Analysis: High-level Feedback Issue</strong><br/>
    If the final assertion <code>.toBeVisible()</code> fails, the agent only receives a "false" signal. 
    It cannot determine <em>why</em> the history wasn't recorded:
    <ul>
        <li>Did the API call fail in Step 1/2?</li>
        <li>Is the frontend component rendering logic wrong?</li>
        <li>Is the localStorage/Database not updating?</li>
    </ul>
    This lack of fine-grained traceability forces the agent to guess the root cause, leading to inefficient iterations.
</div>
`,

};