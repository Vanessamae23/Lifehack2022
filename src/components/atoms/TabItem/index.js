import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon, ICTent, ICItem, ICCalendar, ICBook, ICFood } from '../../../assets/Icon'

const TabItem = ({title, active, onPress, onLongPress}) => {

    const Icons = () => {
        if(title === 'Home') {
            return <ICTent />
        }
        if(title === 'AI') {
            return <ICFood/>
        }
        if(title === 'Bites') {
            return <ICFood/>
        }
        if(title === 'Store') {
            return <ICCalendar />
        }
        if(title === 'Guides') {
            return <ICBook />
        }
        return <ICTent />
    }

  return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icons />
          <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    text: (active) => ({
        fontSize: 12,
        color: active ? 'white' : 'black',
        marginTop: 4,
        fontWeight:'800'
    })
})
