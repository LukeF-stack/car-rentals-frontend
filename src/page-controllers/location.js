import { App } from '../components/App.js'
// location page controller
function locationPageController(){
    // data
    let data = {
        intro: "120/430 Fictional Street, Fictional Suburb.",
    }
    // run App.loadPage with callback
    App.loadPage('Contact', 'template-page-location', data, () => {
        // create mapbox component 
        var map = L.mapbox.map('map', 'mapbox.outdoors', {
        accessToken: 'pk.eyJ1IjoibGZvcmRoYW0iLCJhIjoiY2s5ejM1cGFqMDY5dTNobWt4Zm96aXVkdCJ9.FidPVWO-jIPaltOb7y353g'
        });
        // create location information content
        let locationBody = document.querySelector('.location-body');
        let openHoursTitle = document.createElement('h3');
        openHoursTitle.innerText = 'Opening Hours:';
        locationBody.appendChild(openHoursTitle);

        let openHoursBody = document.createElement('p');
        openHoursBody.innerHTML = '<strong>Mon-Fri:</strong> 9:00am-7:00pm<br><strong>Sat:</strong> 9:00am-5:00pm<br><strong>Sun:</strong> 10:00am-6:00pm';
        locationBody.appendChild(openHoursBody);

        let locationDescription = document.createElement('p');
        locationDescription.innerHTML = `A description of the location will be provided here. 
        It will describle what the building looks like, the buildings near it and the relation 
        of its location to the surrounding suburb.`;
        locationBody.appendChild(locationDescription);
    })
};

export { locationPageController }