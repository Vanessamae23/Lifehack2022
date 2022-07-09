import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Logo, Profile } from '../../../assets'
import { getData } from '../../../utils/localStorage'

const HomeProfile = ({onPress, name}) => {

  const [ profile, setProfile ] = useState({
    fullName: '',
  })

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setProfile(data)
    })
  }, [])

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
       {/* <Image source={profile.photo.uri !== undefined ? profile.photo : DummyUser} style={styles.avatar}/> */}
        <Image source={Profile}  style={styles.avatar} />
        <View>
        <Text style={styles.name}>{profile ? profile.fullName : ""}</Text>
      <Text style={styles.work}>Click here to log out</Text>
        </View>
    </TouchableOpacity>
  )
}

export default HomeProfile

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 12
    },
    name: {
        fontSize: 24,
        fontWeight: '800',
        color: 'black',
        textTransform: 'capitalize'
    },
    work: {
        fontSize: 12,
        color: '#444444',
        textTransform: 'capitalize'
    }
})
