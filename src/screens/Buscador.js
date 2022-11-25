import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import Posteos from '../components/Posteos';

class Buscador extends Component {
    constructor() {
        super()
        this.state = {
            busqueda: "",
            resultadoBusqueda: [],
            buscoPerfil: false,
            posteoUsuario:[],
        }
    }

    componentDidMount (){
        
    }
    busquedaUsuario(texto){
        (db.collection("users").where("userName","==",texto).onSnapshot((docs)=>{
            let user = []
            docs.forEach((doc)=>{
                user.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState ({
                resultadosBusqueda: user
            })
        })) 


    }

    traerUsuarios (usuario){
        (db.collection("posteos").where("user","==",usuario).onSnapshot((docs)=>{
            let user = []
            docs.forEach((doc)=>{
                user.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState ({
                posteoUsuario: user,
                buscoPerfil: true,
            })
        })) 
    }
    
    render() {
        return (
            <>
            <View style={styles.container}> 
            <Text>Pagina de busqueda</Text>
            <TextInput style={styles.miniInput}
                        placeholder= 'Buscar usuario'
                        keyboardType= 'default'
                        onChangeText={ 
                            texto =>{
                                this.setState({
                                    busqueda : texto
                                }),
                                this.busquedaUsuario(texto)
                            } 
                        }
                        value = {this.state.busqueda}
                    />
                {this.state.busqueda?.length!=0?this.state.resultadosBusqueda?.length==0?<Text>No se encuentran perfiles con ese nombre</Text>:
                    <FlatList data={this.state.resultadosBusqueda}
                    keyExtractor={(data)=> data.id}
                    renderItem={({item})=> <> 
                    <Text>Encontramos este perfil, clickealo para saber mas</Text> <TouchableOpacity onPress={()=>this.traerUsuarios(item.data.owner)}>
                    <Text>{item.data.owner} Tambien conocida como {item.data.userName}</Text> </TouchableOpacity> </>
                    }
                        > 
                    </FlatList>
                :<Text>Aun no has buscado nada</Text>}
               {this.state.buscoPerfil? <>
                <FlatList data={this.state.resultadosBusqueda}
                    keyExtractor={(data)=> data.id}
                    renderItem={({item})=> 
                   <>
                    <Text> Estas viendo el perfil de: {item.data.owner} </Text>
                    <Text> Su nombre de usuario es:  {item.data.userName} </Text>
                    <Text> Su imágen es:  {item.data.fotoPerfil} </Text>
                    <Text> Su biografía es:  {item.data.bio} </Text>
                    <Text> Usuario activo desde:  {item.data.createdAt} </Text>
                   </>

                    }
                        > 
                    </FlatList>
                    {this.state.posteoUsuario.length==0?<Text>Este usuario no cuenta con posteos</Text>:
                    <FlatList data={this.state.posteoUsuario}
                    keyExtractor={(data)=> data.id}
                    renderItem={({item})=> <Posteos data={item}{...this.props}/>}
                    > 
                    
                    </FlatList> 
                    }

                
                
                </>:<Text></Text>}
                </View>
             </>
             
        )

    }
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
    miniInput: {
        backgroundColor: 'rgb(234,252,255)',
        borderWidth: 1,
        borderRadius:5,
        padding: 6,
        marginBottom: 7
    },
    

})




export default Buscador;