import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; 
import styles from './styles'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const hardcodedEmail = 'elkincarriel@gmail.com';
  const hardcodedPassword = 'elkin200508!';

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese su correo electrónico y contraseña.');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateInputs()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === hardcodedEmail && password === hardcodedPassword) {
        navigation.navigate('Dashboard'); 
      } else {
        Alert.alert('Error', 'Correo electrónico o contraseña incorrectos.');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ position: 'relative' }}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity
            style={styles.togglePassword}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Icon name={secureTextEntry ? 'visibility' : 'visibility-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </View>
  );
};

export default LoginScreen;