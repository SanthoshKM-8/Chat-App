import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  // @service('authentication') auth;
  // @service router;
  // @tracked isUserSelected;
  // @tracked userName;
  // // get userAuthenticated() {
  // //   return this.auth.isAuthenticated;
  // // }
  // // @tracked
  // get isUserSelected() {
  //   const userId = sessionStorage.getItem('currentUser');
  //   if (userId) {
  //     (async () => {
  //       let userResponse = await fetch(`/user/${userId}`);
  //       let user = await userResponse.json();
  //       this.userName = user.name;
  //     })();
  //     return true;
  //   }
  //   return false;
  // }
  // set isUserSelected(value) {
  //   console.log(value);
  //   this.set('isUserSelected', value);
  // }
  // @action
  // async selectUser() {
  //   const userId = document.querySelector('#user').value;
  //   sessionStorage.setItem('currentUser', userId);
  //   // console.log(userId);
  //   // let userResponse = await fetch(`/user/${userId}`);
  //   // let user = await userResponse.json();
  //   // this.userName = user.name;
  //   this.set('isUserSelected', true);
  //   // this.auth.login(userId);
  //   // this.router.transitionTo('chats');
  // }
  // @action
  // changeUser() {
  //   this.set('isUserSelected', false);
  //   sessionStorage.removeItem('currentUser');
  // }
}
