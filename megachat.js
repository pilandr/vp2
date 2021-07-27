import LoginWindow from './ui/loginWindow.js';
import MainWindow from './ui/mainWindow.js';
// import UserName from './ui/userName';
import UserList from './ui/userList.js';
import UserPhoto from './ui/userPhoto.js';
import MessageList from './ui/messageList.js';
import MessageSender from './ui/messageSender.js';
import WSClient from './wsClient.js';

export default class MegaChat {
  constructor() {
    this.wsClient = new WSClient(
       `ws://localhost:5501`,
      this.onMessage.bind(this)
    );

    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('.start_page'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('.chat')),
      // userName: new UserName(document.querySelector('[data-role=user-name]')),
      userList: new UserList(document.querySelector('.chat__users'),document.querySelector('.chat__count')),
      messageList: new MessageList(document.querySelector('.chat__messages')),
      messageSender: new MessageSender(
         document.querySelector('.chat__sender'),
         this.onSend.bind(this)
      ),
      userPhoto: new UserPhoto(
         document.querySelector('.modal'),
         this.onUpload.bind(this)
      ),
    };

    this.ui.loginWindow.show();
    
  }

  onUpload(data) {
    // this.ui.userPhoto.set(data);
    this.wsClient.sendAvatar(data);
    // fetch('/mega-chat-3/upload-photo', {
    //   method: 'post',
    //   body: JSON.stringify({
    //     name: this.ui.userName.get(),
    //     image: data,
    //   }),
    // });
  }

  onSend(message) {
    this.wsClient.sendTextMessage(message);
    this.ui.messageSender.clear();
  }

  async onLogin(name) {
    await this.wsClient.connect();
    this.ui.messageList.setName(name);
    this.ui.userPhoto.setName(name);
    this.ui.userPhoto.setPhoto(name);
    this.wsClient.sendHello(name);
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    //this.ui.userName.set(name);
    //this.ui.userPhoto.set(`/mega-chat-3/photos/${name}.png?t=${Date.now()}`);
  }

  onMessage({ type, from, data }) {
    
    console.log(type, from, data);

    if (type === 'hello') {
      this.ui.userList.add(data);
      this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
    } else if (type === 'user-list') {
      console.log(data);
      for (const item of data) {
        this.ui.userList.add(item);
      }
    } else if (type === 'bye-bye') {
      this.ui.userList.remove(from);
      this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
    } else if (type === 'text-message') {
      this.ui.messageList.add(from, data.message);
      this.ui.userList.lastMessage(from, data.message);
    } else if (type === 'avatar') {
      const avatars = document.querySelectorAll(
        `[data-user="${from}"]`
      );
      console.log(avatars);
      for (const avatar of avatars) {
        avatar.src = data.base64;
      }
    }
  }
}
