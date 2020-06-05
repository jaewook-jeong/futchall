module.export = {
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    extends: ["prettier", "airbnb"],
    plugins: ["react", "jsx-a11y", "import", "prettier"],
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true
    },
    rules: {
        "indent": [
            "error",
            4
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-trailing-spaces": 0,
        "react/forbid-prop-types": 0,
        "keyword-spacing": 0,
        "no-unused-vars": 1,
        "no-multiple-empty-lines": 0,
        "space-before-function-paren": 0,
        "eol-last": 0,
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }]
    }
};