import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BMT, Profile } from '../../../assets'

const CardNews = ({food, onPress, start, end, uri}) => {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
        <Image  source={Profile} style={styles.image} />
        <View>
            <Text style={styles.title}>{food}</Text>
            <Text style={styles.text}>{start}</Text>
            <Text style={styles.text}>{end}</Text>
        </View>
      
    </TouchableOpacity>
  )
}

export default CardNews

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#D08770',
        borderRadius: 15,
        height: 120,
        width: '90%',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    image: {
        width: 70,
        height: 70,
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