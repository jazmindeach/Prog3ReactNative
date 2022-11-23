import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore"
import Comentarios from '../screens/Comentarios';

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,
            comentarios: false,


        }
    }

    componentDidMount() {
        let likes = this.props.data.data.likes;
        
        if(likes.includes(auth.currentUser.email)
        ){
            this.setState({
                likeado: true
            })
        }
        else{
            this.setState({
                likeado: false
            })
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
        // console.log(this.props.data)
        // let data = this.props.data.data  
        // console.log(data)
        // /*let {data} = item*/
        return (
            <View>
                <Image
                source={{uri:`${this.props.data.data.foto}`}}
                style={{width:"100", flex:1, height: 200}}
                />
                <Text> Titulo: {this.props.data.data.titulo} </Text>
                <Text> Descripcion: {this.props.data.data.descripcion} </Text>
                <Text> Likes {this.props.data.data.likes.length} </Text>

                {this.state.likeado? <TouchableOpacity onPress={()=> this.like()}> 
                    <Text> No me gusta mas </Text>
                </TouchableOpacity>:<TouchableOpacity onPress={()=> this.like()}> 
                    <Text> Darle like </Text>
                </TouchableOpacity>}
                <TouchableOpacity 
                    onPress={()=>{ this.props.navigation.navigate("Comentarios",{id: this.props.data.id})}}
                >
                <Text>Ver el comentario</Text> 
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=> this.verComentarios()}> 
                    <Text> Ver comentarios </Text>
                </TouchableOpacity> */}
                {this.state.comentarios? <View> <Comentarios cerrarComentario={()=>this.cerrarComentario()} /> </View> :<Text></Text>}
                
            </View>

        )

    }
}




export default Posteos;