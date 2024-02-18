import { shell$, typeCheckSources } from '@maranomynet/libtools';

await shell$(`bun install`);
await import('./fetch-data.js');
shell$(`bun test --watch`);
typeCheckSources({ watch: true });
