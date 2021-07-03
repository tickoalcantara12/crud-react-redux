import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import { deleteContact, retrieveContacts} from "../../actions/contacts";
import {Trash as DeleteIcon} from "react-feather";
import {IconButton} from "@material-ui/core";
import PropTypes from "prop-types";
class DeleteContact extends Component{
    constructor(props) {
        super(props);
        this.state = {  show:false}
        this.showModal = this.showModalDelete.bind(this);
        this.hideModal = this.hideModalDelete.bind(this);
    }


    showModalDelete = () => {
        this.setState({ show: true });
    };

    hideModalDelete = () => {
        this.setState({ show: false });
    };

    handleDeleteAction = (event) =>{
        event.preventDefault()
        this.props.deleteContact(this.props.contact.id)
            .then((data) => {
                this.setState({
                });
                console.log(data);
                this.hideModalDelete()
                this.props.sendData()
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                <IconButton
                    aria-label="Delete"
                    onClick={this.showModalDelete}>
                    <DeleteIcon/>
                </IconButton>
                <Dialog
                    open={this.state.show}
                    onClose={this.hideModalDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete item"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure delete <strong> { this.props.contact.firstName +" "+ this.props.contact.lastName } </strong> ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideModalDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteAction} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DeleteContact.propTypes = {
    contact: PropTypes.object,
}

const mapDispatchToProps = dispatch =>{
    return {
        sendData: function () {
            return dispatch(retrieveContacts())
        },
        deleteContact:function (id){
            return dispatch(deleteContact(id))
        }
    }
}


export default connect(null, mapDispatchToProps)(DeleteContact)
