import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { updateContact, retrieveContacts } from "../../actions/contacts";
import {IconButton} from "@material-ui/core";
import {Edit2 as Edit} from "react-feather";
import PropTypes from "prop-types";
import { withSnackbar} from "../SnackbarAlert";

class  EditContact extends Component {
    constructor(props){
        super(props);
        this.state = { firstName:'',lastName:'', age:0, photo:'', show:false}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        setTimeout(()=>{
            this.setState(props.contact)
        }, 500)

    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleSubmit(event){

        const {firstName, lastName, age, photo} = this.state;
        const id = this.props.contact.id
        const data = {firstName: firstName, lastName: lastName, age: age, photo: photo}
        event.preventDefault()
        this.props
            .updateContact(id, data)
            .then((data) => {
                this.setState({
                });
                console.log(data);
                this.hideModal()
                this.props.sendData()
                this.props.snackbarShowMessage("Update data contact success.")
            })
            .catch((e) => {
                console.log(e);
            });
    }

    // Method causes to store all the values of the
    // input field in react state single method handle
    // input changes of all the input field using ES6
    // javascript feature computed property names
    handleChange(event){
        this.setState({
            // Computed property names
            // keys of the objects are computed dynamically
            [event.target.name] : event.target.value
        })
    }


    render() {

        return (
            <div>
                <IconButton
                    aria-label="Delete"
                    onClick={this.showModal}>
                    <Edit/>
                </IconButton>
                <Dialog open={this.state.show} onClose={this.hideModal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out following input.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            type="text"
                            required={true}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            margin="dense"
                            label="Last Name"
                            type="text"
                            required={true}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField>
                        <TextField
                            id="age"
                            name="age"
                            margin="dense"
                            label="Age"
                            type="number"
                            required={true}
                            value={this.state.age}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField>
                        <TextField
                            id="photo"
                            name="photo"
                            margin="dense"
                            label="Photo URL"
                            type="text"
                            value={this.state.photo}
                            onChange={this.handleChange}
                            required={true}
                            fullWidth>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

EditContact.propTypes = {
    contact : PropTypes.object,
}

const mapDispatchToProps = dispatch =>{
    return {
        sendData: function () {
            return dispatch(retrieveContacts())
        },
        updateContact:function (id, data){
            return dispatch(updateContact(id, data))
        }
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(EditContact))