import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ResultsScreen = ({ route }) => {
  const { image } = route.params;
  const [extractedNumbers, setExtractedNumbers] = useState([]);
  const [predictedOutcomes, setPredictedOutcomes] = useState([]);

  useEffect(() => {
    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      try {
        const response = await axios.post('http://your-flask-api-url/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setExtractedNumbers(response.data.extracted_numbers);
        setPredictedOutcomes(response.data.next_outcomes);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    uploadImage();
  }, [image]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.results}>Extracted Numbers: {extractedNumbers.join(', ')}</Text>
      <Text style={styles.results}>Predicted Outcomes: {predictedOutcomes.join(', ')}</Text>
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
  results: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ResultsScreen;