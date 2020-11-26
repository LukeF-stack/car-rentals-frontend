import { App } from "./../components/App.js";
import { Car } from "./../components/Car.js";
import { CurrentCar } from "../components/CurrentCar.js";
import { Auth } from "../components/Auth.js";
import { Notify } from "../components/Notify.js";

// selected car page controller
function selectedCarPageController() {
  // data
  let data = {
    intro: "This is the car you selected",
    secondaryContent: "This is secondary content."
  };
  // run App.loadPage with generatecarPage callback function
  App.loadPage("Car", "template-page-selectedCar", data, generateCarPage);
}
// callback - generates the car page
function generateCarPage() {
  // get requested car id from url
  let id = location.toString().split("?ids=")[1];
  // run Car.getByIds with requested car id
  Car.getByIds(id).then((car) => {
    // then for each car
    car.forEach((car) => {
      //set car cover page property to css style format
      car.cover_image = `url(${car.cover_image})`;
      const selectedCarTemplate = document.querySelector(
        "#template-selectedCar-entry"
      ).innerHTML;
      // use mustache to render the selected car using the selected car html template
      let selectedCarContent = Mustache.render(selectedCarTemplate, car);
      // run CurrentCar.show with car data, selectedcarContent and callback
      CurrentCar.show(car, selectedCarContent, CurrentCar.hide);
      // listen for book button click
      document.querySelector(".book-btn").addEventListener("click", () => {
        // when clicked, if the user is authenticated and the car is available
        if (Auth.authenticated == true && car.available == true) {
          // make PUT request to cars/:id endpoint & 'available: false' as body
          fetch(
            `https://car-rentals-backend-api.herokuapp.com/api/cars/${car._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ available: false })
            }
          )
            .then((res) => {
              // log response
              console.log(res);
              // if not successful response, show problem notification
              if (res.status !== 200) {
                Notify.show("Problem booking car");
              } else {
                // else (success) show success Notification and set car.available to false to prevent double booking wihtout page reload
                Notify.show(`${car.title} booked for today`);
                car.available = false;
              }
            })
            // catch errors
            .catch((err) => {
              console.log(err);
              Notify.show("Problem booking car");
            });
          // else if user isn't authenticated tell them they need an account to book car
        } else if (Auth.authenticated !== true) {
          Notify.show("Create an account to book a car");
        } else {
          //else (car isn't available) show message 'already booked'
          Notify.show("Sorry. This car is already booked.");
        }
      });
    });
  });
}

export { selectedCarPageController };
