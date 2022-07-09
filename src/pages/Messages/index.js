import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getData } from '../../utils/localStorage'
import { useState, useEffect } from 'react'
import { Firebase } from '../../config'

const Messages = ({navigation}) => {
    const [user, setUser] = useState('');
    const [partner, setPartner] = useState([])
    const getDataFromLocal = () => {
        getData('user').then(res => {
          setUser(res);
        });
      };

      useEffect(() => {
        getDataFromLocal();
        Firebase.database()
          .ref(`messages/${user.uid}/`)
          .on('value', async (snapshot) => {
            if(snapshot.val()) {
                
                const oldData = snapshot.val()
                const data = [];
                const promises = await Object.keys(oldData).map(async key => {
                    const urlUidMentor = oldData[key].uidPartner
                    data.push(urlUidMentor)
                })
                await Promise.all(promises)
                setPartner(data)
            }
          });

      
      }, [user.uid]);
    

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>Messages</Text>

      {partner.map((item, index) => {
            const data = {
                user: item,
            }
            return (
            <TouchableOpacity key={index} style={styles.card} onPress={() => {navigation.navigate('Chatting', data)}}>
                <Text>Request {index + 1}</Text>
            </TouchableOpacity>
            )
        
       
        
      })}
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: '#EBD4AE',
        elevation: 5,
        padding: 20,
        borderRadius: 5
    }
})