
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import Tflite from 'tflite-react-native';
import * as ImagePicker from "react-native-image-picker"
let tflite = new Tflite();


const ImageIdentifier = () => {

  const [result, setResult] = useState({
    recognitions: []
  })
  
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

  const handlePress = () => {

    const options = {
      title: 'Select Avatar',
    };
 

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
      var path = response.assets[0].uri;
    
    
    tflite.runModelOnImage({
      path,
      imageMean: 128.0,
      imageStd: 128.0,
      numResults: 3,
      threshold: 0.05
    },
      (err, res) => {
        if (err)
          console.log(err);
        else
        
          setResult({ recognitions: res });
          console.log(result)
      });
  }})

   
  }

  return (
    <SafeAreaView >
      <Text>MAMA</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>CLICK</Text>
      </TouchableOpacity>
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
});

export default ImageIdentifier;