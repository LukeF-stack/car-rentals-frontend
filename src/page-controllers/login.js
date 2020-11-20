import { App } from './../components/App.js'
import { Notify } from './../components/Notify.js'
import { User } from '../components/User.js';
import { Auth } from '../components/Auth.js';

// login page controller
function loginPageController(){
    // data
    let data = {
        intro: "Sign In",
    }
    // run App.loadPage with logInEvent callback
    App.loadPage('Log In', 'template-page-login', data, logInEvent );
    // callback
    function logInEvent() {
    let signInForm = document.querySelector('#form-sign-in');
    // listen fot sign in form submission
    signInForm.addEventListener('submit', (e) => {
        // prevent default submit behaviour
        e.preventDefault();
        //create empty form data object
        let formDataObj = {}
        // create new form data using signin form input data
        let formData = new FormData(signInForm);
        for(let entry of formData.entries()) { 
            formDataObj[entry[0]] = entry[1];
        }
        // run Auth.Login with formDataObj parameters
        Auth.logIn(formDataObj);
    });
}
};

export { loginPageController }