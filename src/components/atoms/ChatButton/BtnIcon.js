import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { IconSendDark, IconSendLight } from '../../../assets'
import { colors } from '../../../utils'

const BtnIcon = ({ disable, onPress }) => {
  if(disable) {
    return (
      <View style={styles.container(disable)} onPress={onPress}>
          <IconSendLight />
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(disable)}>
       <IconSendDark />
    </TouchableOpacity>
  )
}

export default BtnIcon

const styles = StyleSheet.create({
    container: (disable) => ({
        backgroundColor: disable ? colors.input.primary.background : colors.secondary,
        width: 45,
        height: 45,
        borderRadius: 10,
        paddingTop: 7,
        paddingLeft: 5
    })
})