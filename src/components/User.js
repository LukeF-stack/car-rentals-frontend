import { App } from "./App.js";
import { Notify } from "./Notify.js";

const User = {
  // properties
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  lastLogin: null,
  favCars: [],
  // methods
  // create a user using sign up form data
  create: (userData) => {
    // post request with sign up form data
    fetch("https://xj7u1.sse.codesandbox.io/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then((res) => {
        // console log response
        console.log(res);
        // if unsuccessful response, show problem notification
        if (res.status !== 201) {
          Notify.show("problem creating user account");
        } else {
          // else (success) show success notification and go to login page
          Notify.show("user created");
          location.hash = "#login";
          Notify.show("Please sign in");
        }
      })
      // catch errors
      .catch((err) => {
        console.log(err);
        Notify.show("problem creating user account");
      });
  },
  // currently unused add car to favs function
  addCarToFavs: (id) => {
    console.log(`adding car ${id} to User favs`);
    User.favCars.push(id);
    console.log(User.favCars);
    //User.updateFavsCount();
  },
  // currently unsused remove from favs function
  removeCarFromFavs: (id) => {
    console.log(`removing car ${id} from User favs`);
    const index = User.favCars.indexOf(id);
    if (index > -1) {
      User.favCars.splice(index, 1);
    }
    console.log(User.favBooks);
    //User.updateFavsCount();
  },
  // currently unused update favs function
  updateFavsCount: () => {
    let favCount = User.favBooks.length;
    const favCountSpan = document.querySelector("#favs-count");
    if (favCount > 0) {
      favCountSpan.innerText = favCount;
      document.getElementById("favs-count").style.width = "20px";
    } else {
      favCountSpan.innerText = null;
      document.getElementById("favs-count").style.width = "0px";
    }
  }
};

export { User };
