import { StyleSheet, Text, View, Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import * as location from 'expo-location'
const Homescreen = () => {
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
        "we are loading your location"
      );
      const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
      useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
      }, []);
      const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
          Alert.alert(
            "Location services not enabled",
            "Please enable the location services",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
        } else {
          setlocationServicesEnabled(enabled);
        }
      };
      const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
              "Permission denied",
              "allow the app to use the location services",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ],
              { cancelable: false }
            );
          }
          const { coords } = await Location.getCurrentPositionAsync();
           console.log(coords)
          if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
              });
               console.log(response)
              for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdisplayCurrentAddress(address);
              }
          }
      }
  return (
    <View>
      <Text>Homescreen</Text>
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({})