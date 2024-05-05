import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Main = ({ navigation }) => {
  const handlePublicButtonPress = () => {
    // Navigate to the public page
    navigation.navigate('PatientLogin');
  };

  const handleDoctorsButtonPress = () => {
    // Navigate to the doctors page
    navigation.navigate('DocterLogin');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../images/logo.jpg')} style={styles.logo} />

      {/* Buttons with icons */}
      <TouchableOpacity style={styles.button} onPress={handleDoctorsButtonPress}>
        <Image source={require('../images/doctor.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePublicButtonPress}>
        <Image source={require('../images/patient.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 50,
    bottom: 200,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e60000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
    width: '80%',
    height: 100,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Main;
