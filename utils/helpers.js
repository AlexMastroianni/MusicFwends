const { passwordStrength } = require('check-password-strength');

// Helper function to check a new passwords strength
function checkPasswordStgh(password) {
  if (password) {
    console.log(passwordStrength(password).value);
  }
}
checkPasswordStgh(password);

modules.exports = checkPasswordStgh;