import { App } from "./App.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { Auth } from "./Auth.js";

const Review = {
  // methods
  // create a review using the review form data
  create: (userReview) => {
    // make post request to reviews endpoint, with the review form data
    fetch("https://xj7u1.sse.codesandbox.io/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userReview)
    })
      .then((res) => {
        // console log the response
        console.log(res);
        // if the response isn't a success response, show problem notification
        if (res.status !== 201) {
          Notify.show("problem posting review");
        } else {
          // else (success) show success notification & take user back to the car page
          Notify.show("review added");
          location.hash = `cars?ids=${userReview.Car_id}`;
        }
      })
      // catch errors
      .catch((err) => {
        // log errors & show problem notification
        console.log(err);
        Notify.show("problem adding review");
      });
  },
  // get review by id
  getReviews: (id) => {
    return new Promise((resolve, reject) => {
      // set url to reviews endpoint
      let url = new URL("https://xj7u1.sse.codesandbox.io/api/reviews");
      // create url search params with the review id parameter
      url.search = new URLSearchParams(id).toString();
      // get request with specified endpoint
      fetch(url)
        // convert response to json data
        .then((res) => res.json())
        .then((reviews) => {
          // resolve the promise and return the reviews object
          resolve(reviews);
        })
        // catch errors
        .catch((err) => {
          reject(err);
        });
    });
  },
  // create a review
  createReviewObj: (data) => {
    // create empty review object
    let reviewObj = {};
    reviewObj.data = data;
    // set template to html template
    reviewObj.template = document.querySelector(
      "#template-review-entry"
    ).innerHTML;

    reviewObj.el = document.createElement("div");
    // render the review
    reviewObj.render = () => {
      // set class
      reviewObj.el.className = "review-entry";
      // set id to review-reviewid
      reviewObj.el.setAttribute("id", `review-${reviewObj.data._id}`);
      // use mustache to render the review using the review entry template
      reviewObj.el.innerHTML = Mustache.render(
        reviewObj.template,
        reviewObj.data
      );
    };
    // render the reviewObj
    reviewObj.render();
    // return the review object
    return reviewObj;
  }
};

export { Review };
