import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PatientLoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    try {
      // Clear previous errors
      setEmailError('');
      setPasswordError('');

      // Validate email and password
      if (!email) {
        setEmailError('Please enter your email');
        return;
      }

      if (!password) {
        setPasswordError('Please enter your password');
        return;
      }

      // Sign in with email and password
      const response = await auth().signInWithEmailAndPassword(email, password);

      if (checkUserExists) {
        Alert.alert('Success', 'Login successful.');
        // Navigate to Dashboard or another screen
        navigation.navigate('Dashboard');

      } else {
        Alert.alert('Error', 'You entered a wrong email or password.');
        await saveUserInDB(response.user.uid, email);
      }

      console.log('Login successful:', response.user.uid);
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Invalid email or password.');
      } else {
        console.error('Login Error:', error);
        Alert.alert('Error', 'You have no account. Please Sign Up.');
      }
    }
  };

  const checkUserExists = async (userId) => {
    try {
      const userDoc = await firestore().collection('publicUsers').doc(userId).get();
      return userDoc.exists;
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
  };

  const handleSignUp = () => {
    navigation.navigate('PatientSignUp');
    // console.log('Sign Up successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../images/logo.jpg')} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.movetext}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 100,
    marginTop: 50,
    marginBottom: 50,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 40,
    color: '#000000',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
    borderColor: 'gray',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#e60000',
    padding: 12,
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  movetext: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default PatientLoginForm;
