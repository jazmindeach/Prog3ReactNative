import { StyleSheet, View } from 'react-native';
import Navegador from "./src/components/Navegador" 
import {NavigationContainer} from "@react-navigation/native"


function App() {
  return (
    <NavigationContainer>
      <Navegador/> 
    </NavigationContainer>
  );
};


export default App;