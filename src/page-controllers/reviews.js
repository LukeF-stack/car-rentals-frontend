import { App } from './../components/App.js';
import { Review } from '../components/Review.js';
import { User } from '../components/User.js';
import { Notify } from '../components/Notify.js';

// reviews page controller
function reviewsPageController(){
    // data
    let data = {
        intro: "Reviews",
    }
    // run App.loadPage with retrunReviews callback
    App.loadPage('Reviews', 'template-page-reviews', data, returnReviews);
};
// callback - returns reviews for selected car
function returnReviews(){
    const reviewResultsDiv = document.querySelector('#review-results');
    // get selected car id from url
    const id = location.toString().split("?id=")[1]; 
        // run Review.getReviews with the selected car id as a parameter
        Review.getReviews({Car_id: id})
        .then(reviews => {
            // then if there are any reviews returned 
            if (reviews.length > 0){
                reviews.forEach(review => {
                    // create a review object using Review.createReviewObj
                    let reviewObj = Review.createReviewObj(review);
                    // append review to review results div
                    reviewResultsDiv.appendChild(reviewObj.el);
                    // give the review a unique id
                    let reviewResult = document.querySelector(`#review-${reviewObj.data._id}`);
                    // if the user is the one who left the review
                    if (User.id == reviewObj.data.User_id){

                        // create delete button
                        let deleteBtn = document.createElement('a');
                        deleteBtn.classList.add('delete-review-btn', 'button');
                        deleteBtn.innerText = "Delete"
                        reviewResult.appendChild(deleteBtn);
                        // listen for click on delete button
                        deleteBtn.addEventListener('click', () => {
                                // make delete request to the reviews/:id endpoint
                                fetch(`http://localhost:8081/api/reviews/${reviewObj.data._id}`, {method: 'DELETE'})
                                .then(res => {
                                    // console log the response
                                    console.log(res);
                                    // if the response wasn't a success response, show problem notification 
                                    if (res.status !== 200) {
                                        Notify.show('problem deleting review');
                                    } else { // else (success) show success notification & go back to selected car page
                                        Notify.show('review successfully deleted');
                                        location.hash = `cars?ids=${id}`;
                                    }
                                })
                                // catch errors
                                .catch(err => {
                                    console.log(err);
                                    Notify.show('problem deleting review');
                                })
                        })

                        // creat edit button
                        let editBtn = document.createElement('a');
                        editBtn.classList.add('edit-review-btn', 'button');
                        editBtn.innerText = "Edit"
                        reviewResult.appendChild(editBtn);
                        // listen for click on edit button
                        editBtn.addEventListener('click', () => {
                            // remove review html content
                            reviewResult.innerHTML = null;
                            // create a text area for edit
                            let editBox = document.createElement('textarea');
                            editBox.setAttribute('type', 'text');
                            editBox.setAttribute('maxlength', '500')
                            // set the text area text to the previous review body
                            editBox.innerText = reviewObj.data.Body;
                            editBox.classList.add('input-large', 'edit-review-input');
                            // append the editBox to the review result
                            reviewResult.appendChild(editBox);
                            // create save button
                            let saveBtn = document.createElement('a');
                            saveBtn.classList.add('save-review-btn', 'button');
                            saveBtn.innerText = "Save"
                            reviewResult.appendChild(saveBtn);

                            // listen for submit 
                            saveBtn.addEventListener('click', () => {
                                // make PUT request with new review body as request body
                                fetch(`http://localhost:8081/api/reviews/${reviewObj.data._id}`, {
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({Body: editBox.value})
                                })
                                .then(res => {
                                    // log the response
                                    console.log(res);
                                    // if the response wasn't a success response, show problem notification
                                    if (res.status !== 200) {
                                        Notify.show('problem updating review');
                                    } else { // else (success) show success notification & reload page
                                        Notify.show('review updated');
                                        location.reload();
                                    }
                                })
                                // catch errors
                                .catch(err => {
                                    console.log(err);
                                    Notify.show('problem updating review');
                                })                                
                            })
                        })
                    }
                });
            } else { // else (no reviews found)
                // show notification with 'no reviews'
                Notify.show('No reviews yet')
                // add 'No reviews yet' text to page content
                let pageContent = document.querySelector('.page-content');
                let noReviewsMessage = document.createElement('div');
                noReviewsMessage.classList.add('no-reviews-message');
                noReviewsMessage.innerHTML = '<h1>No Reviews Yet</h1>';
                pageContent.appendChild(noReviewsMessage);
            }
        })
        // catch errors
        .catch(err => {
            console.log(err);
        })
}

export { reviewsPageController }
export { returnReviews }

