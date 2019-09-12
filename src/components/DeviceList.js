import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList, Image, TouchableOpacity
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import _ from 'lodash'

import {deviceImages} from '../services/DeviceImages'
import * as dataService from '../services/DataService'
import ActivityIndicatorAnimation from './ActivityIndicatorAnimation'

const DeviceList = ({navigation, devicesBasicInfo}) => {
  const [clickedDeviceId, setClickedDeviceId] = useState(null)

  const goToDeviceScreen = (item) => {
    setClickedDeviceId(item.id)
    dataService.fetchDevice(item.id)
      .then(device => {
        setClickedDeviceId(null)
        const deviceProps = { device: device, image: deviceImages[device.image] }
        navigation.navigate('Device', deviceProps);
      })
  }
  const devices = _.get(navigation, 'state.params.devicesBasicInfo') || devicesBasicInfo

  console.log("DeviceList lista")
  return (
    <>
    <FlatList
      data={devices}
      extraData={clickedDeviceId}
      renderItem={({ item, index, separators }) => {
        const animating = clickedDeviceId === item.id
        return (
          <TouchableOpacity onPress={() => goToDeviceScreen(item)}>
            <View style={styles.deviceItemView} >
              <Image style={styles.deviceImage} source={deviceImages[item.image]} />
              <Text style={{}}>{item.name}</Text>
              <ActivityIndicatorAnimation style={styles.activityIndicator} animating={animating} />
            </View>
          </TouchableOpacity>
        )
      }}/>
    </>
  )

}
export default DeviceList;

const styles = StyleSheet.create({
  deviceItemView: {
    flex: 1, flexDirection: 'row', paddingBottom: 10, paddingTop: 10, height: 100,
    borderBottomWidth: 0.5,
    borderColor: '#cdcdcd',
    alignItems: 'center'
  },
  deviceImage: { width: 80, height: 80, resizeMode: 'contain' },
  deviceName: {  },
  activityIndicator: {flex: 1, alignItems: 'flex-end', marginRight: 20}
})