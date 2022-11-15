import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class MiPerfil extends Component {
    constructor(){
        super()
        this.state = {
            usuario: []
        }
    }

    componentDidMount(){
        db.collection("users").where("owner","==",`${auth.currentUser.email}`).onSnapshot((docs)=>{

            let usuario = []
            docs.forEach((doc)=>{
                usuario.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuario: usuario
            })
        })

    }
    

    render(){


        return(
            <View>
                <Text> Bienvenido a tu perfil: {auth.currentUser.email} </Text>
                <Text> Tu nombre de usuario es:  {this.state.usuario[0]?.data.userName} </Text>
                <Text> Tu biografía es:  {this.state.usuario[0]?.data.bio} </Text>
                <Text> usuario activo desde:  {this.state.usuario[0]?.data.createdAt} </Text>
            </View>
        
        )
        
        }
}



export default MiPerfil;