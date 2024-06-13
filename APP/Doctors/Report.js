import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

const DrReport = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = () => {
    Alert.alert('Select Image', 'Please select an image from gallery');
};

const handleOpenCamera = () => {
      Alert.alert('Open Camera', 'Please Click a picture from camera');
    
    }

    const handleDashboard = () => {
        navigation.navigate('DocterDashboard');
        // console.log('Sign Up successfully!');
      };
      const handleReport = () => {
        navigation.navigate('DocterReport');
        // console.log('Sign Up successfully!');
      };
      const handleCommunity = () => {
        navigation.navigate('Patients');
        // console.log('Sign Up successfully!');
      };
      const handleBlog = () => {
        navigation.navigate('DocterDashboard');
        // console.log('Sign Up successfully!');
      };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../images/logo.jpg')} style={styles.image} />
      </View>

      <WebView source={{ uri: 'http://geekgenies.com/eee' }} style={styles.webView} />
      
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
  searchContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  searchtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft: '5%',
  },
  imagePreview: {
    width: '90%',
    height: 200,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e60000',
    padding: 12,
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  output: {
    height: '55%',
    alignSelf: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
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

export default DrReport;
