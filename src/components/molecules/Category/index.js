import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ICBuddies, ICCounsellor, ICSergeant } from '../../../assets'

const Category = ({type, onPress}) => {

    const Icon = () => {
        if(type === "Buddies") {
            return <ICBuddies style={styles.illustration} />
        } else if (type === "Counsellors") {
            return <ICCounsellor style={styles.illustration} />
        } else if( type === 'Sergeants') {
        return <ICSergeant style={styles.illustration} />
        } else {
            return <ICSergeant style={styles.illustation} />
        }
    }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon />
      <Text style={styles.label}>Looking For</Text>
      <Text style={styles.categories}>{type}</Text>
    </TouchableOpacity >
  )
}

export default Category

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: "#d9ead3",
        alignSelf: 'flex-start',
        marginRight: 10,
        borderRadius: 10,
        width: 190,
        height: 150,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 20},
        shadowOpacity: 0.9,
        elevation: 5
    },
    illustration: {
        marginBottom: 20
    },
    label: {
        fontSize: 14,
        color: "black"
    },
    categories: {
        fontSize: 16,
        color: "black"
    }

})