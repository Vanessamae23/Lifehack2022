
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { Gallery, Camera } from '../../assets';

import Tflite from 'tflite-react-native';
import * as ImagePicker from "react-native-image-picker"
import { Gap } from '../../components';
let tflite = new Tflite();


const ImageIdentifier = () => {

  const [result, setResult] = useState([])
  const [rotten, isRotten] = useState('')
  const [path, setPath] = useState('')

 
  
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
  }

   
  

  return (
    <SafeAreaView style={{padding: 20}} >
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
      <View style={styles.card}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center', marginVertical: 10}} >Food Condition</Text>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: 'black', textAlign: 'center', marginVertical: 10}}> {rotten ? rotten.split(' ')[1] :"-"}</Text> 
        <Text style={{fontSize: 20,  color: 'black', textAlign: 'center', marginVertical: 10}}>If it is still fresh, please consider eating it now, storing it to keep it still fresh or give it to others</Text>
      </View>
    
     
    </SafeAreaView>
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
    backgroundColor: 'white',
    elevation: 10,
    padding: 30,
    borderRadius: 10
  }
});

export default ImageIdentifier;