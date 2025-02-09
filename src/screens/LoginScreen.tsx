import { useEffect, useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useAuth } from "../services/authService/AuthContext";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login, isLoading, user } = useAuth();

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

  useEffect(() => {
    if (user) navigation.replace("Dashboard");
  }, [user]);

  const handleLogin = async () => {
    if (!validateInputs()) return;
    try {
      await login({ email, password });
      navigation.replace("Dashboard");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Correo electrónico o contraseña incorrectos.");
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
          keyboardType="email-address"
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
            <MaterialIcons
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
            disabled={isLoading}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animatable.View>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;
