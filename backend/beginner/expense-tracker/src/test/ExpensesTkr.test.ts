import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as ExpenseTkrService from '../app/expenses/ExpenseTkr.service';

describe('Add expenses', { skip: false }, () => {
  it('should be able to create an expense', { skip: false }, async () => {
      const res = await ExpenseTkrService.toAddExpense(['add', '--description', 'Test', '--category', 'test', '--amount', '100']);
      
      assert.ok(res.success, res.message);
  });
});

describe('List expenses', { skip: true }, () => {
  it('should be able to list all expenses', { skip: false }, async () => {
      const res = await ExpenseTkrService.toListAllExpenses();

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });

  it('should be able to list by month', { skip: true }, async () => {
      const res = await ExpenseTkrService.toListExpenseWithFilter(['summary', '--category', 'test']);

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });
});

describe('Update an expense', { skip: true }, () => {
  it('should be able to update an expense', async () => {
      const res = await ExpenseTkrService.toUpdateExpense(['update', '1', '--description', 'Test 2', '--amount', '600', '--category', 'test 2']);

      assert.ok(res.success, res.message);
  });
});

describe('Delete an expense', { skip: true }, () => {
  it('should be able to delete an expense', { skip: true }, async () => {
      const res = await ExpenseTkrService.toDeleteExpenses(['delete', '1']);

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });

  it('should be able to delete all expenses', { skip: false }, async () => {
      const res = await ExpenseTkrService.toDeleteExpenses(['delete']);

      if (res) assert.ok(res.success, res.message);

      assert.ok(true);
  });
});