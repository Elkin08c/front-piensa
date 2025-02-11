import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import { AuthProvider } from "./src/services/authService/AuthProvider";
import UserDataScreen from "./src/screens/UserDataScreen";
import SpotifyPlaylists from "./src/screens/SpotifyPlaylists";
import { MqttProvider } from "./src/mqtt/MqttProvider";
import ChartScreen from "./src/screens/ChartScreen";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Tracks: undefined;
  UserData: undefined;
  Chart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AuthProvider>
      <MqttProvider>
        <NavigationContainer>
          <Stack.Navigator id={undefined} initialRouteName="Login">
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
              component={SpotifyPlaylists}
            />
            <Stack.Screen
              name="UserData"
              options={{ headerShown: false }}
              component={UserDataScreen}
            />
            <Stack.Screen
              name="Chart"
              options={{ headerShown: false }}
              component={ChartScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MqttProvider>
    </AuthProvider>
  );
};

export default App;
