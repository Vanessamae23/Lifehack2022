import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors  } from '../../../utils'

const Other = ({text, date}) => {
    return (
        <View style={styles.container}>
          <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
      )
}

export default Other

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginBottom: 15,
        paddingHorizontal: 15
      },
      chatContent: {
        backgroundColor: colors.input.secondary.background,
        padding: 12,
        paddingRight: 18,
        maxWidth: '75%',
        borderRadius: 10,
        borderBottomLeftRadius: 0
      },
      text: {
        fontSize: 14,
        color: colors.input.secondary.text
      },
      date: {
        fontSize: 12,
        color: colors.input.primary.text,
        marginTop: 5
      }
})