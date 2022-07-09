import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Tick, Cross, Profile, BMT } from '../../../assets'
import { Alert, Modal } from "react-native";
import { Header, Button, Gap } from '../../../components'
import { DefaultTheme, List } from 'react-native-paper'

const ItemCard = ({ detail , additionalInfo, givenImageURI, address, expiry, reserved, onHandlePress, onReservePress}) => {
  const [type, setType] = useState(false)
  const onPress = () => {
    setType(!type)
  }
  const [modal, setModal] = useState(false)
  const popUp = () => {
    setModal(!modal)
  }


  const imageSource = type == true ? Tick : Cross
  const url = "data:image/jpeg;base64,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"
  const imageURI = givenImageURI ? givenImageURI : url;
    return (
    <View>
        <Modal animationType = {"slide"} transparent = {false} 
               visible = {modal}>
               <View style={{width: "100%", height: "100%", backgroundColor: '#ffffff'}}>
               <Header title={detail} subtitle="More Information" onBack onPress={() => setModal(!modal)} />
               <ScrollView>
                 <Image source={{uri: imageURI}} style={styles.imageFull} />
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 10, fontWeight: "bold"}}>Details</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 5}}>{additionalInfo}</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 10, fontWeight: "bold"}}>Address of collection</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 5}}>{address}</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 10, fontWeight: "bold"}}>Expiry Date</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 5}}>{expiry}</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 10, fontWeight: "bold"}}>Availability</Text>
                 <Text style={{fontSize: 20,color: 'black',width: "100%", paddingHorizontal: 20, paddingVertical: 5}}>{reserved ? 'RESERVED' : 'AVAILABLE'}</Text>
                <View style={{paddingHorizontal: 20}}>
                <Gap height={20} />
                <Button text="Chat" onPress={onHandlePress} />
                <Gap height={20} />
                <Button text="Reserve" onPress={onReservePress} />
                <Gap height={20} />
                </View>
             
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
