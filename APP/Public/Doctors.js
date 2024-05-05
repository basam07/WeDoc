import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert
} from 'react-native';

const doctors = [
  { id: 1, name: 'Dr. Ali', specialty: 'Cardiologist', location: 'Faislabad' },
  // Add more doctors as needed
];

const Doctor = ({ navigation }) => {
  const handleViewProfile = () => {
    navigation.navigate('DoctorProfile');
  };
  const handleDashboard = () => {
    navigation.navigate('Dashboard');
    // console.log('Sign Up successfully!');
  };
  const handleReport = () => {
    navigation.navigate('Report');
    // console.log('Sign Up successfully!');
  };
  const handleCommunity = () => {
    navigation.navigate('Doctor');
    // console.log('Sign Up successfully!');
  };
  const handleBlog = () => {
    navigation.navigate('Dashboard');
    // console.log('Sign Up successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../images/logo.jpg')} style={styles.image} />
      </View>
      <View style={styles.doctorList}>
        {doctors.map(doctor => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.doctorItem}
            onPress={() => handleViewProfile(doctor)}
          >
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorInfo}>{doctor.specialty}</Text>
            <Text style={styles.doctorInfo}>{doctor.location}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingBottom: 80, // Adjust for bottom bar height
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 50,
  },
  doctorList: {
    marginTop: 30,
    marginBottom: 20,
  },
  doctorItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorInfo: {
    fontSize: 16,
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
  icon: {
    width: 30,
    height: 30,
  },
});

export default Doctor;
