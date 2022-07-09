import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const isMe = ({text, date}) => {
    return (
        <View style={styles.container}>
            <View style={styles.chatContent}>
            <Text style={styles.text}>{text}</Text>
            </View>
            <Text style={styles.date}>{date}</Text>
        </View>
        )
}

export default isMe

const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      marginBottom: 15,
      paddingHorizontal: 15
    },
    chatContent: {
      backgroundColor: colors.card,
      padding: 12,
      paddingRight: 18,
      maxWidth: '70%',
      borderRadius: 10,
      borderBottomRightRadius: 0
    },
    text: {
      fontSize: 14,
      color: colors.input.primary.text
    },
    date: {
      fontSize: 12,
      color: colors.input.primary.text,
      marginTop: 5
    }
  })