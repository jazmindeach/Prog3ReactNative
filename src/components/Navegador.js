import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import Home from '../screens/Home';
import React, { Component } from 'react';
import CrearPosteo from '../screens/CrearPosteo';
import MiPerfil from '../screens/MiPerfil';
import Menu from '../components/Menu';
import Comentarios from '../screens/Comentarios';
import Buscador from '../screens/Buscador';

const Stack = createNativeStackNavigator();


class Navegador extends Component {

    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
                <Stack.Screen name='Comentarios' component={Comentarios} options={{ headerShown: false }} />

            </Stack.Navigator>

        );
    };
}

export default Navegador;