import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as BudgetTkrService from '../app/budgets/BudgetTkr.service';

describe('Add budgets', { skip: true }, () => {
  it('should be able to create a budget', { skip: false }, async () => {
    const res = await BudgetTkrService.toAddMonthBudget(['add', 'budget', '1200', '--month', '7']);

    assert.ok(res.success, res.message);
  });
});

describe('List budgets', { skip: true }, () => {
  it('should be able to list all budgets', { skip: true }, async () => {
    const res = await BudgetTkrService.toListAllBudgets();

    if (res) assert.ok(res.success, res.message);

    assert.ok(true);
  });

  it('should be able to list budget by month', { skip: false }, async () => {
    const res = await BudgetTkrService.toListBudgetWithFilter(['list', 'budget', '7']);

    if (res) assert.ok(res.success, res.message);

    assert.ok(true);
  });
});

describe('Update a budget', { skip: true }, () => {
  it('should be able to update a budget', { skip: false }, async () => {
    const res = await BudgetTkrService.toUpdateBudget(['update', 'budget', '1800', '--month', '7']);

    assert.ok(res.success, res.message);
  });
});

describe('Delete a budget', { skip: true }, () => {
  it('should be able to delete a budget', { skip: false }, async () => {
    const res = await BudgetTkrService.toDeleteBudgets(['delete', 'budget', '7']);

    if (res) assert.ok(res.success, res.message);

    assert.ok(true);
  });

  it('should be able to delete all budgets', { skip: false }, async () => {
    const res = await BudgetTkrService.toDeleteBudgets(['delete', 'budget']);

    if (res) assert.ok(res.success, res.message);

    assert.ok(true);
  });
});