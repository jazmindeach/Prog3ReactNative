import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Posteos from '../components/Posteos'; 

class Home extends Component {
    constructor() {
        super()
        this.state = {
                post: []

        }
    }

    componentDidMount (){
        db.collection("posteos").onSnapshot((docs)=> {
            let posteos = []
            docs.forEach(doc => {
            posteos.push({
                id: doc.id,
                data: doc.data()
            })
            });
            this.setState({
                post:posteos
            })
        })
    }
    
    desloguearse(){
        auth.signOut()
        this.props.navigation.navigate("Registro")
    }

    render() {
        console.log(this.state.post)
        return (
            <View>
                <Text> Esta es la página Home</Text>
                <TouchableOpacity onPress={ () => this.desloguearse ()}>
                        <Text>Cerrar sesión</Text>
                    </TouchableOpacity>
                <Text> Estos son tus posteos:</Text>
                <FlatList data={this.state.post}
                    keyExtractor={(data)=> data.id}
                    renderItem={({item})=> (<Posteos data={item}/>)  }
                    > 
                    
                </FlatList>
                <Text onPress={ () => this.props.navigation.navigate ("CrearPosteo")}> Crear un posteo </Text>
            </View>

        )

    }
}



export default Home;