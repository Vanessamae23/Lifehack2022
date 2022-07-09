import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl, Dimensions, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Category, Gap, CardNews, Header, ItemCard } from '../../components'
import { DefaultTheme, List } from 'react-native-paper'
import { Firebase } from '../../config'
import { getData } from '../../utils/localStorage'
import { showError, showSuccess } from '../../utils'

const RemainingBites = ({navigation}) => {

  const [ bites, setBites ] = useState([])
  const [user , setUser] = useState('')

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
     const data = res;
     setUser(data);
   });
 };

  const loadData = () => {
    getDataUserFromLocal();
    Firebase.database().ref(`remainingBites/bites/`).once('value').then(res => {
      // if(res.val()) {
      //   setBites(res.val())
      // }
      const array = []
      const result = res.val();
      Object.keys(result).map(item => {
        const data = {
          id: item,
          food: result[item].food,
          address: result[item].address,
          details: result[item].detail,
          expiry: result[item].expiry,
          imageUrl: result[item].imageUrl,
          reserved: result[item].reserved,
          user: result[item].user,
        }
        array.push(data)
      })
      setBites(array)
    })
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, []);
  useEffect(loadData, [])

 
const onReservePress = (id) => {
  Firebase.database().ref(`remainingBites/bites/${id}/reserved`).set(true).then(res => {
    showSuccess("Successfully reserved")
})
}

  const data = bites//["Hello", "1", "2"]
  

  return (
  <View style={styles.page}>
    <Header title="Remaining Bites" subtitle="Share and clear any unwanted food" />
    <ScrollView style={styles.view} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />} >
    {/*<TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('AddFood')}}>
        <Text>Add Food</Text>
      </TouchableOpacity>*/}
      <List.Section >
             {data.map((detail,index,arr) => {
              if(detail.user != user.uid) {
                return (
                  <View key={index}>
                      <ItemCard onReservePress={() => {onReservePress(detail.id)}} onHandlePress={() => {navigation.navigate('Chatting', detail)}} user={detail.user} key={index} address={detail.address} reserved={detail.reserved} expiry={detail.expiry} detail={detail.food} additionalInfo={detail.details} givenImageURI={detail.imageUrl}/>
                  </View>
                  
               )
              }
                 
             })}
      </List.Section>
      <View style={styles.bottomView}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => navigation.navigate('AddFood', {'foodType':null, 'endDate':null})}>
              <Text style={{color: 'white',fontWeight: 'bold',textAlign: 'center', fontSize: 20}}>+</Text>
            </Pressable>
          </View>
    
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
      },
      card: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 10
      },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#CC5500',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#990000',
    marginTop: 20,
    paddingHorizontal: 40,
    width: Dimensions.get('window').width - 180,
  },
  bottomView: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
