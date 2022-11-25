import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ViewBase} from 'react-native';
import Camara from '../components/Camara';

class Registro extends Component {
    constructor(){
        super()
        this.state = {
            mail: "",
            password: "",
            user: "",
            descripción: "",
            errores: "",
            foto: "",
            mostrarCamera: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Menu")
            }
        })
    }



    onImageUpload(url) {
        console.log(url)
        this.setState({
            foto: url,
            mostrarCamera: false
        })
    }

registrarUsuario(email,pass, userName, bio, foto){

    auth.createUserWithEmailAndPassword(email,pass)
        .then(res =>{
                db.collection("users").add({
                    owner:email,
                    userName: userName, 
                    bio: bio,
                    createdAt: Date.now(),
                    fotoPerfil: foto
                })
                .then(()=>{
                    this.setState({
                        mail: "",
                        password: "",
                        user: "",
                        descripción: "",
                        errores: "",
                        foto: ""
                    })
                    this.props.navigation.navigate("Login")
                })
                .catch(error => console.log(error))    
        })
        .catch(error => 
            this.setState({
            errors: `Tienes un error: ${error.message}`
        })
        )}

    

    render(){
      
        return(
            <View style={styles.inputs}>
                <View>  
                    <Text> {this.state.errors}</Text>
                    <TextInput style={styles.miniInput}
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ 
                            texto => this.setState({
                                mail : texto
                            })
                        }
                        value = {this.state.mail}
                        
                    />
                    <TextInput style={styles.miniInput}
                        placeholder= 'Contraseña'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ texto => this.setState({password : texto})}
                        value = {this.state.password}
                        
                    />
                    <TextInput style={styles.miniInput}
                        placeholder= 'Nombre de Usuario'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({user : texto})}
                        value = {this.state.user}
                        
                    />
                    <TextInput style={styles.miniInput}
                        placeholder= 'Biografía'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({descripción : texto})}
                        value = {this.state.descripción}
                        
                    />   
                
             
                 {
                     this.state.mostrarCamera ?
                     <View>
                         <Camara onImageUpload={url => this.onImageUpload(url)} style={{width: "15vw", heigth: "15vh", alignItems: 'center'}}/>
                          </View> 
                          :
                          <TouchableOpacity onPress={()=> this.setState({mostrarCamera:true})}>
                            <Text> Subir foto de perfil</Text>
                        </TouchableOpacity>
                 }
            


            {
                this.state.mail =="" || this.state.password =="" || this.state.user == "" ? 
                    <TouchableOpacity>
                        <Text style={styles.register} >Registrarme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.registrarUsuario ( this.state.mail, this.state.password, this.state.user, this.state.descripción, this.state.foto)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Login")}> Ya tienes cuenta. Anda al login</Text>
                    
                </View>
            </View>
        
        )
        
        }
}

const styles = StyleSheet.create ({
    inputs: {
        flex:1,
        backgroundColor: 'rgb(007,134,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        padding: 10,
       
         
    },
    miniInput: {
        backgroundColor: 'rgb(234,252,255)',
        borderWidth: 1,
        borderRadius:5,
        padding: 6,
        marginBottom: 7
        
    },
    register: {
        backgroundColor: 'rgb(500,252,255)',
        padding: 6,
        margin: 50
     
    }

})

export default Registro;