import { shell$, typeCheckSources } from '@maranomynet/libtools';

await shell$(`bun install`);
await import('./fetch-data.js');
shell$(`bun test --dots --watch`);
typeCheckSources({ watch: true });
