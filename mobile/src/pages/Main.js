import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
  const [currentRegion, setCurrerntRegion ] = useState(null);
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrerntRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -7.2038863, longitude: -48.1914425 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/63862417?s=460&u=a77cb40b026c35164d443fe5ef6b4c8677e0d80f&v=4'}} />
    
        <Callout onPress={() => {
          //navegação
          navigation.navigate('Profile', { github_username: 'karoltaka' });
        }}>
          <View style={styles.Callout}>
            <Text style={styles.devName}>Karoline Takahagassi</Text>
            <Text style={styles.devBio}>Apaixonada pelas melhores tecnologias de desenvolvimento Web e Mobile</Text>
            <Text style={styles.devTechs}>ReactJS, React Native, Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}


const styles = StyleSheet.create({
  map: {
    flex: 1
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFFF'
  },

  Callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },
})

export default Main;