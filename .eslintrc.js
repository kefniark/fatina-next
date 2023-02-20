module.exports = {
    root: true,

    env: {
        node: true,
        browser: true
    },

    parser: '@typescript-eslint/parser',
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/typescript/recommended', 'prettier'],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/ban-ts-comment': 'off'
    }
}
