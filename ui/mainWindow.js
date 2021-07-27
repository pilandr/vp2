export default class MainWindow {
  constructor(element) {
    this.element = element;
    const btnChoiceAvatar = document.querySelector(".chat__hamburger-link");
    btnChoiceAvatar.addEventListener("click", (e) => {
      e.preventDefault();
      var ChoiceAvatar = document.getElementById("myModal");
      ChoiceAvatar.style.display = "flex";
      const btnClose = ChoiceAvatar.querySelector(".modal__close")
      btnClose.addEventListener("click", (e) => {
        ChoiceAvatar.style.display = "none";
      });
    });
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
