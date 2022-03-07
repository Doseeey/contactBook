import React from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        justifyContent: "flex-start",
        alignContent: 'center',
        flex: 1,
        paddingTop: 40,
    },

    detailBox: {
        backgroundColor: "#222",
        borderRadius: 8,
        width: '96%',

        marginLeft: '2%',
        padding: 15,
        marginBottom: 40,
    },

    imageBox: {
        width: 200,
        height: 200,
        marginBottom: 35,
        marginLeft: '25%',

        borderRadius: 100,
        borderColor: 'gray',
        borderWidth: 1,
    },

    textFields: {
        color: 'gray',
    },

    textValues: {
        color: 'white',
        paddingTop: 10,
        fontSize: 18,
    },

    button: {
        color: 'red',
        justifyContent: 'flex-end',
    },
})

export default class ContactDetailsScreen extends React.Component {
    
    componentDidMount() {
        this.props.navigation.setOptions({
            headerTitle: this.props.route.params.name,
            headerBackTitle: "Back",
        })
        console.log(this.props.route)
    }

    handleDelete = () => {
        this.props.extraData(this.props.route.params)
        this.props.navigation.goBack()
      }

    render() {
        const image = this.props.route.params.image
        const unknownImage = require("../assets/unknownavatar.jpg")

        return (
            <View style={styles.container}>
                {image ? <Image source={{uri: image}} style={styles.imageBox} /> : <Image source={unknownImage} style={styles.imageBox} />}

                <View style={styles.detailBox}>
                    <Text style={styles.textFields}>Name:</Text>
                    <Text style={styles.textValues}>{this.props.route.params.name}</Text>
                </View>

                <View style={styles.detailBox}>
                    <Text style={styles.textFields}>Phone:</Text>
                    <Text style={styles.textValues}>{this.props.route.params.phone}</Text>
                </View>

                <View style={styles.button}>
                    <Button title="Delete Contact" onPress={this.handleDelete} style={styles.button}/>
                </View>
             </View>
        )
    }
}
