import { View, StyleSheet } from 'react-native';
import ContactList from './ContactList';
import ContactsContext from '../context';
import React from 'react'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
})

class ListScreen extends React.Component {

  handleSelectContact = contact => {
    this.props.navigation.push('ContactDetails', contact);
  }

  render () {
    return (
      <ContactsContext.Consumer>
        {({contacts}) => (
          <View style={styles.container}>
            <ContactList contacts={contacts} onSelectContact={this.handleSelectContact}/>
          </View>
        )}
      </ContactsContext.Consumer>
    )
  }
}

export default ListScreen