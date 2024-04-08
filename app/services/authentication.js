import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthenticationService extends Service {
  @tracked isAuthenticated = false;
  userId = null;

  login(userId) {
    this.toggleProperty('isAuthenticated');
    this.userId = userId;
  }

  logout() {
    this.toggleProperty('isAuthenticated');
    this.userId = null;
  }
}
