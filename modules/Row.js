import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  rowDisplay: {
    backgroundColor: 'black',

    paddingVertical: 15,
    paddingLeft: 15,

    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },

  textContactList: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})

const Row = props => (
    <TouchableOpacity style = {styles.rowDisplay} onPress={() => props.onSelectContact(props)}>
      <Text style = {styles.textContactList}>{props.name}</Text> 
    </TouchableOpacity>
  )

  export default Row