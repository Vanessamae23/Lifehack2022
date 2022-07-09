import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Category, Gap, CardNews, Header, ItemCard } from '../../components'
import { DefaultTheme, List } from 'react-native-paper'
import { Firebase } from '../../config'

const RemainingBites = ({navigation}) => {

  const [ bites, setBites ] = useState([])
  useEffect(() => {
    Firebase.database().ref('remainingBites/bites').once('value').then(res => {
      if(res.val()) {
        setBites(res.val())
      }
    })
  }, [])


  const data = bites//["Hello", "1", "2"]
  

  return (
  <View style={styles.page}>
    <Header title="Remaining Bites" subtitle="Share and clear any unwanted food" />
    <ScrollView style={styles.view}>
      <List.Section >
             {data.map((detail,index,arr) => {
                 return (
                    <View>
                        <ItemCard  detail={detail.name} additionalInfo={[detail.details]} givenImageURI={detail.imageURL}/>
                    </View>
                    
                 )
             })}
      </List.Section>
      </ScrollView>    
    </View>
  )
}

export default RemainingBites

const styles = StyleSheet.create({
    page: {
        
        flex: 1,
        paddingTop: 0,
      },
      image: {
          height: 200,
          width: '100%',

      },
      view: {
        
        marginTop: 10
      }
})
