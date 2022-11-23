import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            mail: "",
            password: "",
            errores: "",
        }
    }


    LoguearUsuario(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then(res => {
                this.props.navigation.navigate("Menu")
            })
            .catch(error =>
                this.setState({
                    errors: `Tienes un error: ${error.message}`
                })
            )
    }


    render() {
        return (
            <View style={styles.input}>
                <Text style={styles.title}> Login</Text>
                <View >
                    <TextInput style={styles.miniInput}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={
                            texto => this.setState({
                                mail: texto
                            })
                        }
                        value={this.state.mail}

                    />
                    <TextInput style={styles.styleContra}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={texto => this.setState({ password: texto })}
                        value={this.state.password}

                    />


                    {
                        this.state.mail == "" || this.state.password == "" ?
                            <TouchableOpacity>
                                <Text style={styles.log} >Loguearme</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => this.LoguearUsuario(this.state.mail, this.state.password)}>
                                <Text>Loguearme</Text>
                            </TouchableOpacity>
                    }
                    <Text style={styles.noTengoCuenta} onPress={() => this.props.navigation.navigate("Registro")}> No tengo cuenta, registrarme </Text>

                </View>
            </View>

        )

    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        backgroundColor: 'rgb(007,134,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        padding: 10,
        marginBottom: 7

    },
    miniInput: {
        backgroundColor: 'rgb(234,252,255)',
        borderWidth: 1,
        borderRadius: 5,
        padding: 6,
        marginBottom: 7
    },
    styleContra: {
        backgroundColor: 'rgb(284,252,255)',
        borderWidth: 1,
        borderRadius: 5,
        padding: 6,
        marginBottom: 0
    },
    title: {
        spaceAround: 4,
        textAlign: 'center',
        fontSize: 24,
        margin: 8,
        alignItems: 'center',

    },
    log: {
        spaceAround: 4,
        textAlign: 'center',
        fontSize: 24,
        margin: 8,
        borderRadius: 4,
        padding: 7,
        backgroundColor: 'rgb(100,105,105)',
        margin: 50,
        alignItems: 'center',

    },

    noTengoCuenta: {
        alignItems: 'center',

    }

})

export default Login;