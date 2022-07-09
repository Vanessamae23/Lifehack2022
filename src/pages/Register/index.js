import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Header, Select } from '../../components'
import { Gap, Button, Input } from '../../components'
import { Profile } from '../../assets'
import Firebase from 'firebase'
import { useForm } from '../../utils'
import { storeData } from '../../utils/localStorage'
import { showError, colors } from '../../utils';
import { showMessage } from 'react-native-flash-message'
import SelectDropdown from 'react-native-select-dropdown';
import { IconDropdown } from '../../assets';


const Register = ({navigation}) => {
  const roles = ['Buddies', 'Counsellors', 'Sergeants'];
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    fullName: '',
    email: '',
    password: '',
  });

  

  const onContinue = () => {
    setLoading(true);
    Firebase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        // Signed in
        setLoading(false);
        var user = userCredential.user;
        const data = {
          fullName: form.fullName,
          email: form.email,
          uid: user.uid,
        };
        // set is to keep the data
        Firebase.database()
          .ref('users/' + user.uid + '/')
          .set(data);
        storeData('user', data);
        navigation.navigate('MainApp')
        setForm('reset');

      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        // ..
      });
  };



  return (
    <View style={styles.page}>
        <Header onBack onPress={() => navigation.goBack()} title="Register" subtitle="Make an Account and Order a Meal"/>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
          <View style={styles.photo}>
          <View style={styles.borderPhoto}>
              <Image style={styles.photoContainer} source={Profile}/>
          </View>
          </View>
        <Input label="Full Name" value={form.fullName} onChangeText={value => setForm('fullName', value)} placeholder="Type your Full Name" />
        <Gap height={16}/>
        <Input label="Email Address" value={form.email} onChangeText={value => setForm('email', value)} placeholder="Type your email address" />
        <Gap height={16}/>
        <Input label="Password" value={form.password} onChangeText={value => setForm('password', value)} placeholder="Type your Password" />
        <Gap height={24}/>
        <Button onPress={onContinue} text="Continue" />
        <Gap height={100} />
      </ScrollView>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    padding: 24
  },
  addPhoto: {
    fontSize: 14,
    color: '#8D92A3',
    textAlign: 'center'
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16
  },
  select: {
    backgroundColor: colors.input.primary.background,
    borderRadius: 10,
    padding: 10,
    border: "none",
    width: '100%',
  },
  selectText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  }

})