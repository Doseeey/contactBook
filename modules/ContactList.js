import React from 'react'
import { Text, SectionList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Row from './Row'

const styles = StyleSheet.create({
  sectionHeaderStyle: {
    backgroundColor: 'black',
    color: 'gray',

    fontWeight: 'bold',

    paddingTop: 30,
    paddingBottom: 5,
    paddingLeft: 15,

    borderBottomColor: '#333',
    borderBottomWidth: 1,    
  },
})

const renderSectionHeader = ({section}) => <Text style={styles.sectionHeaderStyle}>{section.title}</Text>

const ContactList = props => {
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})

  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    data: contactsByLetter[letter],
    title: letter,
  }))

  return (
    <SectionList 
        sections={sections} 
        renderItem={({item}) => <Row {...item} onSelectContact={props.onSelectContact} />} 
        renderSectionHeader={renderSectionHeader} 
        keyExtractor={(item, index) => item+index}
    />
    );
}

ContactList.propTypes = {
  contacts: PropTypes.array,
}

export default ContactList
