import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import MyPost from '../components/MyPost';

class MiPerfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuario: [],
            post: [],
            idUsuario: "",
            borrar: false,
            errorAlEliminar: false
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

    eliminarPerfil(){
        auth.currentUser.delete()
        .then(()=> {
            this.props.navigation.navigate('Registro')
        })
        .catch(()=>{
            this.setState({
                errorAlEliminar: true
            })
        })
    }

    render() {
        console.log(this.state.post)
        console.log(auth.currentUser.email)
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
                    <Text>  Estos son los posteos:</Text>

                    <FlatList data={this.state.post}
                        keyExtractor={(data) => data.id}
                        renderItem={({ item }) => <MyPost data={item}{...this.props} />}
                    />


                    <TouchableOpacity onPress={() => this.setState({ borrar: true })}> <Text> Eliminar perfil </Text> </TouchableOpacity>
                    {this.state.borrar == false ? <Text> </Text> : <> <Text> Estas seguro que quieres eliminar el perfil, es permanente!</Text>
                        <TouchableOpacity onPress={() => this.eliminarPerfil()}> <Text> Si eliminar </Text> </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ borrar: false })}> <Text> No eliminar </Text> </TouchableOpacity> </>}

                    
                    {this.state.errorAlEliminar == false ? <Text> </Text> :  <Text> Esta es una operación sensible, volvé a iniciar sesión para eliminar tu perfil</Text>}



                </View>

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