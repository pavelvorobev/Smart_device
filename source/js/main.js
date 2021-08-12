(function () {
  const footerToggles = document.querySelectorAll('.footer__toggle');
  const callButton = document.querySelector('.info__button');
  const modals = document.querySelector('.modals');
  const callForm = document.querySelector('.modals__call-form');
  const callFormClose = document.querySelector('.call-form__close-button');
  const modalNameInput = document.querySelector('#name-2');
  const modalPhoneInput = document.querySelector('#phone-2');
  const modalQuestionInput = document.querySelector('#question-2');

  const onEscClose = (e) =>{
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      modals.classList.remove('visible');
      modals.classList.add('hidden');
      document.removeEventListener('keydown', onEscClose);
    }
  };

  callForm.addEventListener('submit', () => {
    localStorage.setItem('name', modalNameInput.value);
    localStorage.setItem('phone', modalPhoneInput.value);
    localStorage.setItem('question', modalQuestionInput.value);
  });

  callButton.addEventListener('click', () => {
    modals.classList.remove('hidden');
    modals.classList.add('visible');
    modalNameInput.focus();

    modals.addEventListener('click', (e) => {
      if (e.target.closest('.modals__call-form') === null) {
        modals.classList.remove('visible');
        modals.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', onEscClose);
  });

  callFormClose.addEventListener('click', () => {
    modals.classList.remove('visible');
    modals.classList.add('hidden');
  });

  [].forEach.call(document.querySelectorAll('input[data-name="phone"]'),
      function (input) {
        let keyCode;
        function mask(event) {
          let pos = input.selectionStart;

          if (pos < 2) {
            event.preventDefault();
          }

          let matrix = '+7 (___) ___-__-__';
          let i = 0;
          let def = matrix.replace(/\D/g, '');
          let val = input.value.replace(/\D/g, '');
          let newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
          i = newValue.indexOf('_');
          if (i !== -1) {
            newValue = newValue.slice(0, i);
          }
          let reg = matrix.substr(0, input.value.length).replace(/_+/g,
              function (a) {
                return '\\d{1,' + a.length + '}';
              }).replace(/[+()]/g, '\\$&');
          reg = new RegExp('^' + reg + '$');
          if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
            input.value = newValue;
          }
          if (event.type === 'blur' && input.value.length < 5) {
            input.value = '';
          }
        }

        input.addEventListener('input', mask, false);
        input.addEventListener('focus', mask, false);
        input.addEventListener('blur', mask, false);
        input.addEventListener('keydown', mask, false);
      });

  if (window.innerWidth < 767) {

    footerToggles.forEach((item) => {
      item.classList.add('closed');

      item.addEventListener('click', (e) => {
        if (e.target.closest('.footer__header-wrapper')) {
          if (item.classList.contains('closed')) {
            footerToggles.forEach((toggle) => {
              if (toggle.classList.contains('opened')) {
                toggle.classList.remove('opened');
                toggle.classList.add('closed');
              }
            });

            item.classList.remove('closed');
            item.classList.add('opened');

          } else if (item.classList.contains('opened')) {
            item.classList.remove('opened');
            item.classList.add('closed');
          }
        }
      });
    });
  }
})();
