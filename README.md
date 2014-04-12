# Location Resolver <sub><sup>for the [Ember.js](http://emberjs.com) router</sup></sub>

* [Download 1.0](https://raw.github.com/nfrasser/ember-router-location-resolver/master/src/location-resolver.js)
for Ember 1.0 and up.
* Add to your project via [Bower](http://bower.io/): `bower install ember-router-location-resolver`.

### Using Ember 1.5 and up?

This functionality is now built into Ember.js with [`Ember.AutoLocation`](http://emberjs.com/api/classes/Ember.Location.html#toc_autolocation). Just make sure [your server is configured properly](#server-configuration).

### Get rid of the `#`!

Use the browser's History API for Ember.js routing and fallback to hash
on older browsers. Just update your server routes and include the above
file with your [Ember.js](https://github.com/emberjs/ember.js)
web app.

The resolver will allow your application to use
[Ember's native implementation](http://emberjs.com/api/classes/Ember.HistoryLocation.html)
of the
[HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history)
for routing. That means that the `/#/` part of the URL can be replaced
with a single `/`. Now your speedy Ember web app can benefit from even
more beautiful URLs.

And the best part? __All your old hash URLs still work!__ The resolver
will automatically redirect to the updated hashless version.

## Running the example server

To see Ember's History routing in action, check out the sample app
included with this repo. Here's how to run it from the command line:

```shell
git clone https://github.com/nfrasser/ember-router-location-resolver.git
cd ember-router-location-resolver
npm install && bower install && npm start
```

Then visit [localhost:3001](http://localhost:3001) in your favourite
browser.

## Server Configuration

Make sure your web server loads the same view for any URL variation in
your app's root URL. How you choose to implement this will depend on
your backend environment and your route configuration. For most
frameworks, you can set up a wildcard route like `GET '/my/app/*'` that
always renders the same view. Check out the examples below, as well as the
[Node/Express server](https://github.com/nfrasser/ember-router-location-resolver/blob/master/example-server.js)
for the [sample app](#running-the-example-server).

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
Route::get('my/app/{uri}', function () {
  return View::make('home');
})->where('uri', '[a-zA-Z0-9-\/_.]*');
```

#### Important:
If your app is located at the root `/` route on your server, make sure
that any APIs and other static routes are handled _before_ that route is
resolved.

If your server is set up correctly, Ember will take care of the rest.

## Application Configuration

Once your server is propertly set up, simply include the
`location-resolver.js` file sometime after the
`Ember.Application.create()` line:

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

#### Important:
Depending on how your server routes are set up, if your Ember app's root
URL (`App.Router.rootURL`) is something other than `/` you'll have to
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

This is a workaround to complications caused by the asynchronous nature of
`App.Router.reopen` and may not be required in the future.

## Some gotchas and solutions

> My server 404s whenever I refresh the page

On your server, make sure that any variation of your application's root URL
loads the same view.

For example, if your app is located at `http://localhost/my/app/`
and you have a `/posts` route defined in Ember,
`/my/app/posts/` should load the same view as `/my/app`. Ember will take
care of loading the proper route.

Take another look at the [Server Configuration](#server-configuration) section.

> I'm experiencing strange page redirect issues

The `rootURL` for your Ember app may not be defined property. [Note the new way](#important-1)
of defining this property for this addon.

## Licence

MIT
