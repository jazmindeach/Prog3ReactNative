import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import MyPost from '../components/MyPost';

class MiPerfil extends Component {
    constructor() {
        super()
        this.state = {
            usuario: [],
            post: []
        }
    }

    componentDidMount() {
        db.collection("users").where("owner", "==", `${auth.currentUser.email}`).onSnapshot((docs) => {

            let usuario = []
            docs.forEach((doc) => {
                usuario.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuario: usuario
            })
        })

        db.collection("posteos").where('user', '==', auth.currentUser.email).onSnapshot((docs) => {
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
        console.log(this.state.post)

        return (
            <>

                <View style={styles.perfil}>

                    {this.state.usuario[0]?.data.fotoPerfil != "" ? <Image
                        source={{ uri: `${this.state.usuario[0]?.data.fotoPerfil}` }}
                        style={styles.image}
                    /> : <Text> No hay foto perfil </Text>}
                    <Image
                        source={{ uri: `${this.state.usuario[0]?.data.fotoPerfil}` }}
                        style={{ width: "100", flex: 1, height: 200 }}
                    />

                    <Text style={styles.campos}>  Bienvenido a tu perfil: {auth.currentUser.email} </Text>
                    <Text style={styles.campos}>Tus posteos: {this.state.post.length} </Text>
                    <Text style={styles.campos}> Tu nombre de usuario es:  {this.state.usuario[0]?.data.userName} </Text>
                    <Text style={styles.campos}> Tu imágen es:  {this.state.usuario[0]?.data.fotoPerfil} </Text>
                    <Text style={styles.campos}> Tu biografía es:  {this.state.usuario[0]?.data.bio} </Text>
                    <Text style={styles.campos}> Usuario activo desde:  {auth.currentUser.metadata.creationTime} </Text>

                    <TouchableOpacity onPress={() => this.signOut()}>
                        <Text style={styles.boton}> Cerrar tu sesión</Text>

                    </TouchableOpacity>
                    <Text> Estos son los posteos:</Text>

                    <FlatList data={this.state.post}
                        keyExtractor={(data) => data.id}
                        renderItem={({ item }) => <MyPost data={item}{...this.props} />}
                    >

                    </FlatList>


                </View>

            </>
        )

    }

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: "100%",
        height: 1000,
        alignContent: "center",
        marginVertical: 10,

    },


    perfil: {
        backgroundColor: 'rgb(007,134,255)',
        alignItems: 'center',
        height: "100%",
        paddingBottom: 500,
    },

    boton: {
        backgroundColor: 'rgb(234,252,255)',
        borderWidth: 1,
        borderRadius: 5,
        padding: 6,
        marginBottom: 7,
        marginTop: 30,
    },
    campos: {
        padding: "1%",
        marginBottom: 18,
        borderRadius: 10,
        borderWidth: 3,
        width: "78%",

    }

})


export default MiPerfil;