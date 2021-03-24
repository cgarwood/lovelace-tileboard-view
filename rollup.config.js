import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

const dev = process.env.ROLLUP_WATCH;

export default {
  input: "src/main.ts",
  output: {
    file: "tileboard-view.js",
    format: "es",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript(),
    babel({
      exclude: "node_modules/**",
    }),
    !dev && terser({ format: { comments: false } }),
  ],
};