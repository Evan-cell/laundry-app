import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import Homescreen from './screens/Homescreen';

export default function App() {
  return (
    <SafeAreaView>
      <Homescreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
