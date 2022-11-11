import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Registro from '../screens/Registro';
import Login from '../screens/Login';


const Stack = createNativeStackNavigator();


function Navegador() {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name='Registro' component={Registro} options= {{ headerShown : false}}/>
        <Stack.Screen name='Login' component={Login} options= {{ headerShown : false}}/>
      </Stack.Navigator>
    
  );
};


export default Navegador;