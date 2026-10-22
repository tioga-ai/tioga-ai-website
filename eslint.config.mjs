import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // eslint-config-next 16 adds React Compiler rules (react-hooks v7). On the
    // Next 16 upgrade (2026-10-22) they flagged 55 existing spots in 27 files,
    // mostly the 3D demo scenes. Off for now so the upgrade stays a dependency
    // change; burn them down and turn them back on (follow-up).
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/set-state-in-render": "off",
    },
  },
  {
    // These three rules were downgraded to "warn" while pre-existing
    // violations were burned down (done 2026-09-20: lint is at zero
    // warnings). Back to errors, and `npm run lint` uses --max-warnings 0,
    // so new violations fail CI instead of accumulating again.
    rules: {
      "react/no-unescaped-entities": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-object-type": "error",
    },
  },
];

export default eslintConfig;
