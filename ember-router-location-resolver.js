/**
 * ember-router-location-resolver
 *
 * TODO: Programatically detect the current application, instead of using `App`.
 * Nick Frasser
 * Oct 22, 2013
 */


(function () {

	"use strict";

	// Does this browser have the cool history.pushState function?
	var hasPushState = !! window.history.pushState && !PreLoad.config.embedMode,
		destination,
		pathName = window.location.pathname
			.replace(/^\//, '')
			.replace(/\/$/, ''),
		appRoot = (App.get('rootURL') || '/')
			.replace(/^\//, '')
			.replace(/\/$/, '');

	// If either of these conditions are met, the page will reload
	if (hasPushState &&
		window.location.hash &&
		window.location.hash !== '#' &&
		window.location.hash !== '#/'
	) {

		// Remove the hash from the URL
		destination = [
			window.location.protocol,
			'',
			window.location.host || window.location.hostname
		];

		if (appRoot) {
			destination.push(appRoot);
		}

		destination.push(
			window.location.hash.replace(/^#?\/?/, '')
		);

		window.location = destination.join('/');

	} else if (!hasPushState && pathName !== appRoot) {

		var hash = window.location.hash.replace(/^#?\/?/, '').replace(/\/$/, '');

		// Redirect to the hashified version
		destination = [
			window.location.protocol,
			'',
			window.location.host || window.location.hostname
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

		window.location = destination.join('/');
	}

	// Figure out what routing method to use based on the results
	App.Router.reopen({
		location: hasPushState ? 'history' : 'hash'
	});
})();
