import {
    CREATE_CONTACT,
    RETRIEVE_CONTACTS,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    DELETE_ALL_CONTACTS,
} from "../actions/types";

let initialState = [];

function contactReducer(contacts = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_CONTACT:
            if(contacts.length > 0){
                return [...contacts, payload];
            }
            return [null, payload]

        case RETRIEVE_CONTACTS:
            console.log(payload)
            return payload;
        case UPDATE_CONTACT:
            return contacts;

        case DELETE_CONTACT:
            return contacts.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_CONTACTS:
            return [];

        default:
            return contacts;
    }
};

export default contactReducer;