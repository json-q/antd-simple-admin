/**
 * @typedef {import('postcss').ProcessOptions} ProcessOptions
 * @typedef {import('postcss').Plugin} Plugin
 *
 * @type {string | (ProcessOptions & {plugins?: Plugin[]})}
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
