import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import { AuthProvider } from "./src/services/authService/AuthProvider";
import SpotifyTopTrackScreen from "./src/screens/SpotifyTopTrackScreen";
import UserDataScreen from "./src/screens/UserDataScreen";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Tracks: undefined;
  UserData: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="SignUp"
            options={{ headerShown: false }}
            component={SignUpScreen}
          />
          <Stack.Screen
            name="Dashboard"
            options={{ headerShown: false }}
            component={DashboardScreen}
          />
          <Stack.Screen
            name="Tracks"
            options={{ headerShown: false }}
            component={SpotifyTopTrackScreen}
          />
          <Stack.Screen
            name="UserData"
            options={{ headerShown: false }}
            component={UserDataScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
