import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import "firebase/firestore"

class Posteos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeado: false,

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

    render() { 
        console.log(this.props.data.data)
        let data = this.props.data.data  
        console.log(data)
        /*let {data} = item*/
        return (
            <View>
                <Text> Titulo: {data.titulo} </Text>
                <Text> Descripcion: {data.descripcion} </Text>
                <Text> Likes {data.likes.length} </Text>

                {this.state.likeado? <TouchableOpacity onPress={()=> this.like()}> 
                    <Text> No me gusta mas </Text>
                </TouchableOpacity>:<TouchableOpacity onPress={()=> this.like()}> 
                    <Text> Darle like </Text>
                </TouchableOpacity>}
                

                
            </View>

        )

    }
}




export default Posteos;