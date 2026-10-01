# SauceDemo E2E Testing Strategy

SauceDemo is a good fit for a small set of high-value Playwright tests. Store the account used for successful login in a local `.env` file rather than in test source or documentation.

## Suggested Tests by Spec File

### `tests/login.spec.ts`

- **Successful login smoke test:** Log in with the configured test account, confirm the inventory page appears, and verify products are shown.
- **Invalid credentials:** Verify that invalid credentials show a login error.
- **Locked-out user:** Verify that a locked-out account cannot log in and that the expected error is shown.

### `tests/cart.spec.ts`

- **Remove item:** Add a product, remove it from the cart, and verify the cart updates.
- **Continue shopping:** Verify the control returns to the inventory page if it is present.

### `tests/checkout.spec.ts`

- **Successful purchase:** Add a product to the cart, verify its name and quantity, proceed through checkout, enter customer details, complete the order, and assert the confirmation.
- **Required-field validation:** Continue checkout with incomplete details and verify the missing required fields are reported.

### `tests/account-profiles.spec.ts` (optional)

- Add profile-specific behavior tests for other SauceDemo accounts if those profiles matter to the application. Keep expectations specific to each profile rather than assuming they behave exactly like the configured account.

## Keep the Suite Reliable

- Use Playwright's `getByRole` and the site's `data-test` attributes for locators; avoid selectors based on styling or position.
- Keep each test independent: create a fresh browser context, log in as needed, and avoid relying on another test's cart or session.
- Assert user-visible outcomes, such as the product name in the cart or the order confirmation, rather than only checking that a button was clicked.
- Avoid fixed sleeps. Playwright's auto-waiting and web-first assertions are usually enough.
- Run Chromium on every pull request; add Firefox and WebKit to a smaller smoke suite or scheduled run. Capture traces on failure to make CI failures easier to diagnose.

## Suggested Starting Suite

Start with three tests: **successful checkout** in `checkout.spec.ts`, **locked-out login** in `login.spec.ts`, and **checkout validation** in `checkout.spec.ts`. Add cart operations and the other account profiles as the suite grows.
