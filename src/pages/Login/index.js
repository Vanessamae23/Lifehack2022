import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useForm, showError, showSuccess} from '../../utils';
import {Button, Header, Input, Gap, Link} from '../../components';
import {HomePage} from '../../assets';
import {useDispatch} from 'react-redux';
import { storeData } from '../../utils/localStorage';
import Firebase from 'firebase';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const login = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Firebase.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        dispatch({type: 'SET_LOADING', value: false});

        Firebase.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          });
      })
      .catch(e => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(e.message);
      });
  };

  const resetPassword = () => {
    if (form.email === null) {
      alert('Please fill in your email to reset password');
    }
    Firebase.auth()
      .sendPasswordResetEmail(form.email)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch(error => {
        showError(error.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.page}>
      <Header title="Account Login" subtitle="Let's reduce our waste today" />
      <View style={{justifyContent: 'space-between', flex: 1}}>
      <View style={styles.container}>
        <Gap height={16} />
        <Input label="Email Address"  value={form.email} onChangeText={value => setForm('email', value)} placeholder="Type your email address" />
        <Gap height={16} />
        <Input label="Password"  value={form.password} onChangeText={value => setForm('password', value)} placeholder="Type your Password" />
        <Gap height={200} />
        <Button onPress={login} text="Login" />
        <Gap height={20} />
        <Button
          onPress={() => navigation.navigate('Register')}
          text="Create New Account"
          color="#b45f06"
          textColor="white"
        />
        <Gap height={15} />
        <Link
          size={16}
          title="Forgot password"
          align="left"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
        
      </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
