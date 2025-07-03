import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NumberGuessingService as Service } from './services/NumberGuessing.service';

describe('NumberGuessingGame CLI', () => {
  describe('Computer selects a number', {skip: false}, () => {
    it('should be able to select a number between 0 and 100', {skip: false}, () => {
      const numberGuessing = new Service();
      const guessNum = numberGuessing.selectNumber();
    });
  });
});
