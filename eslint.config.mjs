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
    // eslint-config-next 16 adds React Compiler rules (react-hooks v7). They
    // are on everywhere (burn-down done in the lint-burndown PR). The one
    // exception is `immutability` in the react-three-fiber scene files below:
    // useFrame callbacks mutate refs, three.js objects and ref-backed values
    // every frame by design (that is how r3f animates without re-rendering),
    // and the rule reads those as "modifying values after render". Scoped to
    // these files so it stays on for the rest of the app.
    files: [
      "app/demos/agent-checkpoint-walk/Scene.tsx",
      "app/demos/standing-watch/BoundaryScene.tsx",
      "app/showcase/ShowcaseScene.tsx",
      "app/showcase/gpgpu/LedgerParticleField.tsx",
      "components/HeroFieldScene.tsx",
      "components/SolutionsFieldScene.tsx",
      "components/three/Pulses.tsx",
    ],
    rules: {
      "react-hooks/immutability": "off",
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
