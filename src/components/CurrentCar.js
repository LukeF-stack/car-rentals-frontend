import { App } from './App.js';
import { Car } from './Car.js';
import { selectedCarPageController } from '../page-controllers/selectedCar.js';

const CurrentCar = {
    // methods
    // show selected car
   show: (car, selectedCarContent, callback ) => {
        //check if there is already a car rendered on the page
        let previousCar = document.querySelector('#selectedCar-content');
        if (previousCar){ // if there is already a car rendered, remove it and run loadCar function
            previousCar.remove();
            loadCar()
        } else { // else just run loadCar function
            loadCar();
        };
        // loads the car
        function loadCar() {
            // create a content div, set the id and set innerHTML to the selectedCarContent object
            let contentDiv = document.createElement('div');
            contentDiv.id = 'selectedCar-content';
            contentDiv.innerHTML = selectedCarContent;
            // create add review button
            let addReviewBtn =  document.createElement('a');
            addReviewBtn.classList.add('add_review-btn', 'button');
            addReviewBtn.innerHTML = '<h3>Add a Review</h3>';
            // set href to the route of the selected car
            addReviewBtn.href = `#addReview?id=${car._id}`;

            // create view reviews button
            let viewReviewsBtn =  document.createElement('a');
            viewReviewsBtn.classList.add('view_reviews-btn', 'button');
            viewReviewsBtn.innerHTML = '<h3>See Reviews</h3>';
            // set href to the route of the selected car
            viewReviewsBtn.href = `#reviews?id=${car._id}`;
    
            
            // if the main content div exists then append the content div to it
            if (document.querySelector('.main-content')){
                document.querySelector('.main-content').appendChild(contentDiv);
            }
            // if the main selectedCarContent div exists then append the add review button & view review button to it
            if (document.getElementById('selectedCar-content')){
                document.getElementById('selectedCar-content').appendChild(addReviewBtn);
                document.getElementById('selectedCar-content').appendChild(viewReviewsBtn);
            }

            // listen for page change
            window.addEventListener('hashchange', () => {
                // if the callback is a function, run it
                if( typeof callback === 'function' ){
                    callback();
                }
            })
        }
    },
    // remove the innerhtml from the selectedCar page
    hide: () => {
        let contentDiv = document.querySelector('#selectedCar-content');
        // if the contentDiv isn't empty then remove the content
        if (contentDiv !== null) {
        document.querySelector('#selectedCar-content').remove();
        }
    },
    // create a car route
    createCarRoute: (data) => {
        // create empty carObj
        const carObj = {};
        // set carObj data to data parameter
        carObj.data = data;
        // return the data
        return data;
    },
}

export { CurrentCar }