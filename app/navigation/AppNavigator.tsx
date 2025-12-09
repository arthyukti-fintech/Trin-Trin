import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../login'
import CompactFoodHeader from '../components/HomeHeader';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator>
      {!authState.isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={CompactFoodHeader} // Only this screen
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
