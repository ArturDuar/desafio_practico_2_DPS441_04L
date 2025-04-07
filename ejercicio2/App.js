import Details from './src/screens/details'
import Home from './src/screens/home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{headerShown: false }}/>
          <Stack.Screen name="Details" component={Details} options={{headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}

