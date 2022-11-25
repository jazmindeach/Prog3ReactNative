import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import Posteos from '../components/Posteos';

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: [],
            post: [],
            idUsuario: ""
        }
    }

    componentDidMount() {
        db.collection("users").where("owner", "==", auth.currentUser.email).onSnapshot(
            (docs) => {

            let usuarios = []
            docs.forEach((doc) => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuario: usuarios[0].data,
                idUsuario: usuarios[0].id
            })
        })

        db.collection("posteos").where('creador', '==', auth.currentUser.email).onSnapshot(
            (docs) => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                post: posteos
            })
        })
    }

    signOut() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
    console.log(this.state.usuario.fotoPerfil)
        return (
            <>
                <View>
                <View>
                    {
                    this.state.usuario.fotoPerfil != "" ? 
                    <Image
                        source={{ uri: this.state.usuario.fotoPerfil}}
                        style={styles.image}
                        resizeMode="contain"
                    /> 
                    : 
                    <Text> No hay foto perfil </Text>
                    }
                     </View>
                    
                    <Text> Bienvenido a tu perfil: {this.state.usuario.mail}</Text>
                    <Text> Tu nombre de usuario es:  {this.state.usuario.userName} </Text>
                    <Text> Tu biografía es:  {this.state.usuario.bio} </Text>
                    <Text> usuario activo desde:  {this.state.usuario[0]?.data.createdAt} </Text>
                </View>
                <TouchableOpacity onPress={() => this.signOut()}>
                    <Text style={styles.boton}> Cerrar tu sesión</Text>
                </TouchableOpacity>

                {this.state.post.length !== 0 ?
                        <FlatList
                            data={this.state.post}
                            keyExtractor={onePost => onePost.data.createdAt.toString()}
                            renderItem={({ item }) =>
                                <Posteos posteoData={item} navigation={this.props.navigation} />
                            }
                        />
                        :
                        <Text style={styles.aviso}> Aun no hay publicaciones</Text>
                    }
            </>
        )

    }

}

const styles = StyleSheet.create({
    image: {
        width:"100%",
        height:300,
        alignContent:"center",
        marginVertical:10,
    }
})


export default MiPerfil;