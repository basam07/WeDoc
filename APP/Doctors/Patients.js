import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';

const Patient = ({ navigation }) => {
  const [patientData, setPatientData] = useState([]);

  const fetchData = async () => {
    try {
      const usersRef = firestore().collection('patientUsers');
      const querySnapshot = await usersRef.get();

      const userDataArray = [];
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          const userData = doc.data();
          const UId = doc.id;
          const { fullName, gender, phoneNo } = userData;

          userDataArray.push({ fullName, gender, phoneNo, UId });
        } else {
          console.log('No such document!');
        }
      });

      setPatientData(userDataArray);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleViewProfile = userId => {
    navigation.navigate('PatientProfile', { userId });
  };
  const handleDashboard = () => {
    navigation.navigate('DocterDashboard');
  };
  const handleReport = () => {
    navigation.navigate('DocterReport');
  };
  const handleCommunity = () => {
    navigation.navigate('Patients');
  };
  const handleBlog = () => {
    navigation.navigate('DocterDashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../images/logo.jpg')} style={styles.image} />
      </View>

      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {patientData.map((patient, index) => (
            <TouchableOpacity
              key={index}
              style={styles.patientItem}
              onPress={() => handleViewProfile(patient.UId)}
            >
              <Image
                source={require('../../images/profile.png')}
                style={styles.icon}
              />
              <View style={styles.text}>
                <Text style={styles.name}>{patient.fullName}</Text>
                <Text style={styles.detail}>{patient.gender}</Text>
                <Text style={styles.detail}>{patient.phoneNo}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Fixed bottom bar with picture buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDashboard}>
          <Image
            source={require('../../images/icon1.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleReport}>
          <Image
            source={require('../../images/icon2.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleCommunity}>
          <Image
            source={require('../../images/icon3.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleBlog}>
          <Image
            source={require('../../images/icon4.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 50,
  },
  listContainer: {
    flex: 1,
    marginBottom: 60, // Make room for the bottom bar
  },
  scrollContent: {
    paddingBottom: 20,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
  },
  text: {
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Patient;
