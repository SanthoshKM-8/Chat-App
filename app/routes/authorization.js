import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthorizationRoute extends Route {
  @service router;

  beforeModel(transition) {
    const userId = sessionStorage.getItem('currentUser');
    if (!userId) {
      this.controllerFor('home').set('previousTransition', transition);
      this.router.transitionTo('home');
    }
  }
}
