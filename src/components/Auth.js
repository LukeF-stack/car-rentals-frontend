import { App } from "./../components/App.js";
import { Notify } from "./Notify.js";
import { User } from "./../components/User.js";

const Auth = {
  //methods
  // stores whether the user is logged in or not
  authenticated: false,
  // log in function, using the data from login form
  logIn: (userData) => {
    // make post request to API login endpoint with userData from login form
    fetch("https://xj7u1.sse.codesandbox.io/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then((res) => {
        // then if the response isn't successful; get the response json and display it using the Notify component
        if (res.status !== 200) {
          res.json().then((res) => {
            Notify.show(res.message);
          });
        } else {
          // else (successful response)
          // get response json data
          res.json().then((res) => {
            // store token from repsonse in local storage
            localStorage.setItem("token", res.token);
            // set authenticated to true
            Auth.authenticated = true;
            // set user properties to response values
            User.id = res.user._id;
            User.firstName = res.user.first_name;
            User.lastName = res.user.last_name;
            User.email = res.user.email;
            // go to home page
            location.hash = "#";
            Notify.show(`Welcome ${User.firstName}`);
          });
        }
      })
      // catch error
      .catch((err) => {
        console.log(err);
        Notify.show("problem signing in");
      });
  },
  // check if user has a token & verify it
  check: (callback) => {
    // if the user has a token in local storage, send get request to validate endpoint with the token in req header
    if (localStorage.getItem("token")) {
      fetch("https://xj7u1.sse.codesandbox.io/api/auth/validate", {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      })
        .then((res) => {
          // then if the response is not successful
          if (res.status !== 200) {
            // remove the unauthorised token from local storage
            localStorage.removeItem("token");
            // set authenticated to false
            Auth.authenticated = false;
            // remove user id so they can't edit reviews etc.
            User.id = null;
            // go to login page
            location.hash = "#login";
            Notify.show("Problem authenticating account");
            // run callback
            if (typeof callback == "function") {
              callback();
            }
          } else {
            // else (success)
            res.json().then((res) => {
              // console log authorised message
              console.log("User authorised");
              // set suthenticated to true
              Auth.authenticated = true;
              // set user properties to response values
              User.firstName = res.user.first_name;
              User.lastName = res.user.last_name;
              User.email = res.user.email;
              User.id = res.user._id;
            });
            // run callback if it's a function
            if (typeof callback == "function") {
              callback();
            }
          }
        })
        // catch error
        .catch((err) => {
          // log error
          console.log(err);
          Notify.show("Problem authorising");
          // run callback if it's a function
          if (typeof callback == "function") {
            callback();
          }
        });
    } else {
      // else if there is no token
      //Notify.show('No local token, please sign in') <-- optional token message
      // run callback if it is a function
      if (typeof callback == "function") {
        callback();
      }
    }
  },
  // logs the user out
  logOut: () => {
    // remove id property so they can't edit reviews, etc.
    User.id = null;
    // remove token from loacl storage
    localStorage.removeItem("token");
    // set authenticated to false
    Auth.authenticated = false;
    // go to login page
    location.hash = "#login";
    Notify.show("You have been signed out");
  }
};

export { Auth };
