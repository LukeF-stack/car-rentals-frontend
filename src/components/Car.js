import { App } from "./App.js";
import { CurrentCar } from "./CurrentCar.js";
import { selectedCarPageController } from "../page-controllers/selectedCar.js";

const Car = {
  // methods
  // get all cars from API
  get: () => {
    return new Promise((resolve, reject) => {
      fetch("https://car-rentals-backend-api.herokuapp.com/api/cars")
        .then((res) => res.json())
        .then((cars) => {
          resolve(cars);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // get cars by ids
  getByIds: (ids) => {
    return new Promise((resolve, reject) => {
      // set endpoint
      let url = new URL(
        "https://car-rentals-backend-api.herokuapp.com/api/cars"
      );
      // set query parameters to ids: requested car ids
      let params = { ids: ids };
      // create search parameters with ids parameter
      url.search = new URLSearchParams(params).toString();
      // fetch the specified endpoint
      fetch(url)
        // convert response to json data
        .then((res) => res.json())
        // resolve the promise & return cars found
        .then((cars) => {
          resolve(cars);
        })
        // catch errors
        .catch((err) => {
          // reject the promise & return error
          reject(err);
        });
    });
  },
  // get cars with other filters (brand only for time being)
  getWithFilters: (brand) => {
    return new Promise((resolve, reject) => {
      // set endpoint
      let url = new URL(
        "https://car-rentals-backend-api.herokuapp.com/api/cars"
      );
      // create url search parameters with the requested brand as a parameter
      url.search = new URLSearchParams(brand).toString();
      // fetch the specified endpoint
      fetch(url)
        // convert response to json data
        .then((res) => res.json())
        // resolve the promise & return cars found
        .then((cars) => {
          resolve(cars);
        })
        // catch errors
        .catch((err) => {
          // reject the promise & return error
          reject(err);
        });
    });
  },
  // create a car object from car json data
  createCarObj: (data) => {
    // create empty car object
    let carObj = {};
    // set carObject.data to the function parameters (data)
    carObj.data = data;
    // set carObj.template to the mustache template in html file
    carObj.template = document.querySelector("#template-car-entry").innerHTML;
    // create div to store carObj
    carObj.el = document.createElement("div");
    // render the car object
    carObj.render = () => {
      // set the carObj div class
      carObj.el.className = "car-entry";
      // set the carObj div id to car-carObject id
      carObj.el.setAttribute("id", `car-${carObj.data._id}`);
      // use mustache to render html of carObj div from html template
      carObj.el.innerHTML = Mustache.render(carObj.template, carObj.data);
      // run events function
      carObj.events();
    };

    // events
    carObj.events = () => {
      const viewCarBtn = carObj.el.querySelector(".view-car-btn");
      // add click event listener to view car button
      viewCarBtn.addEventListener("click", () => {
        // run Car.getByIds with carObject id when button is clicked
        Car.getByIds(carObj.data._id).then((car) => {
          // then for each car object returned
          car.forEach((car) => {
            //console.log(car)
            const selectedCarTemplate = document.querySelector(
              "#template-selectedCar-entry"
            ).innerHTML;
            // use mustache to render the car object using the selectecCar entry template
            let selectedCarContent = Mustache.render(selectedCarTemplate, car);
            // run CurrentCar.show function, with car object, the car html and a callback (Currentcar.hide)
            CurrentCar.show(car, selectedCarContent, CurrentCar.hide);
          });
        });
      });
    };
    // render the carObj using the render function
    carObj.render();
    // return the car object
    return carObj;
  }
};

export { Car };
