import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatsChatRoute extends Route {
  @service router;

  // constructor() {
  //   super(...arguments);

  //   this.router.on('routeWillChange', (transition) => {
  //     console.log(transition);
  //     if (
  //       !transition.to.find((route) => route.name === this.routeName) &&
  //       !(this.controller.text === '') &&
  //       !confirm('Are you sure you want to abandon progress?')
  //     ) {
  //       transition.abort();
  //     }
  //   });
  // }

  async model(params) {
    const chatId = params.chat_id;
    let chatResponse = await fetch(`/chat/${chatId}`);
    let chat = await chatResponse.json();
    if (chat.length == 0) {
      this.router.transitionTo('chats');
    }
    let messagesResponse = await fetch(`/messages?chatId=${chatId}`);
    let messages = await messagesResponse.json();
    return {
      chat,
      messages,
    };
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    const senderId = sessionStorage.getItem('currentUser');
    let senderName, receiverName, receiverId;
    if (model.chat.userId1 == senderId) {
      senderName = model.chat.userName1;
      receiverName = model.chat.userName2;
      receiverId = model.chat.userId2;
    } else {
      senderName = model.chat.userName2;
      receiverName = model.chat.userName1;
      receiverId = model.chat.userId1;
    }
    controller.setProperties({
      chatId: model.chat.id,
      senderId,
      senderName,
      receiverId,
      receiverName,
      text: '',
    });
  }

  @action
  willTransition(transition) {
    if (
      !transition.to.find((route) => route.name === this.routeName) &&
      !(this.controller.text === '') &&
      !confirm('You typed message. Are you sure?')
    ) {
      transition.abort();
    }
  }
}
