import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { useState } from 'react';

const Select = ({label }) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
            }>
            <Picker.Item  label="Fellow NS" value="Buddies" />
            <Picker.Item  label="Counsellors" value="Counsellors" />
            <Picker.Item label="Sergenats" value="Sergeants" />
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        paddingHorizontal: 2,
    }
})
