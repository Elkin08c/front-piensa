import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const COLORS = {
  background: '#0d1b2a',
  text: '#ffffff',
  buttonBackground: '#6A5ACD',
  buttonText: '#ffffff',
  cardBackground: 'rgba(255, 255, 255, 0.1)',
  shadow: '#000000',
};

const SIZES = {
  padding: 16,
  margin: 12,
  borderRadius: 75,
  fontSize: 24,
  titleFontSize: 48,
  cardPadding: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  greeting: {
    fontSize: SIZES.fontSize,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  time: {
    fontSize: SIZES.titleFontSize,
    color: COLORS.text,
    fontWeight: 'bold',
    marginTop: 10,
  },
  astronautContainer: {
    alignItems: 'center',
  },
  astronautCircle: {
    width: 150,
    height: 150,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: SIZES.fontSize,
    color: COLORS.text,
  },
  sleepButton: {
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: SIZES.padding,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  sleepButtonText: {
    fontSize: 18,
    color: COLORS.buttonText,
    fontWeight: 'bold',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

const SleepTracker = () => {
  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/night-sky-background.jpg' }} // Cambia esto a tu fondo de estrellas
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Night</Text>
        <Text style={styles.time}>20:30</Text>
      </View>

      <View style={styles.astronautContainer}>
        <View style={styles.astronautCircle}>
          <Text style={{ color: COLORS.text, fontSize: 80 }}>🛌</Text>
          {/* Cambia este ícono por la animación del astronauta */}
        </View>
        <Text style={styles.timer}>04:00</Text>
      </View>

      <TouchableOpacity style={styles.sleepButton}>
        <Text style={styles.sleepButtonText}>START SLEEPING</Text>
      </TouchableOpacity>

      <View style={styles.navigationBar}>
        <Text style={{ color: COLORS.text, fontSize: 30 }}>🏠</Text>
        <Text style={{ color: COLORS.text, fontSize: 30 }}>🌙</Text>
        <Text style={{ color: COLORS.text, fontSize: 30 }}>📊</Text>
      </View>
    </ImageBackground>
  );
};

export default SleepTracker;
