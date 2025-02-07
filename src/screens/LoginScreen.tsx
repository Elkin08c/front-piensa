import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import apiservice from "../services/apiservice";
import { AuthResponse } from "../interfaces/AuthResponse";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert(
        "Error",
        "Por favor, ingrese su correo electrónico y contraseña."
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setDisable(true);
    try {
      const response = await apiservice.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      const { accessToken } = response.data;
      if (accessToken) {
        navigation.navigate("Dashboard");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
    } finally {
      setLoading(false);
      setDisable(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.card}>
        <Animatable.Text
          animation="bounceIn"
          duration={1500}
          style={styles.title}
        >
          Bienvenido
        </Animatable.Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={styles.placeholderText.color}
        />
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={styles.placeholderText.color}
          />
          <TouchableOpacity
            style={styles.togglePassword}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Icon
              name={secureTextEntry ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
        >
          <TouchableOpacity
            style={styles.button}
            disabled={disable}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animatable.View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;
