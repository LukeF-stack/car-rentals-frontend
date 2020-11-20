import { App } from './../components/App.js'
import { Notify } from './../components/Notify.js'
import { Contact } from '../components/Contact.js';
import { User } from './../components/User.js';
import { Auth } from '../components/Auth.js';

function contactPageController(){

    // methods
    // run App.loadPage with submitContactFormEvent callback function
        App.loadPage('Contact', 'template-page-contact', {}, submitContactFormEvent );
        // callback
        function submitContactFormEvent() {
        let addContactForm = document.querySelector('#form-contact');
        // listen for contact form submit event
        addContactForm.addEventListener('submit', (e) => {
            // prevent default behaviour
            e.preventDefault();
            // create empty form data object
            let formDataObj = {}
            // create new form data using contact form input data
            let formData = new FormData(addContactForm);
            for(let entry of formData.entries()) {
                formDataObj[entry[0]] = entry[1];
            }
            // create contactForm object with input data
            const contactForm = {
                Name: formDataObj.name,
                Email:  formDataObj.email,
                Body: formDataObj.body,
            }
            // if the form name, email and body are entered 
            if (formDataObj.name && (formDataObj.email && (formDataObj.body))){
                // run Contact.create with the contactForm object data
                Contact.create(contactForm);
            } else { // else notify that all fields must be complete
                Notify.show('All fields must be completed');
            }
        });
    }
};

export { contactPageController }