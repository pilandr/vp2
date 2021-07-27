export default class UserPhoto {
  constructor(element, onUpload) {
    this.element = element;
    this.onUpload = onUpload;
    const btnChoiceAvatar = document.querySelector(".chat__hamburger-link");
    const fotoArea = this.element.querySelector(".modal__foto");
    btnChoiceAvatar.addEventListener("click", (e) => {
      e.preventDefault();
      //var ChoiceAvatar = this.element.getElementById("myModal");
      this.element.style.display = "flex";
      const btnClose = this.element.querySelector(".modal__close")
      btnClose.addEventListener("click", (e) => {
        this.element.style.display = "none";
      });
    });
    fotoArea.addEventListener('dragover', (e) => {
      if (e.dataTransfer.items.length && e.dataTransfer.items[0].kind === 'file') {
        e.preventDefault();
      }
    });

    fotoArea.addEventListener('drop', (e) => {
      const file = e.dataTransfer.items[0].getAsFile();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('load', (e) => {
        
        //console.log("load");
        this.onUpload(reader.result);
        e.preventDefault();
      });
      e.preventDefault();
    });
   }

   setName(name) {
     const nickName = this.element.querySelector(".modal__nickname");
     nickName.textContent = name;
   }

   setPhoto(name) {
    const avatar = this.element.querySelector(".modal__pic");
    avatar.dataset.user = name;
  }
  // set(photo) {
  //   this.element.style.backgroundImage = `url(${photo})`;
  // }
}
