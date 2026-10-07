import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",

    // Archivos de terceros servidos localmente.
    "public/pdf.worker.min.mjs",
    "public/ffmpeg/**",
  ]),
]);

export default eslintConfig;