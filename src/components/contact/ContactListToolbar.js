import React from 'react';
import {
  Box,
} from '@material-ui/core';
import AddContact from "./AddContact";
const ContactListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
        <AddContact />
    </Box>
  </Box>
);

export default ContactListToolbar;
