import EmberRouter from '@ember/routing/router';
import config from 'my-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home');
  this.route('contacts', function () {
    this.route('contact', { path: '/:contact_id' });
  });
  this.route('chats', function () {
    this.route('chat', { path: '/:chat_id' });
  });
  this.route('profile', function () {
    this.route('edit');
  });
});
