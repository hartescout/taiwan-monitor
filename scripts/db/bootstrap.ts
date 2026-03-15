import { pathToFileURL } from 'node:url';

import { run } from './lib/exec';
import { pullSnapshot } from './pull-snapshot';
import { restoreSnapshot } from './restore-snapshot';
import { verifySnapshot } from './verify-snapshot';

function npm(script: string) {
  return run({ command: 'npm', args: ['run', script] });
}

function docker(args: string[]) {
  return run({ command: 'docker', args: ['compose', ...args] });
}

export async function bootstrapDatabase() {
  docker(['up', '-d', 'postgres']);
  npm('db:generate');
  npm('db:migrate:deploy');
  try {
    await pullSnapshot();
    await verifySnapshot();
    await restoreSnapshot();
    console.log('Local database bootstrapped from latest public snapshot');
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown snapshot error';
    console.warn(`Snapshot bootstrap failed: ${message}`);
  }
  npm('db:seed');
  console.log('Fell back to deterministic seed data');
}

async function main() {
  await bootstrapDatabase();
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  void main();
}
