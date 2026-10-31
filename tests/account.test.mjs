import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getPasswordStrength } from '../src/utils/passwordStrength.ts';
import { hashPassword } from '../src/services/storage.ts';
import { generateId } from '../src/utils/id.ts';

test('password strength reflects unmet and met criteria', () => {
  assert.equal(getPasswordStrength('').label, 'None');
  assert.deepEqual(getPasswordStrength('abc'), { score: 0, label: 'Weak', color: 'bg-rose-500' });
  assert.equal(getPasswordStrength('abcdefgh').score, 25);
  assert.equal(getPasswordStrength('Abcdefgh').label, 'Fair');
  assert.equal(getPasswordStrength('Abcdefg1').label, 'Good');
  assert.equal(getPasswordStrength('Abcdef1!').label, 'Strong');
});

test('local verification uses a consistent SHA-256 digest', async () => {
  assert.equal(await hashPassword('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  assert.notEqual(await hashPassword('abc'), await hashPassword('abcd'));
});

test('hashing rejects browsers without secure cryptography', async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  try {
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: undefined });
    await assert.rejects(hashPassword('abc'), /secure connection/);
  } finally {
    Object.defineProperty(globalThis, 'crypto', descriptor);
  }
});

test('identifiers preserve their namespace and are unique', () => {
  const identifiers = Array.from({ length: 100 }, () => generateId('task'));
  assert.equal(new Set(identifiers).size, identifiers.length);
  assert.ok(identifiers.every((id) => /^task_[0-9a-f-]{36}$/.test(id)));
});

test('task identifiers work on HTTP network addresses without randomUUID', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  const getRandomValues = crypto.getRandomValues.bind(crypto);
  try {
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: { getRandomValues } });
    const ids = Array.from({ length: 100 }, () => generateId('sub'));
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.every((id) => /^sub_[0-9a-f-]{36}$/.test(id)));
  } finally {
    Object.defineProperty(globalThis, 'crypto', descriptor);
  }
});
