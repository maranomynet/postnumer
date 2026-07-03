import { buildNpmLib, errorCheckSources, shell$ } from '@maranomynet/libtools';

await shell$(`bun test --dots`);
await errorCheckSources();
await buildNpmLib();
