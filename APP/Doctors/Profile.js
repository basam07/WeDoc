import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

// Sample doctor data
const doctor = {
  name: 'Ali Raza',
  Deseace: 'Fever',
  location: 'Faisalabad',
  profileImage: require('../../images/profile.png'),
};

const PatientProfile = ({ navigation }) => {
  const handleChatPress = () => {
    // Navigate to the chat screen
    // navigation.navigate('Chat');
    Alert.alert('Chat', 'Chat with the Patient');
  };

  const handleAppointmentPress = () => {
    // Navigate to the appointment screen
    // navigation.navigate('Appointment');
    Alert.alert('Appointment', 'Book an appointment with the doctor');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={doctor.profileImage} style={styles.profileImage} />
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorInfo}>{doctor.specialty}</Text>
        <Text style={styles.doctorInfo}>{doctor.location}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChatPress}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAppointmentPress}>
          <Text style={styles.buttonText}>Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  doctorInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e60000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PatientProfile;
