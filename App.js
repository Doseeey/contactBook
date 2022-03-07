//React Implements
import React from 'react';
import { StyleSheet, Button, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Data routing
import { fetchUsers } from './api'
import ContactsContext from './context';

//Screens
import ListScreen from './modules/ListScreen';
import AddContactScreen from './modules/AddContactScreen';
import ContactDetailsScreen from './modules/ContactDetailsScreen';

const Stack = createNativeStackNavigator()

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default class App extends React.Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
  }

  addContact = newContact => {
    this.setState(prevState => ({contacts: [...prevState.contacts, newContact]}))
    console.log(newContact)
  }

  deleteContact = contact => {
    let index = this.state.contacts.findIndex(con => con.name === contact.name && con.phone === contact.phone)

    if (index > -1) {
      this.setState(this.state.contacts.splice(index, 1))
    }
    else {
      console.log("contact not found")
    }
  }

  render() {
    return (
      <ContactsContext.Provider value={this.state}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Contact Book" 
              component={ListScreen} 
              options={ ({ navigation }) => ({
                headerRight: () => (
                  <Button 
                    title="Add"
                    onPress={() => navigation.navigate('Add Contact')}
                  />
                ),
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: 'white',
              })}
            />
            <Stack.Screen 
              name="Add Contact" 
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {
                  color: "white",
                },
              }}
            >
              {props => <AddContactScreen {...props} extraData={this.addContact} />}
            </Stack.Screen>
            
            <Stack.Screen 
              name="ContactDetails"
              options = {{
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTitleStyle: {
                  color: "white",
                },
              }}
            >
              {props => <ContactDetailsScreen {...props} extraData={this.deleteContact} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ContactsContext.Provider>
    );
  }
}