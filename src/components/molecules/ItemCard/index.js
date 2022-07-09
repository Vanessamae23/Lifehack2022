import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Tick, Cross } from '../../../assets'
import { Alert, Modal, Pressable } from "react-native";
import { Header } from '../../../components'
import { DefaultTheme, List } from 'react-native-paper'

const ItemCard = ({ detail , additionalInfo, givenImageURI}) => {
  const [type, setType] = useState(false)
  const onPress = () => {
    setType(!type)
  }
  const [modal, setModal] = useState(false)
  const popUp = () => {
    setModal(!modal);
  }
  const imageSource = type == true ? Tick : Cross
  const imageURI = givenImageURI ? givenImageURI : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80";
    return (
    <View>
        <Modal animationType = {"slide"} transparent = {false} 
               visible = {modal}>
               <View style={{width: "100%", height: "100%", backgroundColor: '#ffffff'}}>
               <Header title={detail} subtitle="More Information" onBack onPress={() => setModal(!modal)} />
               <ScrollView>
                 <Image source={{uri: imageURI}} style={styles.imageFull} />
                 <Text style={{fontSize: 20,color: 'black',width: "100%", padding:10}}>{additionalInfo}</Text>
                </ScrollView>
              </View>
              {/*</View>*/}
        </Modal>
      <TouchableOpacity activeOpacity={0.9} onPress={popUp} style={styles.card}>
        <Text style={styles.text}>{detail}</Text>
      </TouchableOpacity>
    </View>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    card: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        minHeight: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 25,
        marginHorizontal: 20,
        paddingVertical: 10
    },
    image : {
        width: 60,
        height: 60,
    },
    text: {
      fontSize: 20,
      color: 'black',
      width: 220
    },
    header: {
        fontSize: 40,
        color: 'black'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        padding: 25
     },
     imageFull: {
          height: 200,
          width: '100%',
      }
})
