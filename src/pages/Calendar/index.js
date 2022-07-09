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
import {Button, CardNews, Gap, Input} from '../../components';
import {useDispatch} from 'react-redux';
import {showSuccess, useForm} from '../../utils';
import {Firebase} from '../../config';
import {getData} from '../../utils/localStorage';
import {ScrollView} from 'react-native-gesture-handler';

const Calendar = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [change, setChange] = useState(false);
  const [item, setItem] = useState([]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      const data = res;
      setUser(data);
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
    Firebase.database()
      .ref(`store/${user.uid}/`)
      .once('value')
      .then(res => {
        if (res.val()) {
          const result = res.val();
          const array = [];
          Object.keys(result).map(item => {
            const answer = {
              food: result[item].food,
              start: result[item].start,
              end: result[item].end,
            };
            array.push(answer);
          });
          setItem(array);
          console.log(item);
        }
      });
  }, [change]);

  const onAdd = () => {
    getDataUserFromLocal();
    const data = {
      food: form.food,
      start: form.start,
      end: form.end,
    };
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

  const [form, setForm] = useForm({
    food: '',
    start: '',
    end: '',
  });
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <View style={{margin: 15}}>
        <Text style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
          Store
        </Text>
      </View>

      <ScrollView style={{height: '100%', paddingBottom : 10}}>
        <View style={styles.container}>
          <View style={styles.scrollStyle}>
            {item.map((result, index) => {
              console.log(item);
              return (
                <CardNews
                  key={index}
                  food={result.food}
                  start={result.start}
                  end={result.end}
                />
              );
            })}

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
                    placeholder="DD-MM-YYYY"
                  />
                  <Gap height={16} />
                  <Input
                    label="Expiry Date"
                    onDate={true}
                    value={form.end}
                    onChangeText={value => setForm('end', value)}
                    placeholder="DD-MM-YYYY"
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
            </Modal>
          </View>
          <View style={styles.bottomView}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>+</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
    height: Dimensions.get('window').height - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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

export default Calendar;
