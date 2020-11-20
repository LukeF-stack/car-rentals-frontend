import { App } from './../components/App.js'
import { User } from '../components/User.js'

// user profile page controller
function userProfilePageController(){
    // data
    let data = {
        firstname: User.firstName,
        lastname: User.lastName,
        email: User.email,
    }
    // run App.loadPage
    App.loadPage('My Account', 'template-page-userProfile', data)
};

export { userProfilePageController }