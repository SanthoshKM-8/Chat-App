import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileEditController extends Controller {
  @service router;

  @action
  async updateProfile() {
    let data = {
      name: this.user.name,
      mobileNo: this.user.mobileNo,
      emailId: this.user.emailId,
      profileImg: this.user.profileImg,
    };
    let response = await fetch(`/user/${this.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    this.router.transitionTo('profile');
  }

  @action
  cancel() {
    this.router.transitionTo('profile');
  }
}
