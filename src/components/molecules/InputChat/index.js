import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'
import { ChatButton } from '../../atoms'

const InputChat = ({ value, onChangeText, onButtonPress}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Chat Now" value={value} onChangeText={onChangeText}/>
        <ChatButton type="btn-icon" disable={value.length < 1} onPress={onButtonPress}/>
      </View>
    </View>
  )
}

export default InputChat

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white
  },
  container: {
    padding: 16,
    flexDirection: 'row',
   alignItems: 'center',
   backgroundColor: colors.white
  },
  input: {
    backgroundColor: colors.input.primary.background,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
  }
})