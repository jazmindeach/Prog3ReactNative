import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import firebase from 'firebase';


class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario:"",
            comentarios: [], 
            user: {},
        }
    }
    componentDidMount(){
        db.collection('posteos').doc(this.props.route.params.id).onSnapshot(doc=>{
 
            this.setState({
                loading:false,
                comentarios: doc.data().comentarios
            })
        })
        db.collection('users')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot(docs=>{
            let user = {};
            docs.forEach(doc=>{
            user = ( {
                id:doc.id, 
                data:doc.data()})
        })
            this.setState({
            user: user,
            })
        })
    }
    comentar(){
        if (this.state.comentario == '') {
            return
        } else {
            // actualizar la colección de posteos de firebase
            db.collection('posteos').doc(this.props.route.params.id).update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    text: this.state.comentario,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                this.setState({
                    comentario: '',
                })
            })
            .catch(err => console.log(err))
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
                    <TouchableOpacity style={styles.touchable} onPress={()=> this.comentar(this.state.comentario)}>
                        <Text style={styles.texto}>Escribir comentario</Text>
                    </TouchableOpacity>

                }
                <TouchableOpacity style={styles.touchable} onPress={()=> this.cerrarComentario()}>
                        <Text style={styles.texto}>Cerrar comentarios</Text>
                    </TouchableOpacity>
                <Text style={styles.title}> Estos son los comentarios del posteo</Text>
                {this.state.comentarios.length ?
                <FlatList data={this.state.comentarios}
                    keyExtractor={(data)=> data.createdAt}
                    renderItem={({item})=> 
                <View> <Text ><strong>{item.owner}</strong></Text>
                <Text>{item.text}</Text></View>
                }
                    > 
                </FlatList>
                : <View>
                <Text>Aún no hay comentarios. ¡Sé el primero en comentar!</Text>
            </View>}
            <Text onPress={ () => this.props.navigation.navigate ("Navegador")} style={styles.botonx}>Volver al inicio</Text>
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