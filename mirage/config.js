import {
  discoverEmberDataModels,
  // applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    // Remove discoverEmberDataModels if you do not want ember-cli-mirage to auto discover the ember models
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models,
    },
    // uncomment to opt into ember-cli-mirage to auto discover ember serializers
    // serializers: applyEmberDataSerializers(config.serializers),
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  // These comments are here to help you get started. Feel free to delete them.
  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://miragejs.com/docs/getting-started/overview/
  */

  // this.timing = 500;
  this.get('/users', function (schema, request) {
    // console.log(schema.db);
    let users = JSON.parse(localStorage.getItem('users'));
    return users;
    // return schema.db.users;
  });

  this.get('/user/:id', function (schema, request) {
    const id = request.params.id;
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.filter((user) => user.id == id)[0];
    return user;
    // return schema.db.users.find(id);
  });

  this.put('/user/:id', function (schema, request) {
    const id = request.params.id;
    let data = JSON.parse(request.requestBody);
    let users = JSON.parse(localStorage.getItem('users'));
    let user = users.filter((user) => {
      if (user.id == id) {
        user.name = data.name;
        user.mobileNo = data.mobileNo;
        user.emailId = data.emailId;
        user.profileImg = data.profileImg;
        return true;
      }
    })[0];
    localStorage.setItem('users', JSON.stringify(users));
    return user;
    // return schema.db.users.update(id, data);
  });

  this.get('/chats', function (schema, request) {
    let chats;
    let chatsRes = JSON.parse(localStorage.getItem('chats'));
    if (request.queryParams.userId) {
      const userId = request.queryParams.userId;
      chats = chatsRes.filter(
        (chat) => chat.userId1 == userId || chat.userId2 == userId
      );
      // chats = schema.db.chats.where(
      //   (chat) => chat.userId1 == userId || chat.userId2 == userId
      // );
    } else {
      const userIds = request.queryParams.userIds.split(',');
      const userId1 = userIds[0];
      const userId2 = userIds[1];
      chats = chatsRes.filter(
        (chat) =>
          (chat.userId1 == userId1 && chat.userId2 == userId2) ||
          (chat.userId1 == userId2 && chat.userId2 == userId1)
      );
      // chats = schema.db.chats.where(
      //   (chat) =>
      //     (chat.userId1 == userId1 && chat.userId2 == userId2) ||
      //     (chat.userId1 == userId2 && chat.userId2 == userId1)
      // );
    }
    chats.forEach((chat) => {
      let users = JSON.parse(localStorage.getItem('users'));
      let user1 = users.filter((user) => user.id == chat.userId1)[0];
      let user2 = users.filter((user) => user.id == chat.userId2)[0];
      // let user1 = schema.db.users.find(chat.userId1);
      // let user2 = schema.db.users.find(chat.userId2);
      chat.userName1 = user1.name;
      chat.userName2 = user2.name;
    });
    return chats;
  });

  this.post('/chats', function (schema, request) {
    let data = JSON.parse(request.requestBody);
    let lastChatId = localStorage.getItem('lastChatId');
    data.id = Number(lastChatId) + 1;
    localStorage.setItem('lastChatId', data.id);
    // let chat = schema.db.chats.insert(data);
    let chats = JSON.parse(localStorage.getItem('chats'));
    chats.push(data);
    localStorage.setItem('chats', JSON.stringify(chats));
    return data;
    // return schema.db.chats.insert(data);
  });

  this.get('/chat/:id', function (schema, request) {
    const id = request.params.id;

    let chats = JSON.parse(localStorage.getItem('chats'));
    let chat = chats.filter((chat) => chat.id == id)[0];
    let users = JSON.parse(localStorage.getItem('users'));
    let user1 = users.filter((user) => user.id == chat.userId1)[0];
    let user2 = users.filter((user) => user.id == chat.userId2)[0];

    // let chat = schema.db.chats.find(id);
    // let user1 = schema.db.users.find(chat.userId1);
    // let user2 = schema.db.users.find(chat.userId2);
    chat.userName1 = user1.name;
    chat.userName2 = user2.name;
    return chat;
  });

  this.get('/messages', function (schema, request) {
    const chatId = request.queryParams.chatId;
    let messages = JSON.parse(localStorage.getItem('messages'));
    let chatMessages = messages.filter((message) => message.chatId == chatId);
    chatMessages.forEach((message) => {
      let users = JSON.parse(localStorage.getItem('users'));
      let sender = users.filter((user) => user.id == message.senderId)[0];
      message.senderName = sender.name;
    });
    return chatMessages;

    // let messages = schema.db.messages.where(
    //   (message) => message.chatId == chatId
    // );
    // messages.forEach((message) => {
    //   let sender = schema.db.users.find(message.senderId);
    //   message.senderName = sender.name;
    // });
    // return messages;
  });

  this.post('/messages', function (schema, request) {
    let data = JSON.parse(request.requestBody);
    let lastMessageId = localStorage.getItem('lastMessageId');
    data.id = Number(lastMessageId) + 1;
    localStorage.setItem('lastMessageId', data.id);
    let messages = JSON.parse(localStorage.getItem('messages'));
    // let message = schema.db.messages.insert(data);
    messages.push(data);
    localStorage.setItem('messages', JSON.stringify(messages));
    return data;
    // return schema.db.messages.insert(data);
  });
}
