import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import getInitials from '../../utils/getInitials';
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";



const ContactListResults = ({ contacts,props, ...rest }) => {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [limit] = useState(9999);

  const handleSelectAll = (event) => {
    let newSelectedContactIds;

    if (event.target.checked) {
      newSelectedContactIds = contacts.map((contact) => contact.id);
    } else {
      newSelectedContactIds = [];
    }

    setSelectedContactIds(newSelectedContactIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedContactIds.indexOf(id);
    let newSelectedContactIds = [];

    if (selectedIndex === -1) {
      newSelectedContactIds = newSelectedContactIds.concat(selectedContactIds, id);
    } else if (selectedIndex === 0) {
      newSelectedContactIds = newSelectedContactIds.concat(selectedContactIds.slice(1));
    } else if (selectedIndex === selectedContactIds.length - 1) {
      newSelectedContactIds = newSelectedContactIds.concat(selectedContactIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedContactIds = newSelectedContactIds.concat(
        selectedContactIds.slice(0, selectedIndex),
        selectedContactIds.slice(selectedIndex + 1)
      );
    }

    setSelectedContactIds(newSelectedContactIds);
  };


  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={(contacts) ? selectedContactIds.length === contacts.length : false}
                    color="primary"
                    indeterminate={
                      (contacts) ?
                      selectedContactIds.length > 0
                      && selectedContactIds.length < contacts.length : false
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
                <TableCell>
                  Photo
                </TableCell>
                <TableCell>
                  First Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
                <TableCell>
                  Age
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts
              && contacts.slice(0, limit).map((contact) => (
                <TableRow
                  hover
                  key={contact.id}
                  selected={selectedContactIds.indexOf(contact.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedContactIds.indexOf(contact.id) !== -1}
                      onChange={(event) => handleSelectOne(event, contact.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteContact contact={contact}/>
                    <EditContact contact={contact} />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={contact.photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(contact.firstName)+""+getInitials(contact.lastName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {contact.firstName+" "+contact.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {contact.firstName}
                  </TableCell>
                  <TableCell>
                    {contact.lastName}
                  </TableCell>
                  <TableCell>
                    {contact.age}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ContactListResults.propTypes = {
  contacts: PropTypes.array,
  props:PropTypes.object
};

export default ContactListResults;
