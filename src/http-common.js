import axios from "axios";

export default axios.create({
    baseURL: "http://simple-contact-crud.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});