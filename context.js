import React from 'react'

//Context for passing array between components
const ContactsContext = React.createContext({
    contacts: [],
  });

export default ContactsContext