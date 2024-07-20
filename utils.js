import { createRequire } from 'node:module';

export function readJson (direc) {
    const require = createRequire(import.meta.url);
    return require(direc);
};
