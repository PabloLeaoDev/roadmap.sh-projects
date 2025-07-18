import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as FileProcTkrService from '../app/fileproc/FileProcTkr.service';

describe('Create csv file', { skip: false }, () => {
  it('should be able to create a csv file', { skip: false }, async () => {
    const res = await FileProcTkrService.toCreateCsvFile(['export', 'expenses']);

    if (res) assert.ok(res.success, res.message);

    assert.ok(true);
  });
});