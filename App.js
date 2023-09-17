import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then(response => response.json())
      .then(responseJson => setRepositories(responseJson.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View>
            <Text style={{ fontSize: 18}}>{item.strMeal}</Text>
            <Image 
              source={{uri: item.strMealThumb + '/preview'}}
              /* The image does not render without height and/or width!(?) */
              style={{height: 50, width: 50}}
            />
          </View>}
        data={repositories}
        ItemSeparatorComponent={listSeparator} />
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder='keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={getRepositories} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});