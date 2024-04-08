import AuthorizationRoute from './authorization';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default class ChatsRoute extends AuthorizationRoute {
  @service('authentication') auth;
  @service router;
  userId;

  async model() {
    this.userId = JSON.parse(sessionStorage.getItem('currentUser'));
    let userName;

    let chatsResponse = await fetch(`/chats?userId=${this.userId}`);
    let chats = await chatsResponse.json();
    // console.log(chats);

    // if (chats.length == 4) {
    //   return chats;
    // }

    // let usersWithoutChat = A();

    // let usersResponse = await fetch('/users');
    // let users = await usersResponse.json();
    // console.log(users);

    // users.forEach((user) => {
    //   if (user.id !== userId) {
    //     let obj = { userId: user.id, userName: user.name };
    //     usersWithoutChat.pushObject(obj);
    //   } else {
    //     userName = user.name;
    //   }
    // });

    // chats.forEach((chat) => {
    //   if (chat.userId1 == userId) {
    //     usersWithoutChat.forEach((user) => {
    //       if (user.userId == chat.userId2) {
    //         usersWithoutChat.removeObject(user);
    //         return;
    //       }
    //     });
    //   } else {
    //     usersWithoutChat.forEach((user) => {
    //       if (user.userId == chat.userId1) {
    //         usersWithoutChat.removeObject(user);
    //         return;
    //       }
    //     });
    //   }
    // });

    // console.log(usersWithoutChat);

    // for (let i = 0; i < usersWithoutChat.length; i++) {
    //   let user = usersWithoutChat[i];
    //   let data = {
    //     userId1: userId,
    //     userId2: user.userId,
    //     userName1: userName,
    //     userName2: user.userName,
    //   };
    //   let chatResponse = await fetch('/chats', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //   });
    //   let chat = await chatResponse.json();
    //   chats.push(chat);
    // }

    // console.log(chats);
    return chats;
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('userId', String(this.userId));
  }
}
