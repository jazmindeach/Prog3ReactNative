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
        console.log(this.state.usuario[0]?.data.fotoPerfil)

        return(
            <View>
                {this.state.usuario[0]?.data.fotoPerfil != ""? <Image
                source={{uri: `${this.state.usuario[0]?.data.fotoPerfil}` }}
                style={styles.image}
                />:<Text> No hay foto perfil </Text>}
                <Image
                source={{uri: `${this.state.usuario[0]?.data.fotoPerfil}` }}
                style={{width:"100", flex:1, height: 200}}
                />
                
                <Text> Bienvenido a tu perfil: {auth.currentUser.email} </Text>
                <Text> Tu nombre de usuario es:  {this.state.usuario[0]?.data.userName} </Text>
                <Text> Tu imágen es:  {this.state.usuario[0]?.data.fotoPerfil} </Text>
                <Text> Tu biografía es:  {this.state.usuario[0]?.data.bio} </Text>
                <Text> usuario activo desde:  {this.state.usuario[0]?.data.createdAt} </Text>
            </View>
        
        )
        
        }
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        width:"100%",
        height:1000,
        alignContent:"center",
        marginVertical:10,
    
    }
})


export default MiPerfil;