import { App } from "./App.js";
import { Notify } from "./Notify.js";
import { User } from "./User.js";
import { Auth } from "./Auth.js";

const Contact = {
  // methods
  // create an enquiry using the contact form data
  create: (contactForm) => {
    // make post request to API with contact form data as JSON
    fetch("https://xj7u1.sse.codesandbox.io/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForm)
    })
      // then
      .then((res) => {
        //console.log(res);
        // if the response was unsuccessful send problem notification
        if (res.status !== 201) {
          Notify.show("problem sending enquiry");
        } else {
          // else (success) send success notification and go to home page
          Notify.show("enquiry sent");
          location.hash = "#";
        }
      })
      // catch errors
      .catch((err) => {
        // log the error & send error notification
        console.log(err);
        Notify.show("problem sending enquiry");
      });
  }
};

export { Contact };
