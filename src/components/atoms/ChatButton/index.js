import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils';
import IconOnly from './iconOnly';
import BtnIcon from './BtnIcon';

const ChatButton = ({type, title, icon, onPress, disable}) => {
    if(type === 'btn-icon') {
      return <BtnIcon disable={disable} onPress={onPress}/>
    }

    if(type === 'icon-only') {
        return (
            <IconOnly icon={icon} onPress={onPress} />
        )
    }
    if(disable) {
      return (
        <View style={styles.disableBg}>
      <Text style={styles.disableTxt}>{title}</Text>
    </View>
      )
    }
    
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ChatButton;

const styles = StyleSheet.create({
    disableBg: {
      paddingVertical: 10,
      backgroundColor: colors.button.disable.background,
      borderRadius: 10
    },
    disableTxt: {
      fontSize: 16,
      textAlign: "center",
      color: colors.button.disable.text

    },
    // make it into a function to make it dynamic
    container: (type) => ({
        paddingVertical: 10,
        backgroundColor: type === "secondary" ? colors.button.secondary.background : colors.button.primary.background,
        borderRadius: 10
    }),
    text: (type) => ({
        fontSize: 16,
        textAlign: "center",
        color: type === "secondary" ? colors.button.secondary.text : colors.button.primary.text
    }),
})