import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Register ts-node for TypeScript support
require('ts-node').register({
  transpileOnly: true,
  esm: true
});

// Import and run the TypeScript deploy script
import('./deploy.ts').catch(err => {
  console.error('Deployment failed:', err);
  process.exit(1);
});