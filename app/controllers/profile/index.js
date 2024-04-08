import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileIndexController extends Controller {
  @service router;

  @action
  editUser() {
    this.router.transitionTo('profile.edit');
  }
}
