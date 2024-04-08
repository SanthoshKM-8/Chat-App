import AuthorizationRoute from './authorization';
import { inject as service } from '@ember/service';

export default class ContactsRoute extends AuthorizationRoute {
  @service router;

  async model() {
    const userId = sessionStorage.getItem('currentUser');
    let usersResponse = await fetch('/users');
    let users = await usersResponse.json();
    let contacts = users.filter((user) => user.id != userId);
    // console.log(contacts);
    return contacts;
  }
}
