/* eslint-disable import/no-commonjs */
/**
 * Use this tailwind.config.js file to configure tailwind
 * Note that it will not be read directly by tailwind, but by norska first
 * before being passed to tailwind. The format of this file is slightly
 * different than the format of the default tailwind.config.js in that it does
 * not export an object, but a function that returns an object. The function is
 * called with the default theme as its argument, allowing you an easy access to
 * the default values
 * @param {object} theme The default Tailwind theme
 * @returns {object} A tailwing config object
 **/
module.exports = function(theme) {
  return {
    theme: {
      extend: {
        colors: {
          red: {
            ...theme.colors.red,
            default: theme.colors.red['600'],
          },
        },
      },
    },
    variants: {},
    plugins: [],
  };
};
