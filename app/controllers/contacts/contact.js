import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsContactController extends Controller {
  @service router;

  @action
  async chat() {
    let chatId;
    let chatRes = await fetch(`/chats?userIds=${this.userId1},${this.userId2}`);
    let chat = await chatRes.json();

    if (chat.length == 0) {
      let data = {
        userId1: this.userId1,
        userId2: this.userId2,
      };
      let chatResponse = await fetch('/chats', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      chat = await chatResponse.json();
      chatId = chat.id;
    } else {
      chatId = chat[0].id;
    }
    // console.log(chat);
    this.router.transitionTo('chats.chat', chatId);
  }
}
