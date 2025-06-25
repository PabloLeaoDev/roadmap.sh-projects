import { describe, it } from "node:test";
import assert from "node:assert/strict";
import ExpenseTkrCli from "../ExpenseTkrCli";

describe('Create Expense', { skip: true }, () => {
  it('should be able to create an expense', async () => {
    ExpenseTkrCli.setArgs(['add', '--description', 'Test', '--amount', '100']);
    await ExpenseTkrCli.cliOptions();

    assert.strictEqual(1, 2);
  });
});