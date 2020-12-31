/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function( env ) {
  return {
    clientAllowedKeys: [],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: `./config/environments/${env}/.env`,
  }
};