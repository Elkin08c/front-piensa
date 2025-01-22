import { StyleSheet } from 'react-native';

// Definir constantes para colores y tamaños
const COLORS = {
  background: '#f5f5f5',
  text: '#333',
  buttonBackground: '#007BFF',
  buttonText: '#fff',
};

const SIZES = {
  padding: 16,
  margin: 12,
  borderRadius: 4,
  fontSize: 24,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: SIZES.fontSize,
    fontWeight: 'bold',
    marginBottom: SIZES.margin * 2,
    textAlign: 'center',
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.buttonBackground,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
  },
});

export default styles;