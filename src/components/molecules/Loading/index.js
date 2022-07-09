import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const Loading = () => {
  return (
    <View style={styles.wrapper}>
        <ActivityIndicator size="large" color={colors.white}/>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: colors.loadingBackground
    },
    text: {
        fontSize: 24,
        color: colors.white,
        marginTop: 30
    }
})