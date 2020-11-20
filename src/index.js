// Imports -- components ---------------------------------------------
import { App } from './components/App.js';

import { Car } from './components/Car.js';

import { Auth } from './components/Auth.js';

// Imports -- pageControllers ----------------------------------------

import { carsPageController } from './page-controllers/carsResults.js'

import { homePageController } from './page-controllers/home.js'

import { userProfilePageController } from './page-controllers/userProfile.js'

import { contactPageController } from './page-controllers/contact.js'

import { locationPageController } from './page-controllers/location.js'

import { loginPageController } from './page-controllers/login.js'

import { signupPageController } from './page-controllers/signup.js'

import { selectedCarPageController } from './page-controllers/selectedCar.js'

import { addReviewPageController } from './page-controllers/addReview.js'

import { reviewsPageController } from './page-controllers/reviews.js'


// Routes ---------------------------------------------
// # (home) 
App.addRoute('#', homePageController);

// #cars 
App.addRoute('#cars', carsPageController);

// #userProfile
App.addRoute('#userProfile', userProfilePageController);

// #contact
App.addRoute('#contact', contactPageController);

// #location
App.addRoute('#location', locationPageController);

// #login
App.addRoute('#login', loginPageController);

// #signup
App.addRoute('#signup', signupPageController);

// #addReview
App.addRoute('#addReview', addReviewPageController);

// Log out
App.addRoute('#logout', () => {
    Auth.logOut();
});


// Create routes for car pages & car reviews, 
function prepareRoutes () {
    return new Promise((resolve,reject) => {
        // get all cars from API
        Car.get()
        .then((cars) => {
             cars.forEach(car => {
                 // create a car page, review page and add reviews page for each car found
                App.addRoute(`#cars?ids=${car._id}`, selectedCarPageController);
                App.addRoute(`#addReview?id=${car._id}`, addReviewPageController);
                App.addRoute(`#reviews?id=${car._id}`, reviewsPageController);
            });
            // resolve the promise so app can initialise
            resolve();
        })
        // catch errors
        .catch(err => {
            console.log(err);
            reject();
        })
    });
}

// Load app once routes are created -------------------------------------------
function startApp (){
    App.init();
}

async function awaitRoutes (){
    // wait for Car.get() request to create car page & car review routes
    let res = await prepareRoutes();
    // run startApp() once the car page & car review routes are created 
    startApp();
}
// run awaitRoutes() once the DOM is finsished loading
document.addEventListener('DOMContentLoaded', awaitRoutes);


    





