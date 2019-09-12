import React, { Component } from 'react'
import { Text, View, Image, ScrollView, SectionList, StyleSheet, Button, Platform, StatusBar, FlatList, TouchableHighlight } from 'react-native'
import { NativeModules } from 'react-native';
import PropTypes from 'prop-types'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Device = (props) => {
  console.log("ALALA")

  basicDataMappings = [
    {name: "screen",  icon: "cellphone-screenshot"},
    {name: "camera",  icon: "camera"},
    {name: "chipset", icon: "chip"},
    {name: "battery", icon: "battery"},
  ]
    const { device, image } = props.navigation.state.params
    const allAreas = device.data.map(kv => kv.area)
    const areas = _.uniq(allAreas)
    return (
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.deviceHeaderText}>{device.name}</Text>
        <View style={styles.topContainer}>
          <Image source={image} style={styles.topImage}/>
          <View style={styles.basicDataContainer}>
            {this.basicDataMappings.map(dataMapping => {
              return (<BasicDataItem key={dataMapping.name} deviceBasicData={device.basicData} dataMapping={dataMapping} styles={styles} />)
            })}
          </View>
        </View>
        <View style={styles.deviceDetails}>
          {areas.map((area, index) => {
            return (
                <DeviceAreaDataList key={area} area={area} data={deviceData(area, device)} styles={styles} />
              )
          })}
        </View>
      </ScrollView>
    )

  function deviceData(area: String, device: Object) {
    return device.data.filter(kv => kv.area == area);
  }
}

export default Device;

const DeviceAreaDataList = ({ area, data, styles }) => {
  return (
    <FlatList
      keyExtractor={(item, index) => `${item.key}-${index}`}
      ListHeaderComponent={() => <Text style={styles.areaHeader}>{_.upperCase(area)}</Text> }
      data={data}
      renderItem={({ item, index, separators }) => (
        <View style={styles.areaItemContainer}>
          <Text style={styles.areaItemKey}>{item.key}</Text>
          <Text style={styles.areaItemValue}>{item.value}</Text>
        </View>
      )}
    />
  )
};

DeviceAreaDataList.propTypes = {
  area: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  styles: PropTypes.object.isRequired
}


const BasicDataItem = ({ deviceBasicData, dataMapping, styles }) => {
  const mainValue = _.get(deviceBasicData, [dataMapping.name, 'mainValue'])
  const additionalValue = _.get(deviceBasicData, [dataMapping.name, 'additionalValue'])

  return (
    <View style={styles.basicDataItemContainer}>
      <Icon name={dataMapping.icon} style={styles.basicDataItemIcon} />
      <View>
        <Text style={styles.basicDataItemMainText}>{mainValue}</Text>
        <Text style={styles.basicDataItemAdditionalText}>{additionalValue}</Text>
      </View>
    </View>
  )
}

BasicDataItem.propTypes = {
  deviceBasicData: PropTypes.object.isRequired,
  dataMapping: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired
}


const styles = StyleSheet.create({
  deviceHeaderText: {fontSize: 24, fontWeight: '700', color: '#212121', paddingLeft: 10},
  scrollViewContainer: {
    backgroundColor: 'white'
  },

  deviceDetails: {
    backgroundColor: '#e0e0e0'
  },

  areaItemContainer: { flex: 1, flexDirection: 'row', margin: 1, backgroundColor: '#fafafa', fontSize: 12, fontFamily: 'Arial'
},
  areaHeader: {
    backgroundColor: '#f5f5f5', color: '#d50000', paddingLeft: 10, marginTop: 10, fontSize: 15, fontFamily: 'Arial', fontWeight: '700'
  },

  areaItemKey: { width: 110, color: '#555', fontWeight: '700', paddingLeft: 10 },

  areaItemValue: {
    color: 'black',
    flex: 1, 
    flexWrap: 'wrap'
  },
  basicDataContainer: {backgroundColor: "#F5F5F5", flexDirection: 'column', flex: 1, marginLeft: 10, marginRight: 10 },
  basicDataItemContainer: { flexDirection: 'row', flex: 1, marginTop: 5, marginLeft: 10 },
  basicDataItemIcon: { marginTop: 5, marginRight: 10, width: 30, color: '#9E9E9E', fontSize: 30 },
  basicDataItemMainText: { fontSize: 17, fontWeight: '700', color: '#9E9E9E' },
  basicDataItemAdditionalText: { fontSize: 12, color: '#9E9E9E' },
  topContainer: {flex: 1, flexDirection: 'row', marginBottom: 20 },
  topImage: {flex: 1, resizeMode: 'contain'},

})