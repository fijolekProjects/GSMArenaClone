import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text, FlatList, TouchableOpacity, SectionList
} from 'react-native';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import _ from 'lodash'

import ActivityIndicatorAnimation from './ActivityIndicatorAnimation'
import * as dataService from '../services/DataService'

const Brands = ({navigation}) => {
  const [brands, setBrands] = useState([])
  const [showPopularBrands, setShowPopularBrands] = useState(true)
  const [clickedBrandId, setClickedBrandId] = useState(null)
  const popularBrands = () => _.filter(brands, (brand) => brand.isPopular)
  const brandsToShow = showPopularBrands ? popularBrands() : brands

  useEffect(() => {
    dataService.fetchAllBrands().then(brands => { setBrands(brands) } )
  }, [])

  const goToBrandScreen = (brand: dataService.Brand)  => {
    setClickedBrandId(brand.id)
    return dataService.fetchBrandDevicesBasicInfo(brand.id)
      .then(devices => {
        setClickedBrandId(null)
        navigation.navigate('DeviceList', {devicesBasicInfo: devices})
      })
  }
  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={brandsToShow}
          initialNumToRender={10}
          renderItem={({ item, index, separators }) => {
            return (
              <TouchableOpacity onPress={() => goToBrandScreen(item)}>
                <ListItem
                  title={item.name}
                  rightElement={<ActivityIndicatorAnimation animating={clickedBrandId === item.id}/>}
                  bottomDivider
                  chevron
                />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => item.name + index}
        />
      </View>
      <Button title={showPopularBrands ? "See more" : "See less"} onPress={() => {
        setShowPopularBrands(!showPopularBrands)
      }}/>
    </> 
  )
}

const styles = StyleSheet.create({
  brandsListView: {
    flex: 1, paddingBottom: 10, paddingTop: 10, paddingLeft: 10,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#cdcdcd',
    justifyContent: 'space-between'
  },
  brandName: { },
  listIcon: { paddingTop: 5, paddingRight: 5, color: '#d50000' }
})

export default Brands;