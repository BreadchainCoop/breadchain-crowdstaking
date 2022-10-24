module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "linebreak-style": 0,
    "react/jsx-filename-extension": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        tsx: "never",
        ts: "never",
      },
    ],
  },
};
