import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SplashScreen, Login,  Home, AddFood, Messages, ForgotPassword, Register,  Calendar,  Chatting,  ChooseMentor, ImageIdentifier, RemainingBites } from '../pages';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator  screenOptions={{
      headerShown: false
    }} tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={ImageIdentifier}/>
      <Tab.Screen name="Store"  component={Calendar}/>
      <Tab.Screen name="Bites"  component={RemainingBites}/>
      {/*<Tab.Screen name="AI"  component={ImageIdentifier}/>*/}
      <Tab.Screen name="Messages"  component={Messages}/>
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      /> 
       <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFood}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImageIdentifier"
        component={ImageIdentifier}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseMentor"
        component={ChooseMentor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
