import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileEditRoute extends Route {
  @service router;

  async model() {
    const userId = sessionStorage.getItem('currentUser');
    let userResponse = await fetch(`/user/${userId}`);
    let user = await userResponse.json();
    // console.log(user);
    return user;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('user', model);
  }
}
