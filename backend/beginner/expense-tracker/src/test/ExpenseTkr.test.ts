import { describe, it } from "node:test";
import assert from "node:assert/strict";
import ExpenseTkrCli from "../ExpenseTkrCli";

describe('Add Expense', { skip: true }, () => {
  it('should be able to create an expense', async () => {
    try {
      ExpenseTkrCli.setArgs(['add', '--description', 'Test', '--amount', '100']);
      await ExpenseTkrCli.cliOptions();

      assert.strictEqual(1, 1);
    } catch (err) {
      assert.notStrictEqual(1, 1)
    }
  });
});

describe('List expenses', { skip: false }, () => {
  it('should be able to list all expenses', { skip: true }, async () => {
    try {
      ExpenseTkrCli.setArgs(['list']);
      await ExpenseTkrCli.cliOptions();

      assert.strictEqual(1, 1);
    } catch (err) {
      assert.notStrictEqual(1, 1)
    }
  });

  it('should be able to list by month', { skip: false }, async () => {
    try {
      ExpenseTkrCli.setArgs(['summary', '--month', '6']);
      await ExpenseTkrCli.cliOptions();

      assert.strictEqual(1, 1);
    } catch (err) {
      assert.notStrictEqual(1, 1)
    }
  });
});