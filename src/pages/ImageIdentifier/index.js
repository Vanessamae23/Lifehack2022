
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { Gallery, Camera } from '../../assets';
import { Icon, ICTent, ICItem, ICCalendar, ICBook, ICFood } from '../../assets/Icon';

import Tflite from 'tflite-react-native';
import * as ImagePicker from "react-native-image-picker"
import { Gap } from '../../components';
let tflite = new Tflite();
let tfliteMobilenet = new Tflite();


const ImageIdentifier = () => {

  const [result, setResult] = useState([])
  const [rotten, isRotten] = useState('')
  const [path, setPath] = useState('')
  const [foodType, setFoodType] = useState('')
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
  }
  

   
  

  return (
    <ScrollView style={{padding: 20}} >
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>Check Food Quality</Text>
      <Gap height={20}/>
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
      
      <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
      <View style={styles.card}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center'}} >Food Condition</Text>
        {path ? <Image source={{uri: path}} style={styles.imageContainer} /> : <View></View>}        
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center'}}> {rotten ? rotten.split(' ')[1] :"-"}</Text> 
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center'}}>  {foodType ? foodType :"Unknown Type"} </Text>
        <Text style={{fontSize: 15,  color: 'black', textAlign: 'center',}}>If it is still fresh, please consider eating it now, storing it to keep it still fresh or give it to others</Text>
      </View>
      </View>
    
     {path ? <View style={{flexDirection: 'row', width: Dimensions.get('window').width-40, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <ICCalendar style={styles.image} />
            <Gap height={20}/>
            <Text>Store</Text>
          </TouchableOpacity>
          
          <TouchableOpacity  style={styles.button} onPress={handlePressCamera}>
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
    width: 280,
    height: 280,
  },
});

export default ImageIdentifier;
