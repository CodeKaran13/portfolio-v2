import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        surface: "var(--color-surface)",
        raised: "var(--color-surface-raised)",
        border: "var(--color-border)",
        tick: "var(--color-tick)",
        hud: "var(--color-hud)",
        textMain: "var(--color-text)",
        textDim: "var(--color-text-dim)",
      },

      fontFamily: {
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
      },

      transitionTimingFunction: {
        expo: "var(--ease-out-expo)",
        spring: "var(--ease-spring)",
      },
    },
  },
  plugins: [],
};

export default config;
