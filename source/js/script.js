const footerToggles = document.querySelectorAll(".footer__toggle");
const callButton = document.querySelector(".info__button");
const modals = document.querySelector(".modals");
const callForm = document.querySelector(".modals__call-form")
const callFormClose = document.querySelector(".modals__call-form--close");
const modalNameInput = document.querySelector("#name-2");
const modalPhoneInput = document.querySelector("#phone-2");
const modalQuestionInput = document.querySelector("#question-2");
const modalSubmitButton = document.querySelector("button[type='submit']");

const onEscClose = (e) =>{
  if (e.key === 'Escape' || e.key === 'Esc') {
    e.preventDefault();
    modals.classList.remove("visible");
    modals.classList.add("hidden");
    document.removeEventListener("keydown", onEscClose);
  }
};

callForm.addEventListener("submit", (e) => {
  console.log("ghbsdgv");
  localStorage.setItem("name", modalNameInput.value);
  localStorage.setItem("phone", modalPhoneInput.value);
  localStorage.setItem("question", modalQuestionInput.value);
});

callButton.addEventListener("click", () => {
  modals.classList.remove("hidden");
  modals.classList.add("visible");
  modalNameInput.focus();

  modals.addEventListener("click", (e) => {
    if (e.target.closest(".modals__call-form") == null) {
      modals.classList.remove("visible");
      modals.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", onEscClose);
});

callFormClose.addEventListener("click", () => {
  modals.classList.remove("visible");
  modals.classList.add("hidden");
});

if (window.innerWidth < 767) {

footerToggles.forEach((item) => {
  item.classList.add("closed");

  item.addEventListener("click", (e) => {
    if (e.target.closest(".footer__header-wrapper")) {
      if (item.classList.contains("closed")) {
        footerToggles.forEach((item) => {
          if (item.classList.contains("opened")) {
            item.classList.remove("opened");
            item.classList.add("closed");
          }
        });

        item.classList.remove("closed");
        item.classList.add("opened");

      } else if (item.classList.contains("opened")) {
        item.classList.remove("opened");
        item.classList.add("closed");
      }
    }
  });
});
}
