import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Tick, Cross } from '../../../assets'

const ItemCard = ({ detail}) => {
  const [type, setType] = useState(false)
  const onPress = () => {
    setType(!type)
  }
  if(type === true) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
        <Text style={styles.text}>{detail}</Text>
        <Image style={styles.image} source={Tick} />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <Text style={styles.text}>{detail}</Text>
        <Image style={styles.image} source={Cross} />
      
    </TouchableOpacity>
  )
}

export default ItemCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        borderWidth: 4,
        borderColor: "#0A4A3F",
        minHeight: 100,
        marginBottom: 20,
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
    }

})
