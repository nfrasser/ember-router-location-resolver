Location Resolver for the [Ember.js](http://emberjs.com) Router
==============================

[Download 0.9.0](https://raw.github.com/nfrasser/ember-router-location-resolver/master/src/location-resolver.js)

## Get rid of the __#__ !

Use the browser's History API for Ember.js routing
and fallback to hash on older browsers. Just include the above file
with your [Ember.js](https://github.com/emberjs/ember.js) application.

The resolver will allow your Ember App to use the
[HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)
for routing. That means that the `/#/` of the URL can be replaced with a
single `/`. Now your speedy Ember web app will have even more beautiful
URLs.

And the best part: All your old hash URLs still work! The resolver will
automatically redirect to the updated hash version.

## Running the Example Server

To see Ember's History routing in action, check out the example server
included with this repo. Here's how to run it from the terminal:

```shell
git clone https://github.com/nfrasser/ember-router-location-resolver.git
cd ember-router-location-resolver
npm install && npm start
```

Then open the example app in your browser at [localhost:3001](http://localhost:3000).

## Server Configuration

First make sure your web server loads the same view for any URL variation
in your app's namespace. How you choose to implement this will depend on
your backend environment. For most frameworks, you can set up a route like
`GET '/my/app/*'` that always loads the same view.
Check out the examples below, as well as the [example server](#running-the-example-server).

### Node (Express) example

```javascript
// routes.js
module.exports = function (app) {

  // Load public assets directly
  app.get('/(scripts|stylesheets|images)/*', function (req, res) {
    res.sendfile(__dirname + '/public' + req.originalUrl);
  });

  // Render the app view
  app.get('/my/app/*', function (req, res) {
    res.render('myapp/index');
  });
};

```

### PHP (Laravel) example
```php
// routes.php
Route::get('my/app/{uri?}', function () {
  return View::make('home');
})->where('uri', '[a-zA-Z0-9-\/_.]*');
```

#### Important
If your app is located at the `index` route, make sure that any API and
asset routes are handled _before_ the `/*` route.

## Application Configuration
Once your server is propertly set up, include the `location-resolver.js`
file sometime after the `Ember.Application.create()` line:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <link rel="stylesheet" type="text/css" href="stylesheets/app.css">
</head>
<body>
  <script src="scripts/jquery.js"></script>
  <script src="scripts/handlebars.js"></script>
  <script src="scripts/ember.js"></script>
  <script src="scripts/templates.js"></script>
  <script src="scripts/app.js"></script>
  <script src="scripts/location-resolver.js"></script>
</body>
</html>
```

```javascript
// js/app.js
var App = Ember.Application.create({
  // Use App.namespace instead of App.Router.rootURL
  namespace: 'my/app/'
});

// Controllers, Views, Routes...

App.Router.map(function () {
  // Define routes...
});
```

#### Important
If your app is not at the root of your domain, you'll have to
change this block:

```javascript
App.Router.reopen({
  rootURL: 'my/app/'
});
```

To this:

```javascript
App.set('rootURL', 'my/app/');
// or
App.set('namespace', 'my/app/');
```

This is a workaround to complications caused by the asyncronous nature of
`App.Router.reopen` and may not be required in the future.


