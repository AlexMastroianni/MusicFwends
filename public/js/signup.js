// const { passwordStrength } = require('check-password-strength');
// const { passwordStrength : checkPasswordStgh } = require('./index');


const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();


  if (name && email && password) {
    const response = await fetch('/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/feed');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

let strengthText = document.querySelector('#password-strength-result');
let passwordInput = document.querySelector('#password-signup');

const defaultOptions = [
  {
    id: 0,
    value: 'Too weak',
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: 'Weak',
    minDiversity: 2,
    minLength: 6
  },
  {
    id: 2,
    value: 'Medium',
    minDiversity: 4,
    minLength: 8
  },
  {
    id: 3,
    value: 'Strong',
    minDiversity: 4,
    minLength: 10
  }
];

const passwordStrength = (password, options = defaultOptions, allowedSymbols = '!"#\$%&\'\(\)\*\+,-\./:;<=>\?@\[\\\\\\]\^_`\{|\}~') => {

  let passwordCopy = password || '';

  options[0].minDiversity = 0,
  options[0].minLength = 0;

  const rules = [
    {
      regex: '[a-z]',
      message: 'lowercase'
    },
    {
      regex: '[A-Z]',
      message: 'uppercase'
    },
    {
      regex: '[0-9]',
      message: 'number'
    },
  ];

  if (allowedSymbols) {
    rules.push({
      regex: `[${allowedSymbols}]`,
      message: 'symbol'
    });
  }

  let strength = {};

  strength.contains = rules
    .filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy))
    .map(rule => rule.message);

  strength.length = passwordCopy.length;

  let fulfilledOptions = options
    .filter(option => strength.contains.length >= option.minDiversity)
    .filter(option => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map(option => ({ id: option.id, value: option.value }));

  Object.assign(strength, fulfilledOptions[0]);

  return strength;
};

const checkStrength = () => {
  let indicator = passwordStrength(passwordInput.value).value;
  strengthText.innerText = indicator;
};

passwordInput.addEventListener('input', checkStrength);