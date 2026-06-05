const colors = require('tailwindcss/colors');

const colorTokens = {
  // --- Neutral ---
  'neutral-high':     colors.gray[900],  // primary text, strong icons
  'neutral-subtle':   colors.gray[600],  // secondary text, labels
  'neutral-muted':    colors.gray[400],  // placeholder, hint, muted icons
  'neutral-disabled': colors.gray[300],  // disabled borders, toggle off
  'neutral-faint':    colors.gray[200],  // dividers, subtle borders

  // --- Primary (violet) ---
  'primary-high':     colors.violet[600], // filled buttons, active borders
  'primary-subtle':   colors.violet[500], // secondary primary text
  'primary-muted':    colors.violet[300], // light accents
  'primary-disabled': colors.violet[200], // disabled primary elements

  // --- Error ---
  'error':    colors.red[500],
  'error-bg': colors.red[50],

  // --- Success ---
  'success':    colors.green[600],
  'success-bg': colors.green[50],

  // --- Warning ---
  'warning':    colors.amber[600],
  'warning-bg': colors.amber[50],

  // --- Info ---
  'info':    colors.blue[600],
  'info-bg': colors.blue[50],

  // --- Surface ---
  'surface':        colors.white,      // base background
  'surface-subtle': colors.gray[100],  // disabled inputs, subtle cards

  // --- Utility ---
  'shadow': colors.black,              // shadow color for elevated elements
};

module.exports = { colorTokens };
