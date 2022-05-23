module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb",
        "plugin:react-hooks/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint",
    ],
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4],
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "no-undef": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": "off",
        "react/require-default-props": "off",
        "react/jsx-indent": "off",
        "react/no-unescaped-entities": "off",
        "no-plusplus": "off",
        "no-console": "off",
        "no-trailing-spaces": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "import/no-duplicates": "off",
    },
};
