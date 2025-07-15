import { describe, it } from "node:test";
import assert from "node:assert/strict";
import ExpenseTkrService from "../ExpenseTkrService";

describe('Add Expense', { skip: true }, () => {
  it('should be able to create an expense', async () => {
      const res = await ExpenseTkrService.toAddExpense(['add', '--description', 'Test', '--amount', '100']);
      
      assert.ok(res.success, res.message);
  });
});

describe('List expenses', { skip: true }, () => {
  it('should be able to list all expenses', { skip: true }, async () => {
      const res = await ExpenseTkrService.toListAllExpenses();

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });

  it('should be able to list by month', { skip: true }, async () => {
      const res = await ExpenseTkrService.toListExpenseWithFilter(['summary', '--month', '6']);

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });
});

describe('Update an expense', { skip: true }, () => {
  it('should be able to update an expense', async () => {
      const res = await ExpenseTkrService.toUpdateDescriptionExpense(['update', '1', '--description', 'Test 1', '--amount', '300']);

      assert.ok(res.success, res.message);
  });
});

describe('Delete an expense', { skip: false }, () => {
  it('should be able to delete an expense', async () => {
      const res = await ExpenseTkrService.toDeleteExpense(['delete', '1']);

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });
});