import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BMT, Profile } from '../../../assets'

const CardNews = ({food, onPress, onLongPress, start, end, uri}) => {

    const getDate=(days)=>{
          var date = new Date();
          date.setDate(date.getDate() + days);
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var monthPaddingZero = (month > 9) ? '' : '0';
          var dayPaddingZero = (day > 9) ? '' : '0';

          //Alert.alert(date + '-' + month + '-' + year);
          // You can turn it in to your desired format
          return year + '-' + monthPaddingZero + month + '-' + dayPaddingZero + day;//format: dd-mm-yyyy;
    }
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} activeOpacity={0.8} style={{...styles.card, backgroundColor : end==getDate(0)?'#FF0000':'#D08770'}}>
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
