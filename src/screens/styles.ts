import { StyleSheet } from 'react-native';

// Definir constantes para colores y tamaños
const COLORS = {
  background: '#f0f0f5',
  border: '#dcdcdc',
  text: '#333',
  inputBackground: '#fff',
  buttonBackground: '#6200ea',
  buttonText: '#fff',
  placeholderText: '#888',
  linkText: '#6200ea',
  socialButtonBackground: '#333',
  shadow: '#000',
};

const SIZES = {
  padding: 16,
  margin: 12,
  borderRadius: 10,
  fontSize: 18,
  titleFontSize: 28,
  inputHeight: 50,
  buttonHeight: 50,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  card: {
    width: '90%',
    padding: SIZES.padding,
    backgroundColor: '#fff',
    borderRadius: SIZES.borderRadius,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: SIZES.titleFontSize,
    fontWeight: 'bold',
    marginBottom: SIZES.margin * 2,
    textAlign: 'center',
    color: COLORS.text,
  },
  input: {
    height: SIZES.inputHeight,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
    fontSize: SIZES.fontSize,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.buttonBackground,
    padding: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    marginTop: SIZES.margin,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: SIZES.fontSize,
    fontWeight: 'bold',
  },
  togglePassword: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});

export default styles;