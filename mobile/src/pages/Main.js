import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
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
  <MapView initialRegion={currentRegion} style={styles.map} >
    <Marker coordinate={{ latitude: -7.2038863, longitude: -48.1914425 }}/>
      <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/63862417?s=460&u=a77cb40b026c35164d443fe5ef6b4c8677e0d80f&v=4'}} />
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
})

export default Main;