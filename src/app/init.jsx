import axios from "axios"

const initializeApp = () => {

    // Setting base URL for all API request via axios
    axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL
    if (!import.meta.env.MODE || import.meta.env.MODE === 'development') {
        // dev code

        axios.defaults.baseURL = "http://localhost:3030"

    } else {
        // Prod build code


        // Removing console.log from prod
        // console.log = () => {};


        // init analytics here
    }

}

export default initializeApp
