var express = require('express'),
	app = express();

// Load up the resolver file
app.get('/example/js/resolver.js', function (req, res) {
	res.sendfile(__dirname + '/src/location-resolver.js');
});

// Load up any required assets
app.get('/example/(js|css)/*', function (req, res) {
	res.sendfile(__dirname + req.originalUrl);
});

// Everything else goes to index.html
app.get('/example/*', function (req, res) {
	res.sendfile(__dirname + '/example/index.html');
});

// Everything else redirects to example
app.get('*', function (req, res) {
	res.redirect('/example/');
});

app.listen(3001);
console.log('Listening on port 3001');
