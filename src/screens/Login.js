import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            mail: "",
            password: "",
            errores: "",
        }
    }


LoguearUsuario(mail, password){
    auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                this.props.navigation.navigate("Home")
            })
            .catch(error => 
                this.setState({
                errors: `Tienes un error: ${error.message}`
            })
            )
    }
    

    render(){
        return(
            <View>
                <View> 
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


            {
                this.state.mail =="" || this.state.password ==""  ? 
                    <TouchableOpacity>
                        <Text>Loguearme</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={ () => this.LoguearUsuario ( this.state.mail, this.state.password)}>
                        <Text>Loguearme</Text>
                    </TouchableOpacity>
            }
                    <Text onPress={ () => this.props.navigation.navigate ("Registro")}> No tengo cuenta, registrarme </Text>
                    
                </View>
            </View>
        
        )
        
        }
}



export default Login;