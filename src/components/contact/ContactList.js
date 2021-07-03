import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ContactListResults from './ContactListResults';
import ContactListToolbar from './ContactListToolbar';
import {Component} from "react";
import { connect } from "react-redux";
import {
    retrieveContacts,
    updateContact,
    deleteContact
} from "../../actions/contacts";

class ContactList extends Component {

    componentDidMount() {
        this.props.retrieveContacts();
    }

    render() {

        const { contacts } = this.props;
        return (
            <>
                <Helmet>
                    <title>Contacts</title>
                </Helmet>
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                        minHeight: '100%',
                        py: 3
                    }}
                >
                    <Container maxWidth={false}>
                        <ContactListToolbar/>
                        <Box sx={{pt: 3}}>
                            <ContactListResults contacts={contacts.data} props={this.props} />
                        </Box>
                    </Container>
                </Box>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
    };
};

export default connect(mapStateToProps, {retrieveContacts, deleteContact, updateContact})(ContactList);
