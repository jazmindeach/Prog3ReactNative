import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import Posteos from '../components/Posteos'; 


class Home extends Component {
    constructor() {
        super()
        this.state = {
                post: [],
                loaded: false
            

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
                post:posteos,
                loaded: true
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
          
                <View style={styles.container}>
                
                <Text style={styles.title}> Home</Text>
    
                <Text onPress={ () => this.props.navigation.navigate ("Crear Posteo")}> Crear un posteo </Text>
                <Text onPress={ () => this.props.navigation.navigate ("Mi Perfil")}> Ver mi perfil</Text>
                
                <Text> Estos son tus posteos:</Text>
                <FlatList data={this.state.post}
                    keyExtractor={(onePost)=> onePost.id.toString()}
                    renderItem={({item})=> <Posteos data={item} navigation={this.props.navigation}/>}
                    > 
                </FlatList>
                
            </View>
            
        

        )}
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor: 'rgb(007,134,255)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        spaceAround: 4,
        textAlign: 'center',
        fontSize: 24,
        margin: 8,
        alignItems: 'center',
        
    },
})




export default Home;