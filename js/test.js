// Test JS for test HTML page to test data-morass-on functionality.

import * as morass from './morass';

morass.init();
document.addEventListener('DOMContentLoaded', () => morass.process());
