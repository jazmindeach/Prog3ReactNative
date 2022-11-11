import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Registro extends Component {
    constructor(){
        super()
        this.state = {
            mail: "",
            password: "",
            user: "",
            descripción: "",
            errores: "",
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Home")
            }
        })
    }

registrarUsuario(email,pass, userName, bio){
    
    auth.createUserWithEmailAndPassword(email,pass)
        .then(res =>{
                db.collection("users").add({
                    owner:email,
                    userName: userName, 
                    bio: bio,
                    createdAt: Date.now()
                })
                .then(()=>{
                    this.setState({
                        mail: "",
                        password: "",
                        user: "",
                        descripción: "",
                        errores: ""
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
            <View>
                <View> 
                    <Text> {this.state.errors}</Text>
                    <TextInput 
                        placeholder= 'Email'
                        keyboardType= 'email-address'
                        onChangeText={ 
                            texto => this.setState({
                                mail : texto
                            })
                        }
                        value = {this.state.mail}
                        
                    />
                    <TextInput 
                        placeholder= 'Contraseña'
                        keyboardType= 'default'
                        secureTextEntry = {true}
                        onChangeText={ texto => this.setState({password : texto})}
                        value = {this.state.password}
                        
                    />
                    <TextInput 
                        placeholder= 'Nombre de Usuario'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({user : texto})}
                        value = {this.state.user}
                        
                    />
                    <TextInput 
                        placeholder= 'Biografía'
                        keyboardType= 'default'
                        onChangeText={ texto => this.setState({descripción : texto})}
                        value = {this.state.descripción}
                        
                    />   

            


            {
                this.state.mail =="" || this.state.password =="" || this.state.user == "" ? 
                    <TouchableOpacity>
                        <Text>Registrarme</Text>
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



export default Registro;