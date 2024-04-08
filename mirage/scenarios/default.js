export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  if (!localStorage.getItem('users')) {
    let users = server.createList('user', 5);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('chats', JSON.stringify([]));
    localStorage.setItem('messages', JSON.stringify([]));
    localStorage.setItem('lastChatId', 0);
    localStorage.setItem('lastMessageId', 0);
  }

  // let users = JSON.parse(localStorage.getItem('users'));
  // let chats = JSON.parse(localStorage.getItem('chats'));
  // let messages = JSON.parse(localStorage.getItem('messages'));
  // users.forEach((user) => {
  //   server.create('user', user);
  // });
  // chats.forEach((chat) => {
  //   server.create('chat', chat);
  // });
  // messages.forEach((message) => {
  //   server.create('message', message);
  // });

  console.log(server.db.dump());
}
