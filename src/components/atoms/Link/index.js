import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const Link = ({ title, size, align, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link(size, align)}>{ title }</Text>
    </TouchableOpacity>
  )
}

export default Link

const styles = StyleSheet.create({
    link: ( size, align ) => ({
        fontSize: size,
        color: colors.text.primary,
        textDecorationLine: "underline",
        textAlign: align
    })
})