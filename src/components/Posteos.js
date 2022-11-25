import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import firebase from 'firebase';
import "firebase/firestore"
import Comentarios from '../screens/Comentarios';
import {FontAwesome} from '@expo/vector-icons'

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
            comentarios: false,

        }
    }

    like (){
        let posteo = db.collection("posteos").doc(this.props.data.id)
        if (this.state.likeado) {
            posteo.update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=>{
                this.setState({
                    likeado: false,
                })
            })
        }
        else{
            posteo.update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=>{
                this.setState({
                    likeado: true,
                })
            })
        }

        
    }
    verComentarios (){
        this.setState({
            comentarios: true

        })
    }

    cerrarComentarios (){
        this.setState({
            comentarios: false

        })
    }

    render() { 
       console.log(this.props.data.data.foto)
        return (
            <View>
                <Image
                source={{uri:`${this.props.data.data.foto}`}}
                style={styles.imagen}

                />
                <Text> Titulo: {this.props.data.data.titulo} </Text>
                <Text> Descripcion: {this.props.data.data.descripcion} </Text>
                <Text> Likes {this.props.data.data.likes.length} </Text>

                {this.state.likeado? 
                <TouchableOpacity onPress={()=> this.like()}> 
                <FontAwesome name='heart' color='red' size={14} />
                </TouchableOpacity>:<TouchableOpacity onPress={()=> this.like()}> 
                <FontAwesome name='heart-o' color='red' size={14} />
                    
                </TouchableOpacity>}
                <TouchableOpacity 
                    onPress={()=>{ this.props.navigation.navigate("Comentarios",{id: this.props.data.id})}}
                >
                <Text>Ver el comentario</Text> 
                </TouchableOpacity>
            
                {this.state.comentarios? <View> <Comentarios cerrarComentario={()=>this.cerrarComentario()} /> </View> :<Text></Text>}
                <FlatList data={this.props.data.data.comentarios.slice(-5,-1)}
                    keyExtractor={(data)=> data.createdAt}
                    renderItem={({item})=> 
                <View> <Text ><strong>{item.owner}</strong></Text>
                <Text>{item.text}</Text></View> 
                    }
                    > 
                </FlatList>
            </View>

        )

    }
}
const styles = StyleSheet.create({
    imagen: {
        width:"100%",
        height:300,
        alignContent:"center",
        marginVertical:10,
    }
})



export default Posteos;