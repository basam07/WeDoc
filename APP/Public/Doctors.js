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
} from 'react-native';

const Doctor = ({ navigation }) => {
  const [doctorData, setDoctorData] = useState([]);

  const fetchData = async () => {
    try {
      const usersRef = firestore().collection('doctors');
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

      setDoctorData(userDataArray);
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

  const handleViewProfile = (userId) => {
    navigation.navigate('DoctorProfile', { userId });
  };

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleReport = () => {
    navigation.navigate('Report');
  };

  const handleCommunity = () => {
    navigation.navigate('Doctor');
  };

  const handleBlog = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../images/logo.jpg')} style={styles.image} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {doctorData.map((doctor, index) => (
          <TouchableOpacity
            key={index}
            style={styles.doctorItem}
            onPress={() => handleViewProfile(doctor.UId)}
          >
            <Image
              source={require('../../images/profile.png')}
              style={styles.icon}
            />
            <View style={styles.text}>
              <Text style={styles.name}>{doctor.fullName}</Text>
              <Text style={styles.detail}>{doctor.gender}</Text>
              <Text style={styles.detail}>{doctor.phoneNo}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fixed bottom bar with picture buttons */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDashboard}>
          <Image source={require('../../images/icon1.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleReport}>
          <Image source={require('../../images/icon2.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleCommunity}>
          <Image source={require('../../images/icon3.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleBlog}>
          <Image source={require('../../images/icon4.png')} style={styles.icon} />
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
  scrollContent: {
    paddingBottom: 100, // Ensure enough space for the bottom bar
  },
  doctorItem: {
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

export default Doctor;
