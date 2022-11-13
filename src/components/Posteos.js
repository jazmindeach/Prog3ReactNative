import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() { 
        console.log(this.props.data.data)
        let data = this.props.data.data  
        console.log(data)
        /*let {data} = item*/
        return (
            <View>
                <Text> Titulo: {data.titulo} </Text>
                <Text> Descripcion: {data.descripcion} </Text>
            </View>

        )

    }
}




export default Posteos;