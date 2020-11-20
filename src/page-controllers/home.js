import { App } from './../components/App.js'
import { Notify } from './../components/Notify.js'
import { Car } from '../components/Car.js';
import { returnCars } from './carsResults.js';
import { carsPageController } from './../page-controllers/carsResults.js';


// home page controller
function homePageController(){
    // data
    let data = {
        intro: "Welcome to the homepage.",
        secondaryContent: "This is secondary content."
    }
    // run App.loadPage with homeInit function callback
    App.loadPage('home', 'template-page-home', data, homeInit );
}

// callback
function homeInit(){
    const filtersBar = document.querySelector('.filters-bar');
    let searchBtn = document.querySelector('#find-car-button-anchor');
    // create allBrands array
    let allBrands = [];
    // run Car.get to get all cars
    Car.get()
    .then(cars => {
        // store returned cars ass filterBtns
        let filterBtns = cars
        // for each filterBtn
        filterBtns.forEach(button => {
            // if the button.brand isn't already in the allBrands array
            if (!allBrands.includes(button.brand)){
                // add the button.brand to the allBrands array
                allBrands.push(button.brand);
                // create an anchor element for the button obj
                const btn = document.createElement('a');
                // set btn innerText to the button.brand
                btn.innerText = button.brand;
                btn.classList.add('button','filter-btn');
                // add the btn to the filtersBar div
                filtersBar.appendChild(btn);
                // listen for a click
                btn.addEventListener('click', () => {
                    // when clicked 
                    // get all active buttons
                    let activeBtns = document.querySelectorAll('.filter-btn.active');
                    // set searchBtn href back to '#cars'
                    searchBtn.setAttribute('href', `#cars`);
                    // create newUrl variable = selected filter button brand query
                    let newUrl = searchBtn.getAttribute('href') + `?brand=${button.brand}`
                    // set the searchBtn href to the newUrl
                    searchBtn.setAttribute('href', newUrl);
                    // run App.addRoute for the newUrl, with carsPageController as page controller
                    App.addRoute(newUrl, carsPageController);
                    // for each of the active buttons remove the 'active' class
                    activeBtns.forEach(btn => {
                        btn.classList.remove('active');
                    });
                    // add 'active' class to the selected filter button
                    btn.classList.add('active');
                }) 
            }
            
        });
    })
    // create all cars button
    const allBtn = document.createElement('a');
    allBtn.innerText = 'All Cars';
    allBtn.classList.add('button', 'filter-btn', 'all-cars-btn');
    // append all cars btn to filtersBar div
    filtersBar.appendChild(allBtn);
    // listen for click on all cars btn
    allBtn.addEventListener('click', () => {
        // get active buttons
        let activeBtns = document.querySelectorAll('.filter-btn.active');
        // set searchBtn href back to '#cars'
        searchBtn.setAttribute('href', `#cars`);
        // for each of the active buttons remove the 'active' class
        activeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        // add 'active' class to the all cars button
        allBtn.classList.add('active');
    });

}



export { homePageController }