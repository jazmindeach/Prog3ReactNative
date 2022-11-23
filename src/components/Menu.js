import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import CrearPosteo from '../screens/CrearPosteo'
import MiPerfil from '../screens/MiPerfil'
import { FontAwesome } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Menu() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name='home' size={24} color='black' />
            }} />
            <Tab.Screen name="Crear Posteo" component={CrearPosteo} options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name='camera' size={24} color='black' />
            }} />
            <Tab.Screen name="Mi Perfil" component={MiPerfil} options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name='user' size={24} color='black' />
            }} />

        </Tab.Navigator>
    )
}