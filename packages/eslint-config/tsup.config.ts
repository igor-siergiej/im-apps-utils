import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    outDir: 'build',
    external: [
        '@eslint/js',
        '@stylistic/eslint-plugin',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        'eslint-plugin-simple-import-sort',
        'eslint-plugin-unused-imports',
        'typescript-eslint'
    ],
});
