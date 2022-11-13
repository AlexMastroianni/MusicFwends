// Function to login
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/feed');
    } else {
      alert(response.statusText);
    }
  }
};

// Function to redirect the user to the signup page
// when the signup button is clicked
const signupBtnHandler = async (event) => {
  event.preventDefault();

  if (event) {
    console.log('the signup button has been clicked');
    const response = await fetch('/signup', {
      method: 'GET'
    });

    if (response.ok) {
      console.log('You have been redirected to the sign up page');
      document.location.replace('/signup');
    } else {
      console.error(err);
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#sign-up-btn')
  .addEventListener('click', signupBtnHandler);
