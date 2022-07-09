import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useForm } from '../../utils'
import { Input, Button, Gap } from '../../components'
import { showError } from '../../utils'

const ForgotPassword = ({navigation}) => {

    const [ form, setForm ] = useForm({
        email: ''
      })

      const resetPassword = () => {
        if(form.email === null) {
          alert("Please fill in your email to reset password")
        }
        Firebase.auth().sendPasswordResetEmail(form.email)
      .then(() => {
        alert("Password reset email sent")
      })
      .catch((error) => {
        showError(error.message)
      });
      }

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Fill in your email for verification</Text>
      <Input label="Email" value={form.email} onChangeText={(value) => setForm('email', value)} />
      <Gap height={20} />
      <Button text="Reset Password" onPress={resetPassword}/>
      <Gap height={20}/>
      <Button text="Back" color="grey" textColor='white' onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    page: {
      flex: 1,
      margin: 30
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
    text: {
        fontSize: 30,
        marginBottom: 30,
        fontWeight: '600',
        color: 'black'
    }
  });