
import http from "../http-common";

class ContactDataService {
    getAll() {
        return http.get("/contact");
    }

    get(id) {
        return http.get(`/contact/${id}`);
    }

    create(data) {
        return http.post("/contact", data);
    }

    update(id, data) {
        return http.put(`/contact/${id}`, data);
    }

    delete(id) {
        return http.delete(`/contact/${id}`);
    }

    deleteAll() {
        return http.delete(`/contact`);
    }

    findByTitle(title) {
        return http.get(`/contact?title=${title}`);
    }
}

export default new ContactDataService();