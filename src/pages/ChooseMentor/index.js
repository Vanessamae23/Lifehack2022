import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Header, List } from '../../components'
import { Profile } from '../../assets'
import { getData } from '../../utils/localStorage'
import { colors, showError } from '../../utils'
import { Firebase } from '../../config'


const ChooseMentor = ({navigation, route}) => {
    const [listMentor, setListMentor ] = useState([])
    const [current, setCurrent] = useState('')
  const itemCategory = route.params;
  useEffect(() => {
    callMentorByCategory(itemCategory.category)
    getData('user').then(res => {
        const currentUser = res.uid;
        setCurrent(currentUser)
      })
  }, [itemCategory.category])



  const callMentorByCategory = (category) => {
    Firebase.database().ref('users/').orderByChild('roles').equalTo(category).once('value').then(res => {
      if(res.val()){
        const oldData = res.val();
        const data = []
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key]
          })
        })
        setListMentor(data)
      }
    }).catch(err => {
      showError(err.message)
    })
  }

  return (
    <View>
        <Header onPress={() => navigation.goBack()} onBack={true} title={itemCategory.category} subtitle="Chat with who?" />
        <ScrollView>
        {listMentor.map(mentor => {

            if(mentor.id !== current) {
                return <List profile={Profile} key={mentor.id} onPress={() => navigation.navigate('Chatting', mentor)} type="next"  name={mentor.data.fullName} desc={mentor.data.roles} />
            }

         
        })
        }
        </ScrollView>
        
    </View>
  )
}

export default ChooseMentor

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})