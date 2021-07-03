import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import {createContact, retrieveContacts} from "../../actions/contacts";
import { withSnackbar} from "../SnackbarAlert";

class  AddContact extends Component {
    constructor(props){
        super(props);
        this.state = { firstName:'',lastName:'', age:0, photo:'', show:false}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleSubmit(event){
        const {firstName,lastName, age, photo } = this.state;
        event.preventDefault()

        this.props
            .createContact(firstName,lastName, age, photo )
            .then((data) => {
                this.setState({
                });
                console.log(data);
                this.hideModal()
                this.props.sendData()
                this.props.snackbarShowMessage("Add data contact success.")
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
                <Button variant="contained" color="primary" onClick={this.showModal}>
                    Add Contact
                </Button>
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

const mapDispatchToProps = dispatch =>{
    return {
        sendData: function () {
            return dispatch(retrieveContacts())
        },
        createContact:function (firstName,lastName, age, photo){
            return dispatch(createContact(firstName,lastName, age, photo))
        }
    }
}

export default connect(null, mapDispatchToProps )(withSnackbar(AddContact))