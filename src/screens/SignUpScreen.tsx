import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; 
import styles from './styles'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!validateInputs()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Éxito', 'Usuario registrado exitosamente.');
      navigation.navigate('Dashboard'); 
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={1500} style={styles.card}>
        <Animatable.Text animation="bounceIn" duration={1500} style={styles.title}>
          Crear Cuenta
        </Animatable.Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={styles.placeholderText.color}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={styles.placeholderText.color}
        />
        <View style={{ position: 'relative' }}>
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
            <Icon name={secureTextEntry ? 'visibility' : 'visibility-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={styles.placeholderText.color}
        />
        <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </Animatable.View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;