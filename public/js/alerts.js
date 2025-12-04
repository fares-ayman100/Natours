export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (state, msg, time = 5) => {
  const markup = `<div class="alert alert--${state}">${msg}</div>`;
  document
    .querySelector('body')
    .insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(() => {
    hideAlert();
  }, time * 1000);
};
