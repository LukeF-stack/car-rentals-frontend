import { App } from './../components/App.js';
import { Car } from '../components/Car.js';


// car page controller
function carsPageController(){
    let data = {
        intro: "Search Results",
    }
    // run App.loadPage with retrunCars callback
    App.loadPage('Cars', 'template-page-cars', data, returnCars);
    

};
// callback - returns cars from search
function returnCars(){
    const carResultsDiv = document.querySelector('#car-results');
    // get the url query eg. brand=Toyota
    const url = location.toString().split("?")[1]; 
    // if there is a query
    if(url){
        // get brand from the url query
        let brand = url.split("=")[1];
        // run Car.getWithFilters, with brand query
        Car.getWithFilters({brand: brand})
        .then(cars => {
            // for each of the returned cars
            cars.forEach(car => {
                // run Car.createCarObj with the car
                let carObj = Car.createCarObj(car);
                // append the returned carObj.el to the car results div
                carResultsDiv.appendChild(carObj.el);
            });
        })
        // catch errors and log them
        .catch(err => {
            console.log(err);
        })
    } else { // else, if there is no query
        // run Cars.get
    Car.get()
    .then(cars => {
        // then for each returned car
         cars.forEach(car => {
             // create a car object using Car.createCarObj function
            let carObj = Car.createCarObj(car);
            // append carObj.el to car results div
            carResultsDiv.appendChild(carObj.el);
        });
    })
    // catch errors
    .catch(err => {
        console.log(err);
    })
}
}

export { carsPageController }
export { returnCars }

