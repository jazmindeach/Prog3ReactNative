import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import Camara from '../components/Camara';

class CrearPosteo extends Component {
    constructor() {
        super()
        this.state = {
            titulo: "",
            descripcion: "", //estados, strings vacios
            foto: "",
            camara: false
        }
    }
    habilitarCamara() {
        this.setState({
            camera: true
        })

    }

    onImageUpload(url) {
        console.log(url)
        this.setState({
            foto: url,
            camera: false
        })
    }

    crearpost() {
        db.collection("posteos").add({ //va a la base de datos a la coleccion posteos y de esta manera se crea un nuevo elemento
            user: auth.currentUser.email,
            createdAt: Date.now(),
            titulo: this.state.titulo,
            descripcion: this.state.descripcion,
            likes: [],
            comentarios: [],
            foto: this.state.foto
        })
            .then(() => { //por ser una promesa asincronica
                this.setState({
                    titulo: "",
                    descripcion: "",
                })
                this.props.navigation.navigate("Home") // usuario vuelve al home y ve su posteo
            })
            .catch((error) => console.log(error))
    }
    render() {
        console.log(this.state.post)
        return (
            <View>
                <Text> Esta es la página de Crear Posteo</Text>
                <TextInput // espacios dnde la persona puede escribir 
                    placeholder='Title'
                    keyboardType='default'
                    onChangeText={  // cambia el texto
                        texto => this.setState({ //var "texto" donde esta lo que escribe el usuario y this.setState cambia el valor al estado 
                            titulo: texto // le das el valor de texto que es lo que se escribe
                        })
                    }
                    value={this.state.titulo}

                />
                <TextInput

                    placeholder='descripcion'
                    keyboardType='default'

                    onChangeText={texto => this.setState({ descripcion: texto })}
                    value={this.state.descripcion}

                />
                <TouchableOpacity onPress={() => this.habilitarCamara()} >
                    <Text>Agregar una foto al posteo</Text>
                </TouchableOpacity>

                {this.state.camera ? <Camara onImageUpload={(url) => this.onImageUpload(url)} /> : <Text></Text>}

                {this.state.titulo.length == 0 || this.state.descripcion == 0 ? <TouchableOpacity>
                    <Text> Crear tu posteo </Text>
                </TouchableOpacity> : <TouchableOpacity onPress={() => this.crearpost()}>
                    <Text> Crear tu posteo </Text>
                </TouchableOpacity>}

            </View>
            // linea 59 si esta vacio no se crea
            // linea 61 si funciona, ejecuta la funcion create post que 

        )

    }
}



export default CrearPosteo