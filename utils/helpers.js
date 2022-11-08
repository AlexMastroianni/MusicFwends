const { passwordStrength } = require('check-password-strength');

function checkPasswordStgh(password) {
  if (password) {
    console.log(passwordStrength(password).value);
  }
}
checkPasswordStgh(password);

modules.exports = checkPasswordStgh;