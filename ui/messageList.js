//import { sanitize } from '../utils';

export default class MessageList {
  constructor(element) {
    this.element = element;
    this.from = "";
  }

  add(from, text) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    const item = document.createElement('div');
    if (this.name === from) {
      item.classList.add('chat__message', "mymessage");
    } else {
      item.classList.add('chat__message');
    }
    
    // item.innerHTML = `
    // <div class="message-item-left">
    //     <div
    //     style="background-image: url(/mega-chat-3/photos/${from}.png?t=${Date.now()})" 
    //     class="message-item-photo" data-role="user-avatar" data-user=${sanitize(
    //       from
    //     )}></div>
    // </div>
    // <div class="message-item-right">
    //   <div class="message-item-header">
    //       <div class="message-item-header-name">${sanitize(from)}</div>
    //       <div class="message-item-header-time">${time}</div>
    //   </div>
    //   <div class="message-item-text">${sanitize(text)}</div>
    // </div>
    // `;

    const listUser = document.querySelector(".chat__users");
    const imgUser = listUser.querySelector(`[data-user="${from}"]`);

    if (from === this.from) {
      item.innerHTML = `
      <div class="message">
        <div class="message__avatar">
        </div>
        <div class="message__area">
          <div class="message__text">${text}</div>
          <div class="message__time">${time}</div>
        </div>
      </div>
    `;
    } else {
      item.innerHTML = `
    <div class="message">
      <div class="message__avatar">
        <img src="${imgUser.src}" alt="" data-user="${from}" class="message__img">
      </div>
      <div class="message__content">
        <div class="message__nickname">${from}</div>
        <div class="message__area">
          <div class="message__text">${text}</div>
          <div class="message__time">${time}</div>
        </div>
      </div>
    </div>
    `;
    }

    

    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
    this.from = from;
  }

  addSystemMessage(message) {
    const item = document.createElement('div');

    item.classList.add('message__system');
    item.textContent = message;

    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
  }

  setName(name) {
    this.name = name;
    
  }
}
