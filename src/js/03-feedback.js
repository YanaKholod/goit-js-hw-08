import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageText = document.querySelector('textarea[name="message"]');

form.addEventListener(
  'input',
  throttle(e => {
    const data = { email: emailInput.value, message: messageText.value };
    localStorage.setItem('feedback-form-state', JSON.stringify(data), 500);
  })
);

form.addEventListener('submit', e => {
  e.preventDefault();

  if (emailInput.value === '' || messageText.value === '') {
    return alert('all fields must be filled');
  }
  console.log({ email: emailInput.value, message: messageText.value });
  form.reset();
  localStorage.removeItem('feedback-form-state');
});
const required = key => {
  try {
    const state = localStorage.getItem(key);
    return state === null ? undefined : JSON.parse(state);
  } catch (error) {
    console.log('Error state:', error.message);
  }
};

const dataStorage = required('feedback-form-state');

if (dataStorage) {
  emailInput.value = dataStorage.email;
  messageText.value = dataStorage.message;
}
