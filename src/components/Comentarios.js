import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario:"",
        }
    }
    cerrarComentario(){
        this.props.navigation.navigate("Home")

    }

    render() {
        return (
            <Modal style={styles.container}>
                <TextInput style={styles.input}
                    keyboardType="default"
                    placeholder="Escriba un comentario"
                    onChangeText={text => this.setState({comentario:text})}
                    value={this.state.comentario}

                />

                {this.state.comentario.length==0?
                    <TouchableOpacity style={styles.touchable2}>
                        <Text style={styles.texto}>Escribir comentario</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.touchable} onPress={()=> this.coment(this.state.comentario)}>
                        <Text style={styles.texto}>Escribir comentario</Text>
                    </TouchableOpacity>

                }
                <TouchableOpacity style={styles.touchable} onPress={()=> this.cerrarComentario()}>
                        <Text style={styles.texto}>Cerrar comentarios</Text>
                    </TouchableOpacity>
                <Text style={styles.title}> Estos son los comentarios del posteo</Text>
                <FlatList data={this.state.post}
                    keyExtractor={(data)=> data.id}
                    renderItem={({item})=> (<Posteos data={item}/>)  }
                    > 
                    
                </FlatList>
                
            </Modal>

        )

    }
}

const styles = StyleSheet.create ({
    Container:{ 
        width: "100%",
        borderColor:"black",
    }
})




export default Comentarios;