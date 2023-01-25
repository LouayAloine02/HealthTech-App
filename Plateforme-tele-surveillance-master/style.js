/* eslint-disable prettier/prettier */
import {  View, Text } from "react-native"

const toastConfig = {
    warning: ({ text1, props }) => (
      <View style={{ height: 30, width: '100%', backgroundColor: 'orange', padding: 4, }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
    done: ({ text1, props }) => (
      <View style={{ height: 30, width: '100%', backgroundColor: '#1affc6', padding: 4, }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };
  
  export {  toastConfig }