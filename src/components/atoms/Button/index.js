import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const Button = ({text, color = '#ffd966', textColor = 'black', onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
      <Text style={styles.text(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: (color) => ({
        backgroundColor: color,
        padding: 12, 
        borderRadius: 8
    }),
    text: (textColor) => ({
        fontSize: 14,
        textAlign: 'center',
        color: textColor,
        fontWeight: '600'
    })
})