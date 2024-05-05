import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DocterSignupForm = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState('');
  const [married, setMarried] = useState('');
  const [disease, setDisease] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [bloodGroupError, setBloodGroupError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [marriedError, setMarriedError] = useState('');

  const handleCreate = async () => {
    try {
      // Clear previous errors
      setFullNameError('');
      setEmailError('');
      setPasswordError('');
      setPhoneNoError('');
      setBloodGroupError('');
      setDateOfBirthError('');
      setGenderError('');
      setMarriedError('');
  
      // Validate form fields
      if (!fullName) {
        setFullNameError('Please enter your Full Name');
        return;
      }
      if (!email) {
        setEmailError('Please enter your Email');
        return;
      }
      if (!password) {
        setPasswordError('Please enter a strong Password');
        return;
      }
      if (!phoneNo) {
        setPhoneNoError('Please enter your Phone Number');
        return;
      }
      if (!bloodGroup) {
        setBloodGroupError('Please enter your Blood Group');
        return;
      }
      if (!dateOfBirth) {
        setDateOfBirthError('Please enter your Date of Birth');
        return;
      }
      if (!gender) {
        setGenderError('Please select your Gender');
        return;
      }
      if (!married) {
        setMarriedError('Please select your Marital Status');
        return;
      }
  
      // Create a new user account with email and password
      const { user } = await auth().createUserWithEmailAndPassword(`${email}`, password);
  
      // Save user data to Firestore
      await saveUserData(user.uid);
  
      // Navigate to the login page
      navigation.navigate('DocterLogin');
      // console.log('Account created successfully!');
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      // console.error('Signup Error:');
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };
  
  // const userId = auth().currentUser.uid;
  // console.log('!!! current user id', userId);
  const saveUserData = async (userId) => {
    try {
      console.log('Saving user data:', userId, fullName, email, phoneNo, bloodGroup, dateOfBirth, gender, married, disease);
  
      const userRef = firestore().collection('patientUsers').doc(userId);
      await userRef.set({
        fullName,
        email,
        phoneNo,
        bloodGroup,
        dateOfBirth,
        gender,
        married,
        disease,
      });
  
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('DocterLogin');
    // console.log('Sign Up successfully!');
  };
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDateOfBirth(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../images/logo.jpg')} style={styles.image} />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Gets Started</Text>
          <Text style={styles.text}>Create an Account</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}

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

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
          />
          {phoneNoError ? <Text style={styles.errorText}>{phoneNoError}</Text> : null}

          <Picker
            selectedValue={bloodGroup}
            style={styles.input}
            onValueChange={itemValue => setBloodGroup(itemValue)}>
            <Picker.Item label="Select Blood Group" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="Not Confirmed" value="Not Confirmed" />
          </Picker>
          {bloodGroupError ? <Text style={styles.errorText}>{bloodGroupError}</Text> : null}

          <TouchableOpacity style={styles.input} onPress={() => showMode('date')}>
            <Text style={styles.show}>{dateOfBirth.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              display="default"
              onChange={onChange}
            />
          )}
          {dateOfBirthError ? <Text style={styles.errorText}>{dateOfBirthError}</Text> : null}

          
          <Picker
            selectedValue={gender}
            style={styles.input}
            onValueChange={itemValue => setGender(itemValue)}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null}

          
            <Picker
            selectedValue={married}
            style={styles.input}
            onValueChange={itemValue => setMarried(itemValue)}>
            <Picker.Item label="Select Status" value="" />
            <Picker.Item label="Married" value="Married" />
            <Picker.Item label="Unmarried" value="Unmarried" />
          </Picker>
          {marriedError ? <Text style={styles.errorText}>{marriedError}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Disease"
            value={disease}
            onChangeText={(text) => setDisease(text)}
          />

          
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.movetext}>
          Already have an account?{' '}
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.linkText}>Login</Text>
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
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 100,
    marginTop: 10,
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
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    fontSize: 16,
  },
  show: {
    width: '100%',
    marginTop: 10,
    marginBottom: 16,
    borderBottomWidth: 1.5,
    borderColor: 'white',
    fontSize: 16,
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

export default DocterSignupForm;
