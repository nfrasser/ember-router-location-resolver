ember-router-location-resolver
==============================
v0.9

Use the browser's History API for Ember.js routing and fallback to hash on older browsers.
Just include the file in this repo with your [Ember.js](http://emberjs.com) application.

The resolver will allow your Ember App to use the
[HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
It will fall back to the usual hash on older browsers, and will allow users of older
and newer browsers to share URLs without breaking your application. i.e., a newer browser
that is given a fallback hash URL will redirect to the hashless version, and vice versa.

Should work with any URL namespace (defined in `YourApp.Router.rootURL`).
