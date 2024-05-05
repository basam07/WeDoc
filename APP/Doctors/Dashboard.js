import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';

const DrDashboard = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSearch = () => {
    setSearchError('');
    if (!search) {
      setSearchError('Please enter some details');
    } else {
      // Perform search logic here
    }
  };

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
      <View style={styles.searchContainer}>
        <Text style={styles.title}>WeDoc for Help</Text>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {searchError ? <Text style={styles.errorText}>{searchError}</Text> : null}
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.searchtitle}>Results:</Text>
      <Text style={styles.output}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        
      </Text>

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

export default DrDashboard;
