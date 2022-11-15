import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import Home from '../screens/Home';
import React, { Component } from 'react';
import CrearPosteo from '../screens/CrearPosteo';
import MiPerfil from '../screens/MiPerfil';

const Stack = createNativeStackNavigator();


class Navegador extends Component {
   
    render() {
        return (

            <Stack.Navigator>
                <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='CrearPosteo' component={CrearPosteo} options={{ headerShown: false }} />
                <Stack.Screen name='MiPerfil' component={MiPerfil} options={{ headerShown: false }} />
            </Stack.Navigator>

        );
    };
}

export default Navegador;