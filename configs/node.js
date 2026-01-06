import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  // Global ignores - must be a separate config object
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "**/scripts/**",
      "**/seeds/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.cjs",
      "eslint.config.*",
      "prettier.config.*",
    ],
  },
  // TypeScript files configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
      },
      globals: {
        // Node.js globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        // ES2021 globals
        Promise: "readonly",
        Symbol: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // TypeScript Specific Rules
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      // Node.js Specific Rules
      "no-process-exit": "error",
      "no-process-env": "off", // Allow process.env in Node.js
      "no-sync": "warn", // Warn against synchronous methods

      // File and Function Length Limits (300 lines file, 200 lines function)
      "max-lines": [
        "error",
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-lines-per-function": [
        "error",
        {
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      complexity: ["error", 15],

      // Class Limits (10 methods max)
      "max-classes-per-file": ["error", 2],

      // Naming Conventions
      camelcase: [
        "error",
        {
          properties: "never",
          ignoreDestructuring: false,
        },
      ],

      // Code Quality - More lenient console for Node.js
      "no-console": "off", // Allow console in Node.js
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "prefer-spread": "error",
      "prefer-rest-params": "error",
      "no-param-reassign": "error",
      "no-magic-numbers": [
        "warn",
        {
          ignore: [0, 1, -1, 200, 201, 400, 401, 403, 404, 500], // Allow common HTTP status codes
          ignoreArrayIndexes: true,
          enforceConst: true,
        },
      ],

      // Error Handling
      "no-throw-literal": "error",
      "prefer-promise-reject-errors": "error",

      // Best Practices
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-return-await": "error",
      "no-async-promise-executor": "error",

      // Code Style
      "no-duplicate-imports": "error",
      "no-useless-rename": "error",
      "object-shorthand": ["error", "always"],
      "prefer-destructuring": [
        "error",
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],

      // Functional Programming
      "no-restricted-syntax": [
        "error",
        {
          selector: "ForInStatement",
          message:
            "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
        },
      ],
    },
  },
  {
    files: ["**/*.spec.{js,ts,tsx}", "**/*.test.{js,ts,tsx}", "test/**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: {
        // Jest testing globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
  },
  // JavaScript files - without TypeScript parser
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Node.js globals
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        // ES2021 globals
        Promise: "readonly",
        Symbol: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "no-magic-numbers": "off",
    },
  },
];
