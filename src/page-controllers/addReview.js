import { App } from './../components/App.js'
import { Notify } from './../components/Notify.js'
import { Review } from '../components/Review.js';
import { User } from './../components/User.js';
import { Auth } from '../components/Auth.js';

function addReviewPageController(){
    // page controller for add review page
    // if the user is authenticated 
    if (Auth.authenticated == true) {
        // run App.loadpage() with addReviewEvent callback
        App.loadPage('Add Review', 'template-page-add_review', {}, addReviewEvent );
        // callback
        function addReviewEvent() {
            // listen for add review form submission
        let addReviewForm = document.querySelector('#form-add_review');
        addReviewForm.addEventListener('submit', (e) => {
            // prevent default behaviour
            e.preventDefault();
            //get car id from url query
            const carObjId = location.toString().split("?id=")[1]; 
            // create empty form data object
            let formDataObj = {}
            // create form data from add review form data
            let formData = new FormData(addReviewForm);
            // for each of the entries set entry index[0] to entry index [1]
            for(let entry of formData.entries()) {
                formDataObj[entry[0]] = entry[1];
            }
            // create a user review object
            const userReview = {
                Name: User.firstName,
                Car_id: carObjId,
                Body: formDataObj.body,
                User_id: User.id
            }
            // run Review.create with the user review object
            Review.create(userReview);
        });
    }
    } else { // else if the user isn't authenticated
        // Notify them to create account
        Notify.show('You need an account to leave a review')
        // go to login page
        location.hash = '#login';
    }
};

export { addReviewPageController }