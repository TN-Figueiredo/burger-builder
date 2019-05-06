import axios from "axios";

const instance = axios.create({
    baseURL: "https://burgerbuilder-52d91.firebaseio.com/"
});

export default instance;