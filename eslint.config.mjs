export default {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        amd: false,
        mocha: false,
        jasmine: false
    },
    rules: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: [
        '@typescript-eslint'
    ]
};
