import { describe, it } from "node:test";
import assert from "node:assert/strict";
import ExpenseTkrCli from "../ExpenseTkrCli";

describe('Add Expense', { skip: true }, () => {
  it('should be able to create an expense', async () => {
      ExpenseTkrCli.setArgs(['add', '--description', 'Test', '--amount', '100']);
      const res = await ExpenseTkrCli.cliOptions();

      if (!res) assert.strictEqual(1, 1);
      else assert.notStrictEqual(1, 1);
  });
});

describe('List expenses', { skip: true }, () => {
  it('should be able to list all expenses', { skip: true }, async () => {
      ExpenseTkrCli.setArgs(['list']);
      const res = await ExpenseTkrCli.cliOptions();

      if (!res) assert.strictEqual(1, 1);
      else assert.notStrictEqual(1, 1);
  });

  it('should be able to list by month', { skip: true }, async () => {
      ExpenseTkrCli.setArgs(['summary', '--month', '6']);
      const res = await ExpenseTkrCli.cliOptions();

      if (!res) assert.strictEqual(1, 1);
      else assert.notStrictEqual(1, 1);
  });
});

describe('Update an expense', { skip: true }, () => {
  it('should be able to update an expense', async () => {
      ExpenseTkrCli.setArgs(['update', '1', '--description', 'Test 1', '--amount', '300']);
      const res = await ExpenseTkrCli.cliOptions();

      if (!res) assert.strictEqual(1, 1);
      else assert.notStrictEqual(1, 1);
  });
});

describe('Delete an expense', { skip: false }, () => {
  it('should be able to delete an expense', async () => {
      ExpenseTkrCli.setArgs(['delete', '1']);
      const res = await ExpenseTkrCli.cliOptions();

      if (!res) assert.strictEqual(1, 1);
      else assert.notStrictEqual(1, 1);
  });
});

// IMPLEMENTAR UMA CAMADA DE SREVICE, DESACOPLANDO AS REQUISIÇÕES DO CLI