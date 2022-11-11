import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    
    desloguearse(){
        auth.signOut()
        this.props.navigation.navigate("Registro")
    }

    render() {
        return (
            <View>
                <Text> Esta es la página Home</Text>
                <TouchableOpacity onPress={ () => this.desloguearse ()}>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
            </View>

        )

    }
}



export default Home;