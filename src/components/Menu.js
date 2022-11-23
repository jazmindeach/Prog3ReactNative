import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import CrearPosteo from '../screens/CrearPosteo'
import MiPerfil from '../screens/MiPerfil'
import Buscador from '../screens/Buscador'

const Tab = createBottomTabNavigator()

export default function Menu() {
    return (
        <Tab.Navigator> 
            <Tab.Screen name= "Home" component={Home} /> 
            <Tab.Screen name= "Crear Posteo" component={CrearPosteo}  /> 
            <Tab.Screen name= "Mi Perfil" component={MiPerfil} /> 
            <Tab.Screen name= "Buscador" component={Buscador} /> 

        </Tab.Navigator>
    )}