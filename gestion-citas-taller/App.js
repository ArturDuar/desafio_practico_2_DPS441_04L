import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Inicio from "./src/screens/InicioScreen";
import AgendarCita from "./src/screens/AgendarCitaScreen";
import EditarCita from "./src/screens/EditarCitaScreen";
import Colors from './src/utils/colors';

const App = () => {
  const [citas, setCitas] = useState([]);

  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio" screenOptions={{headerStyle: {backgroundColor: Colors.COLOR_PRIMARY}, headerTintColor: 'white', headerTitleStyle: {fontWeight: 'bold'}}}>
        
            <Stack.Screen name="Inicio">
            {(props) => <Inicio citas={citas} setCitas={setCitas} {...props} />}
            </Stack.Screen>

            <Stack.Screen name="Crear Cita">
            {(props) => <AgendarCita citas={citas} setCitas={setCitas} {...props}/>}
            </Stack.Screen>

            <Stack.Screen name="Editar Cita">
            {(props) => <EditarCita citas={citas} setCitas={setCitas} {...props}/>}
            </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
