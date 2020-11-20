import { App } from './../components/App.js'
import { Notify } from './../components/Notify.js'
import { User } from '../components/User.js';

// sign up page controller
function signupPageController(){
    // run App.loadPage with signUpEvent callback
    App.loadPage('Sign Up', 'template-page-signup', {}, signUpEvent );
    // callback
    function signUpEvent() {
    let signUpForm = document.querySelector('#form-sign-up');
    // listen for sign up form submission
    signUpForm.addEventListener('submit', (e) => {
        // prevent default submit behaviour
        e.preventDefault();
        // create empty form data object
        let formDataObj = {}
        // create new form data using signup form input data
        let formData = new FormData(signUpForm);
        for(let entry of formData.entries()) {
            formDataObj[entry[0]] = entry[1];
        }
        // run User.create with form data 
        User.create(formDataObj);
    });
}
};

export { signupPageController }