import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Inicio from "./src/screens/Inicio";
import AgendarCita from "./src/screens/AgendarCita";
import EditarCita from "./src/screens/EditarCita";

const App = () => {

    const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Inicio" component={Inicio}/>
            <Stack.Screen name="Agendar Cita" component={AgendarCita}/>
            <Stack.Screen name="Editar Cita" component={EditarCita}/>
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
