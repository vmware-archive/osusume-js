var jsdom = require('jsdom').jsdom;

import localStorage from 'localStorage';

var exposedProperties = ['window', 'navigator', 'document'];

const doc = jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView
global.document = doc
global.window = win;
win.localStorage = localStorage
Object.keys(win).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};