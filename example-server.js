var express = require('express'),
	app = express();

app.get('/example/js/location-resolver.js', function (req, res) {

	// Load up the resolver file
	res.sendfile(__dirname + '/src/location-resolver.js');
});

app.get('/example/(js|css|img)/*', function (req, res) {

	// Load up any required assets
	// Return the actual file based on the given URL
	res.sendfile(__dirname + req.originalUrl);
});

app.get('/example/*', function (req, res) {

	// Render the main view (index.html)
	res.sendfile(__dirname + '/example/index.html');
});

app.get('/', function (req, res) {
	// Everything else redirects to example
	res.redirect('/example/');
});

app.listen(3001);
console.log('Listening on port 3001');
