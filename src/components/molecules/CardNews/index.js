import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BMT } from '../../../assets'

const CardNews = ({details, onPress, date, time, uri}) => {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
        <Image  source={{uri}} style={styles.image} />
        <View>
            <Text style={styles.title}>{details}</Text>
            <Text style={styles.text}>{date}</Text>
            <Text style={styles.text}>{time}</Text>
        </View>
      
    </TouchableOpacity>
  )
}

export default CardNews

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#9fc5e8',
        borderRadius: 15,
        height: 120,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 25
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 15
    },
    title: {
        fontWeight: '800',
        fontSize: 18,
        textAlign: 'right',
        color: 'black',
        marginVertical: 4
    },
    text: {
        textAlign: 'right'
    }
})