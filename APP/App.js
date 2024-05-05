/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// main page
import HomePage from './Home';
//public pages
import Main from './Main';
//patients pages
import PatientLoginForm from './Public/PatientLogin';
import PatientSignupForm from './Public/PatientSignUp';
import Dashboard from './Public/Dashboard';
import Report from './Public/Report';
import Doctor from './Public/Doctors';
import DoctorProfile from './Public/Profile';
//doctors pages
import DocterLoginForm from './Doctors/DocterLogin';
import DocterSignupForm from './Doctors/DocterSignUp';
import DrDashboard from './Doctors/Dashboard';
import DrReport from './Doctors/Report';
import Patient from './Doctors/Patients';
import PatientProfile from './Doctors/Profile';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home"> */}
      <Stack.Navigator initialRouteName="Main">

        {/* home page */}
        <Stack.Screen name="Home" component={HomePage}/>

        {/* public pages */}
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="PatientLogin" component={PatientLoginForm}/>
        <Stack.Screen name="PatientSignUp" component={PatientSignupForm} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Doctor" component={Doctor} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} />

        {/* doctors pages */}
        <Stack.Screen name="DocterLogin" component={DocterLoginForm}/>
        <Stack.Screen name="DocterSignUp" component={DocterSignupForm} />
        <Stack.Screen name="DocterDashboard" component={DrDashboard} />
        <Stack.Screen name="DocterReport" component={DrReport} />
        <Stack.Screen name="Patients" component={Patient} />
        <Stack.Screen name="PatientProfile" component={PatientProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
