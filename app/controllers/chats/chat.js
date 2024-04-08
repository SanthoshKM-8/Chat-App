import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChatsChatController extends Controller {
  @service router;

  @action
  async sendMessage() {
    let date = new Date();
    let data = {
      chatId: this.chatId,
      senderId: this.senderId,
      text: this.text,
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
    await fetch('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.router.refresh();
  }
}
