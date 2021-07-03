import {
    CREATE_CONTACT,
    RETRIEVE_CONTACTS,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    DELETE_ALL_CONTACTS
} from "./types";

import ContactDataService from "../services/contact.service";

export const createContact = (firstName,lastName, age, photo) => async (dispatch) => {
    try {
        const res = await ContactDataService.create({ firstName,lastName, age, photo });

        dispatch({
            type: CREATE_CONTACT,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveContacts = () => async (dispatch) => {
    try {
        const res = await ContactDataService.getAll();

        dispatch({
            type: RETRIEVE_CONTACTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateContact = (id, data) => async (dispatch) => {
    try {
        const res = await ContactDataService.update(id, data);

        dispatch({
            type: UPDATE_CONTACT,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteContact = (id) => async (dispatch) => {
    try {
        await ContactDataService.delete(id);

        dispatch({
            type: DELETE_CONTACT,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllContacts = () => async (dispatch) => {
    try {
        const res = await ContactDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_CONTACTS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findContactsByTitle = (title) => async (dispatch) => {
    try {
        const res = await ContactDataService.findByTitle(title);

        dispatch({
            type: RETRIEVE_CONTACTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};