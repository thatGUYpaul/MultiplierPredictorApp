import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const CropScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const pickAndCropImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        setImage({ uri: image.path });
        navigation.navigate('Results', { image: image.path });
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crop Image</Text>
      <Button title="Pick and Crop Image" onPress={pickAndCropImage} />
      {image && <Image source={image} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default CropScreen;