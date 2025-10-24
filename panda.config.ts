import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset"
import violet from "@park-ui/panda-preset/colors/violet";
import mauve from "@park-ui/panda-preset/colors/mauve";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: violet,
      grayColor: mauve,
      radius: 'xs',
    }),
  ],

  jsxFramework: "solid",

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  outdir: "styled-system",
});
