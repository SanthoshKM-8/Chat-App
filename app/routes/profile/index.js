import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileIndexRoute extends Route {
  @service router;

  async model() {
    const userId = sessionStorage.getItem('currentUser');
    // console.log(userId);
    // if (userId) {
    let userResponse = await fetch(`/user/${userId}`);
    let user = await userResponse.json();
    // console.log(user);
    return user;
    // }
  }
}
