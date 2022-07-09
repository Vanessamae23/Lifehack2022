import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { BMT } from '../../../assets'

const GuideCards = ({onPress, image, name}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
        <View style={styles.view}>
        <ImageBackground imageStyle={{ opacity: 0.4,backgroundColor: 'black', borderRadius: 20}} style={styles.card} source={{uri: image}} >
          <Text style={styles.text}>{name}</Text>
      </ImageBackground>
        </View>
      
    </TouchableOpacity>
  )
}

export default GuideCards

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: '100%',
        justifyContent: 'flex-end'
        
    },
    text: {
        fontSize: 30,
        margin: 20,
        fontWeight: '800',
        color: 'white'
    },
    container: {
        marginVertical: 20
    },
})