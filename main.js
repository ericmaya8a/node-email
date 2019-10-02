const alert = document.querySelector('.alert');
const button = document.querySelector('button[type="submit"]');
const form = document.querySelector('form');
const message = document.getElementById('message');
const to = document.getElementById('to');
const timeout = 3000;

const handleAlert = status => {
  alert.classList.add(status ? 'alert-success' : 'alert-danger');
  alert.innerHTML = status
    ? 'Email successfully sent.'
    : 'An error occured, try again later.';
  to.value = '';
  message.value = '';
  button.innerHTML = 'Submit';
  button.removeAttribute('disabled');
  setTimeout(() => {
    alert.classList.remove('alert-success', 'alert-danger');
    alert.innerHTML = '';
  }, timeout);
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const payload = { to: e.target[0].value, message: e.target[1].value };
  button.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  button.setAttribute('disabled', 'true');
  axios({
    method: 'post',
    url: '/send-email',
    data: payload
  }).then(({ data }) => {
    if (data.result === 0) {
      handleAlert(true);
    } else {
      handleAlert();
    }
  });
});
