/**
 * Router Location Resolver for Ember.js
 * Nick Frasser
 * 2014
 */
(function (Em) {

	"use strict";

	// Find the first active Ember application
	var App = Em.Application.detect(window.App.constructor) ?
		window.App : Em.Application.NAMESPACES.find(function (namespace) {
			return Em.Application.detect(namespace.constructor);
		});

	if (!App) {

		// No Application was found
		return;
	}

	// Does this browser have the History API?
	var hasHistory = !!Em.get(history, 'pushState'),
		destination,

		// Find the current pathname and trim off some slashes
		pathName = location.pathname.replace(/(^\/|\/$)/g, ''),

		// Find the current root and trim off some slashes
		appRoot = (
			Em.get(App, 'rootURL') || Em.get(App, 'namespace') || '/'
		).replace(/(^\/|\/$)/g, '');

	// If either of the following conditions are met, the page will reload

	if (hasHistory &&
		location.hash &&
		location.hash.replace(/(^\/|\/$)/g, '') !== '#'
	) {
		// History exists, but using hashed URL
		// Remove the hash from the URL
		destination = [
			location.protocol,
			'',
			location.host || location.hostname
		];

		if (appRoot) {
			destination.push(appRoot);
		}

		destination.push(
			location.hash.replace(/^\/?#?\/?/, '')
		);

		window.location = destination.join('/') + location.search;

	} else if (!hasHistory && pathName !== appRoot) {

		var hash = location.hash.replace(/^#?\/?/, '').replace(/\/$/, '');

		// Redirect to the hashified version
		destination = [
			location.protocol,
			'',
			location.host || location.hostname
		];

		if (appRoot) {
			destination.push(appRoot);
		}

		// Get rid of the app root from the hash, if it exists
		destination.push(
			'#',
			pathName.slice(appRoot.length).replace(/^\//, '')
		);

		// Add the remainder of the hash
		if (hash) {
			destination.push(hash);
		}

		window.location = destination.join('/') + location.search;
	}

	// Figure out what routing method to use based on the results
	App.Router.reopen({
		rootURL: '/' + appRoot,
		location: hasHistory ? 'history' : 'hash'
	});


}(Ember));
