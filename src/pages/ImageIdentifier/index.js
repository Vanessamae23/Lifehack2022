
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { Gallery, Camera } from '../../assets';
import { Icon, ICTent, ICItem, ICCalendar, ICBook, ICFood } from '../../assets/Icon';
import { Alert, Modal } from "react-native";
import Tflite from 'tflite-react-native';
import * as ImagePicker from "react-native-image-picker"
import { Header, Button, Gap } from '../../components';
import StoreAddModal from '../StoreAddModal';
import { Firebase } from '../../config'
import { HomeProfile } from '../../components'

let tflite = new Tflite();
let tfliteMobilenet = new Tflite();


const ImageIdentifier = ({navigation}) => {

  const [change, setChange] = useState(false);
  const [result, setResult] = useState([])
  const [rotten, isRotten] = useState('')
  const [path, setPath] = useState('')
  const [foodType, setFoodType] = useState('')
  const [modal, setModal] = useState(false)
  const popUp = () => {
    setModal(!modal);
  }
  
  
  const Logout = () => {
    Firebase.auth().signOut().then(() => {
      navigation.replace('SplashScreen')
    }).catch(e => {
      showMessage({
        message: e.message,
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white
      })
    })
  }


  tflite.loadModel({
    model: 'model_unquant.tflite',// required
    labels: 'labels.txt',  // required
    numThreads: 1,                              // defaults to 1  
  },
  (err, res) => {
    if(err)
      console.log(err);
    else
      console.log(res);
  });
  
  

  const showResult = (result) => {
    const rotten = result[0]['confidence'];
    const label = result[0]['label'];
    console.log(result);
    isRotten(label)
  }

  const handlePress = async () => {

    const options = {
      title: 'Select Avatar',
    };
 

    await ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
      var path = response.assets[0].uri;
      setPath(path)
        runTflite(path)
   
  }})
}

const handlePressCamera = async () => {

  const options = {
    title: 'Select Avatar',
  };


  await ImagePicker.launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
    var path = response.assets[0].uri;
    setPath(path)
      runTflite(path)
 
}})
}


  const runTflite = async (path) => {
   await tflite.runModelOnImage({
      path,
      imageMean: 128.0,
      imageStd: 128.0,
      numResults: 3,
      threshold: 0.05
    },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          showResult(res)
        }
        
          
      });
      
      tfliteMobilenet.loadModel({
        model: 'mobilenet_v1_1.0_224.tflite',// required
        labels: 'labels_mobilenet.txt',  // required
        numThreads: 1,                              // defaults to 1  
      },
      (err, res) => {
        if(err)
          console.log(err);
        else
          console.log(res);
      });
      await tfliteMobilenet.runModelOnImage({
        path: path,  // required
        imageMean: 128.0, // defaults to 127.5
        imageStd: 128.0,  // defaults to 127.5
        numResults: 3,    // defaults to 5
        threshold: 0.05   // defaults to 0.1
      },
      (err, res) => {
        if(err)
          console.log(err);
        else
          console.log("AA" + JSON.stringify(res));
          console.log(res[0]['label']);
          setFoodType(res[0]['label']);
      });
      setChange(!change);
  }
  

   const expiry_dict = {"Granny Smith": 5, "banana": 5};
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
    const getExpiryDate=(text)=>{
        return expiry_dict[text] == null ? getDate(30) : getDate(expiry_dict[text]);
    };
    
  const [text, setText] = useState('');
  const [exp, setExp] = useState('');
  
  const StoreModal = () => {
      return (<StoreAddModal modalVisible={modal} setModalVisible={setModal} 
            change={change} setChange={setChange} foodType={foodType} startDate={getDate(0)} endDate={getExpiryDate(foodType)}/>); 
  }
  
  return (
    <ScrollView style={{padding: 20}} >
        <HomeProfile onPress={Logout} />
        <StoreModal/>
        <Modal animationType = {"slide"} transparent = {false} 
               visible = {false}>
               <View style={{width: "100%", height: "100%", backgroundColor: '#ffffff'}}>
               <Header title="Store" subtitle="Keep track of expiry dates" onBack onPress={() => setModal(!modal)} />
               <ScrollView>
                 <Image source={{uri: path}} style={{height: 200, width: '100%'}} />
                 <View style={{paddingLeft: 20, paddingRight: 25}}>
                     <Text>FoodType</Text>
                      <TextInput
                        style={{height: 40}}
                        placeholder="Type food here!"
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                      />
                      <Text style={{padding: 10, fontSize: 42}}>
                        {text.split(' ').map((word) => word && '🍕').join(' ')}
                        {expiry_dict[text]}
                        {getDate(expiry_dict[text])}
                      </Text>
                      <Text>Expiry</Text>
                      <TextInput
                        style={{height: 40}}
                        onChangeText={newExp => setExp(exp)}
                      />
                  </View>
                </ScrollView>
              </View>
              {/*</View>*/}
        </Modal>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>Check Food Quality</Text>
      
      <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image source={Gallery} style={styles.image} />
            <Gap height={20}/>
            <Text>Open Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.button} onPress={handlePressCamera}>
          <Image source={Camera} style={styles.image} />
          <Gap height={20}/>
            <Text>Open Camera</Text>
          </TouchableOpacity>
      </View>
      
      {path ? 
          <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
            <Image source={{uri: path}} style={styles.imageContainer} />
          </View> : null}  
       
      <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
      <View style={styles.card}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center'}} >Food Condition</Text>
    
        <Text style={{fontSize: 15, fontWeight: 'normal', color: 'black', textAlign: 'center'}}> {"Is Rotten?: "}<Text style={{fontWeight: 'bold'}}>{rotten ? rotten.split(' ')[1] :"-"}</Text></Text> 
        <Text style={{fontSize: 15, fontWeight: 'normal', color: 'black', textAlign: 'center'}}>  {"Type: "+(foodType ? foodType :"-")} </Text>
        <Text style={{fontSize: 15, fontWeight: 'normal', color: 'black', textAlign: 'center'}}>  {"Expiry (Food Type): " + (path ? getExpiryDate(foodType): '-')}</Text>
        <Text style={{fontSize: 15, fontWeight: 'normal', color: 'black', textAlign: 'center'}}> </Text>
        <Text style={{fontSize: 15,  color: 'black', textAlign: 'center',}}>If it is still fresh, please consider eating it now, storing it to keep it still fresh or give it to others</Text>
      </View>
      </View>
    
     {path ? <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={popUp}>
            <ICCalendar style={styles.image} />
            <Gap height={20}/>
            <Text>Store</Text>
          </TouchableOpacity>
          
          <TouchableOpacity  style={styles.button} onPress={() => navigation.navigate('AddFood', {foodType, 'endDate': getExpiryDate(foodType)})}>
          <ICFood style={{width: 70, height:"100%"}} />
          <Gap height={20}/>
            <Text>Share with others</Text>
          </TouchableOpacity>
      </View> : null}
     <Gap height={20}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: '35%',
    marginVertical: 20,
    height: 150,
    elevation: 10,
    padding: 20,
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    height: 70,
    width: 70
  },
  card: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    padding: 30,
    borderRadius: 10,
    width: '95%',
    margin: "auto"
  },
  imageContainer: {
    width: '95%',
    height: 300,
    elevation: 10,
    padding: 30,
    borderRadius: 10
  },
});

export default ImageIdentifier;
