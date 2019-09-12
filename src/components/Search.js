import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text, FlatList, TouchableOpacity, SectionList
} from 'react-native';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import DeviceList from './DeviceList'

import * as dataService from '../services/DataService'

const Search = ({navigation}) => {
  const [devices, setDevices] = useState([])
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
      <SearchBar
        lightTheme={true}
        placeholder="Search"
        value={searchValue}
        onChangeText={(newValue) => {
            setSearchValue(newValue)
            dataService.fetchLikeDevicesBasicInfo(newValue)
              .then((devices) => setDevices(devices))
        }}
      />
      <DeviceList navigation={navigation} devicesBasicInfo={devices}/>
    </>
  )
}

export default Search;