import Route from '@ember/routing/route';

export default class HomeRoute extends Route {
  userId;
  userName;

  async model() {
    this.userId = sessionStorage.getItem('currentUser');
    if (!this.userId) {
      let usersResponse = await fetch('/users');
      let users = await usersResponse.json();
      // console.log(users);
      return users;
    } else {
      let userResponse = await fetch(`/user/${this.userId}`);
      let user = await userResponse.json();
      this.userName = user.name;
    }
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    if (this.userId) {
      controller.set('isUserSelected', true);
      controller.set('userName', this.userName);
    } else {
      controller.set('isUserSelected', false);
      controller.set('userName', null);
    }
  }
}
