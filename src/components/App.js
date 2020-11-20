import { Notify } from "./Notify.js";
import { Car } from "./Car.js";
import { Auth } from "./Auth.js";
import { User } from "./User.js";

const App = {
  // properties
  name: "Car Rentals App",
  version: "1.0.0",
  author: "Luke Fordham",
  rootEl: document.querySelector("#app"),
  routes: {},

  // methods
  // initialise the app object
  init: () => {
    Notify.init();
    // check if the user is authenticated
    Auth.check(() => {
      App.router();
      // listen for hash change and run App.router & Car.init
      window.addEventListener("hashchange", App.router);
    });
  },
  // add route to App.routes
  addRoute: (path, pageController) => {
    // adding an entry to App.routes
    App.routes[path] = {
      controller: pageController
    };
  },

  router: () => {
    // get the current hash location
    const path = location.hash || "#";
    // find route for this path in App.routes
    const route = App.routes[path];
    // if routes exists for this path
    if (route) {
      // run the route.controller
      // alert('yes it exists');
      route.controller();
    } else {
      // load 404 page
      App.loadPage("404 page/file not found", "template-page-404", {});
    }
  },

  // load requested page
  loadPage: (title, templateId, data, callback) => {
    // set document title
    document.title = title;
    // grab the template and store in a variable
    let template = document.querySelector(`#${templateId}`).innerHTML;
    // insert the output HTML into the rootEl
    let output = Mustache.render(template, data);

    // fade out app div
    App.rootEl.classList.add("hidden");
    // load in new HTML and fade in
    setTimeout(() => {
      App.rootEl.innerHTML = output;
      App.rootEl.classList.remove("hidden");
      App.loadNav();
      App.refreshNav();
      // run callback
      if (typeof callback === "function") {
        callback();
      }
    }, 300);
  },

  loadNav: () => {
    // get main nav div
    let mainNav = document.querySelector("#main-nav");
    // get page-header div
    let header = document.querySelector(".page-header");

    // create logo anchor element
    let logoAnchor = document.createElement("a");
    logoAnchor.className = "logo";
    logoAnchor.href = "#";
    // append the logo to the page header
    header.appendChild(logoAnchor);
    // create the logo image element
    let logoImg = document.createElement("img");
    logoImg.className = "logo-img";
    logoImg.setAttribute("src", "../images/logo_2.svg");
    // append the logo to the logo anchor
    logoAnchor.appendChild(logoImg);

    // store all active page links in an array
    let navLinks = [];

    // create common nav links
    let homeLink = document.createElement("a");
    homeLink.href = "#";
    homeLink.innerText = "Home";
    navLinks.push(homeLink);
    let contactLink = document.createElement("a");
    contactLink.href = "#contact";
    contactLink.innerText = "Contact";
    navLinks.push(contactLink);
    let locationLink = document.createElement("a");
    locationLink.href = "#location";
    locationLink.innerText = "Location";
    navLinks.push(locationLink);
    // append common nav links to main nav div
    mainNav.appendChild(homeLink);
    mainNav.appendChild(contactLink);
    mainNav.appendChild(locationLink);
    // if the user is authenticated create optional nav links
    if (Auth.authenticated == true) {
      let userProfileLink = document.createElement("a");
      userProfileLink.href = "#userProfile";
      userProfileLink.innerText = "My Account";
      navLinks.push(userProfileLink);
      mainNav.appendChild(userProfileLink);
      let logOutLink = document.createElement("a");
      logOutLink.href = "#logout";
      logOutLink.innerText = "Log Out";
      navLinks.push(logOutLink);
      mainNav.appendChild(logOutLink);
    } else {
      // else if the user is not authenticated, create alternative nav links
      let loginLink = document.createElement("a");
      loginLink.href = "#login";
      loginLink.innerText = "Log in";
      navLinks.push(loginLink);
      mainNav.appendChild(loginLink);
      let signupLink = document.createElement("a");
      signupLink.classList.add("sign-up-link");
      signupLink.href = "#signup";
      signupLink.innerText = "Sign up";
      navLinks.push(signupLink);
      mainNav.appendChild(signupLink);
    }

    // burger menu icon
    let burgerDiv = document.createElement("div");
    burgerDiv.className = "burger";
    let line1 = document.createElement("div");
    line1.id = "burger_line1";
    burgerDiv.appendChild(line1);
    let line2 = document.createElement("div");
    line2.id = "burger_line2";
    burgerDiv.appendChild(line2);
    let line3 = document.createElement("div");
    line3.id = "burger_line3";
    burgerDiv.appendChild(line3);
    // append the burger icon to the page header
    header.appendChild(burgerDiv);
    // listen for a click on the burger menu
    burgerDiv.addEventListener("click", () => {
      // toggle on/off class 'toggle' for each nav link, when clicked
      navLinks.forEach((link) => {
        link.classList.toggle("toggle");
      });
      // toggle on/off class 'toggle' for burger menu lines and main nav div
      document.querySelector("#main-nav").classList.toggle("toggle");
      document.querySelector("#burger_line1").classList.toggle("toggle");
      document.querySelector("#burger_line2").classList.toggle("toggle");
      document.querySelector("#burger_line3").classList.toggle("toggle");
    });
  },
  // refresh the nav component
  refreshNav: () => {
    // get current path
    let currentPath = location.hash || "#";
    let navItems = document.querySelectorAll("#main-nav > a");
    navItems.forEach((navLink) => {
      // check all links and add 'active' class to the link matching the location hash
      if (navLink.getAttribute("href") === currentPath) {
        navLink.classList.add("active");
      }
    });
  }
};

export { App };
