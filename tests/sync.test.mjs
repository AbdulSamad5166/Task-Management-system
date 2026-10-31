import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'vite';

test('API sync imports and persists tasks without randomUUID, preserving edits and deletions', async () => {
  const server = await createServer({ server: { middlewareMode: true, watch: null }, appType: 'custom' });
  const cryptoDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
  const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const store = new Map();
  try {
    const { taskService } = await server.ssrLoadModule('/src/services/taskService.ts');
    const { apiClient } = await server.ssrLoadModule('/src/services/api.ts');
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, value),
      removeItem: (key) => store.delete(key),
    } });
    const getRandomValues = crypto.getRandomValues.bind(crypto);
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: { getRandomValues } });
    apiClient.defaults.adapter = async (config) => {
      assert.equal(config.url, '/todos?limit=30&skip=0');
      return { config, status: 200, statusText: 'OK', headers: {}, data: {
        todos: [{ id: 1, todo: 'Review project scope', completed: false, userId: 1 }],
        total: 1, skip: 0, limit: 30,
      } };
    };
    const result = await taskService.syncWithApi('sync-test');
    assert.equal(result.addedCount, 1);
    assert.equal(result.tasks[0].title, 'Review project scope');
    assert.equal((await taskService.getTasks('sync-test')).length, 1);
    assert.equal(result.tasks[0].subtasks.length, 2);
    await taskService.updateTask('sync-test', 'api_task_1', { title: 'Local edit' });
    const repeated = await taskService.syncWithApi('sync-test');
    assert.equal(repeated.addedCount, 0);
    assert.equal(repeated.tasks[0].title, 'Local edit');
    await taskService.deleteTask('sync-test', 'api_task_1');
    assert.equal((await taskService.syncWithApi('sync-test')).tasks.length, 0);
  } finally {
    Object.defineProperty(globalThis, 'crypto', cryptoDescriptor);
    if (storageDescriptor) Object.defineProperty(globalThis, 'localStorage', storageDescriptor);
    else delete globalThis.localStorage;
    await server.close();
  }
});
