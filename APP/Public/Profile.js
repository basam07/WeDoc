import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
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
  profileImage: require('../../images/profile.png'),
};

const DoctorProfile = ({ navigation, route }) => {
  const { userId } = route.params;
  const [doctorData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userRef = firestore().collection('doctors').doc(userId);
      const docSnapshot = await userRef.get();

      if (docSnapshot.exists) {
        setPatientData(docSnapshot.data());
      } else {
        console.log('User not found.');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleChatPress = userId => {
    // Navigate to the chat screen
    navigation.navigate('PatientChat', { userId });
  };

  const handleAppointmentPress = () => {
    // Navigate to the appointment screen
    // navigation.navigate('Appointment');
    Alert.alert('Appointment', 'Appoint an appointment with the doctor');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {doctorData ? (
        <View style={styles.profileContainer}>
          <Image source={doctor.profileImage} style={styles.profileImage} />
          <Text style={styles.doctorName}>{doctorData.fullName}</Text>
          <Text style={styles.doctorInfo}>{doctorData.phoneNo}</Text>
        </View>
      ) : (
        <Text>User not found.</Text>
      )}
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

export default DoctorProfile;
