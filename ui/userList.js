export default class UserList {
  constructor(element, countElement) {
    this.element = element;
    this.items = new Set();
    this.countElement = countElement;
  }

  buildDOM() {
    const fragment = document.createDocumentFragment();
    let count = 0;
    this.element.innerHTML = '';

    for (const user of this.items) {
      count++;
      let lastMessage = "";
      if (user.lastM) {
        lastMessage = user.lastM;
      }
      const element = document.createElement('div');
      element.classList.add('chat__user-item');
      // element.textContent = name;
      // fragment.append(element);

      const html =
        `<div class="user">` +
        `<div class="user__foto">` +
        `<img src="${user.photo}" alt="" data-user="${user.userName}" class="user__pic">` +
        `</div>` +
        `<div class="user__info">` +
        `<div class="user__nickname">${user.userName}</div>` +
        `<div class="user__lastmessage">${lastMessage}</div>` +
        `</div>` +
        `</div>`;
      element.innerHTML = html;
      fragment.append(element);
    }

    this.countElement.textContent = `${count} человек`;

    this.element.append(fragment);
  }

  add(user) {
    this.items.add(user);
    //console.log(user);
    this.buildDOM();
  }

  remove(userDelete) {
    for (const user of this.items) {
      if (user.userName === userDelete) this.items.delete(user);
    }
    this.buildDOM();
  }

  lastMessage(from, message) {
    for (const user of this.items) {
      if (user.userName === from) {
        user.lastM = message;
      }
    }
    this.buildDOM();
  }
}
