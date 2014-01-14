window.App = Ember.Application.create({
	namespace: 'example/'
});

App.Router.map(function () {
	this.route('about');
	this.route('posts');
	this.route('account');
});
