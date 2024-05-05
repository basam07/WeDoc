import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

const HomePage = ({ navigation }) => {
  // Navigate to the next screen after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Replace 'NextScreen' with the name of the screen you want to navigate to
      navigation.replace('PatientLogin');
    }, 2000); // 5000 milliseconds = 5 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../images/logo.jpg')} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 350,
    height: 135,
    resizeMode: 'contain', // Ensure the image fits within the specified dimensions
  },
});

export default HomePage;
