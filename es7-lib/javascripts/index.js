export AppBridge from './core/app-bridge.js';
export Browser from './core/browser.js';
export DOMReady from './core/dom-ready.js';
export Event from './core/event.js';
export Utils from './core/utils.js';
export getJSONP from './core/jsonp.js';

import RequestFactory from './core/request.js';

export let Request = new RequestFactory()

export default { version: '0.9' }
