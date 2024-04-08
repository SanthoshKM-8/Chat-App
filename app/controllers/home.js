import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service router;

  @action
  selectUser() {
    const userId = document.querySelector('#user').value;
    sessionStorage.setItem('currentUser', userId);
    // console.log(userId);
    this.router.refresh();
    let previousTransition = this.previousTransition;
    if (previousTransition) {
      this.previousTransition = null;
      previousTransition.retry();
    }
  }

  @action
  changeUser() {
    sessionStorage.clear();
    this.router.refresh();
  }
}
