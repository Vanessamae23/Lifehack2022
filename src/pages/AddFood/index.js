import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { Gap, Input, Button, Header } from '../../components';
import { Firebase } from '../../config';
import { showError, showSuccess, useForm } from '../../utils';
import { getData } from '../../utils/localStorage';

const AddFood = ({navigation}) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [form, setForm] = useForm({
        food: '',
        expiry: '',
        address: '',
        detail: '',
        user: '',
        imageUrl: ''
      });

      const getDataUserFromLocal = () => {
        getData('user').then(res => {
         const data = res;
         setUser(data);
       });
     };

    const onAddFood = async () => {
       await getDataUserFromLocal();
        const data = {
            food: form.food,
            expiry: form.expiry,
            address: form.address,
            detail: form.detail,
            user: user.uid,
            imageUrl: form.imageUrl,
            reserved: false
          };

          Firebase.database().ref(`remainingBites/bites/`).push(data).then(res => {
            if(res) {
                navigation.goBack();
              showSuccess('Successfully added to sharing list')
            } else {
                showError("Failed to update")
            }
          })  
    }

  return (
    <View style={{flex: 1}}>
        <Header onBack onPress={() => navigation.goBack()} title="Add Food" subtitle="Share food to your neighbours"/>
        <View style={{padding: 20}}>
        <Gap height={16} />
                  <Input
                    label="Food Name"
                    value={form.food}
                    onChangeText={value => setForm('food', value)}
                    placeholder="Type your food"
                  />
                  <Gap height={16} />
                  <Input
                    label="Expiry Date"
                    value={form.expiry}
                    onChangeText={value => setForm('expiry', value)}
                    placeholder="YYYY-MM-DD"
                  />
                  <Gap height={16} />
                  <Input
                    label="Address for Collection"
                 
                    value={form.address}
                    onChangeText={value => setForm('address', value)}
                    placeholder="Type address"
                  />
                   <Gap height={16} />
                  <Input
                    label="Details"
                 
                    value={form.detail}
                    onChangeText={value => setForm('detail', value)}
                    placeholder="Type details"
                  />
                    <Gap height={16} />
                  <Input
                    label="Image Url"
                
                    value={form.imageUrl}
                    onChangeText={value => setForm('imageUrl', value)}
                    placeholder="Type url"
                  />
                  <Gap height={20} />
                  <Button text="Share Food" onPress={onAddFood} />
        </View>
     
    </View>
  )
}

export default AddFood

const styles = StyleSheet.create({})