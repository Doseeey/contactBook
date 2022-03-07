import React from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

export default class AddContactScreen extends React.Component {
  state = {
    name: '',
    phone: '',
    image: '',
    isFormValid: false,
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerBackTitle: "Back",
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name || this.state.phone !== prevState.phone)
      this.validateForm()
  }

  handleNameChange = name => {
    this.setState({name})
  }

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10)
      this.setState({phone})
  }

  validateForm = () => {
    if (+this.state.phone >= 0 && this.state.phone.length >= 3 && this.state.name.length >= 1)
      this.setState({isFormValid: true})
    else {
      this.setState({isFormValid: false})
    }
  }

  handleSubmit = () => {
    console.log(this.props)
    this.props.extraData(this.state)
    this.props.navigation.goBack()
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result)

    if (!result.cancelled) {
      this.setState({image: result.uri})
    }

    console.log(this.state.image)
  }
  
  render () {
    let image = this.state.image
    const unknownImage = require("../assets/unknownavatar.jpg")

    return (
      <KeyboardAvoidingView behavior='position' style={styles.container} keyboardVerticalOffset={-150}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <TouchableOpacity onPress={this.pickImage} style={styles.imageBox}>
            {image ? <Image source={{uri: image}} style={styles.image} /> : <Image source={unknownImage} style={styles.image} />}
            </TouchableOpacity>
            <Button title="Choose image" onPress={this.pickImage} />

            <TextInput 
              style={styles.input}
              value={this.state.name}
              onChangeText={this.handleNameChange}
              placeholder="Name"
              placeholderTextColor='gray'
            />
            <TextInput 
              style={styles.input}
              value={this.state.phone}
              onChangeText={this.handlePhoneChange}
              placeholder="Phone"
              placeholderTextColor='gray'
              keyboardType='numeric'
            />
            <View style={styles.submitButton}>
              <Button 
                title="Submit" 
                onPress={this.handleSubmit} 
                disabled={!this.state.isFormValid} 
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'center',
    flex: 1,
    paddingTop: '10%',
  },
  input: {
    minWidth: 100,
    color: "white",
    fontSize: 18,

    marginTop: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
  imageBox: {
    width: 200,
    height: 200,
    marginBottom: 5,
    marginLeft: '25%',

    borderRadius: 100,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    width: 200,
    height: 200,
    flex: 1,

    borderRadius: 100,
  },
  submitButton: {
    paddingTop: 50,
  },
})