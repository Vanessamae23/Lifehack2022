import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
} from 'react-native';
import {Button, CardNews, Gap, Input} from '../components';
import {useDispatch} from 'react-redux';
import {showError, showSuccess, useForm} from '../utils';
import {Firebase} from '../config';
import {getData} from '../utils/localStorage';
import {ScrollView} from 'react-native-gesture-handler';

const StoreAddModal = ({modalVisible,setModalVisible, change, setChange, foodType,startDate,endDate}) => {
    const [user, setUser] = useState('');
    const getDataUserFromLocal = () => {
         getData('user').then(res => {
          const data = res;
          setUser(data);
        });
      };
  
    const [form, setForm] = useForm({
        food: foodType != null ? foodType : '',
        start: startDate != null ? startDate : '',
        end: endDate != null ? endDate : '',
      });
      
    useEffect( getDataUserFromLocal, [user.uid, change]);
    const onAdd = () => {
        
        if(isNaN(Date.parse(form.end))) {
          showError('Invalid date');
          return;
        }
        const data = {
          food: form.food,
          start: form.start,
          end: form.end,
          endDate: Date.parse(form.end)
        };
        console.log(data)
        Firebase.database()
          .ref(`store/${user.uid}`)
          .push(data)
          .then(res => {
            showSuccess('Successfully added');
            setForm('reset');
          })
          .catch(err => {
            showError(err.message);
          });

        setChange(!change);
      };
    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Food</Text>
          <Gap height={16} />
          <Input
            onDate={true}
            label="Food"
            value={form.food}
            onChangeText={value => setForm('food', value)}
            placeholder="Type your food"
          />
          <Gap height={16} />
          <Input
            label="Purchase Date"
            onDate={true}
            value={form.start}
            onChangeText={value => setForm('start', value)}
            placeholder="YYYY-MM-DD"
          />
          <Gap height={16} />
          <Input
            label="Expiry Date"
            onDate={true}
            value={form.end}
            onChangeText={value => setForm('end', value)}
            placeholder="YYYY-MM-DD"
          />
          <Gap height={120} />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onAdd}>
            <Text style={styles.textStyle1}>Add Food</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle1}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>);
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollStyle: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },
  bottomView: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalView: {
    marginVertical: 30,
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height - 120,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    marginVertical: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#CC5500',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#990000',
    marginTop: 20,
    paddingHorizontal: 40,
    width: Dimensions.get('window').width - 180,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default StoreAddModal;
