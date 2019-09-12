import _ from 'lodash'
import * as dbService from './DbService'

export function fetchDevice(id: String): Promise<any> {
  return dbService.fetchSingle("SELECT * FROM devices where id = ?", [id])
    .then(fetchedDevice => {
      const device = _.cloneDeep(fetchedDevice)
      device.basicData = JSON.parse(fetchedDevice.basicData)
      device.data = JSON.parse(fetchedDevice.data)
      return device
    })
}

export function fetchAllDevicesBasicInfo(): Promise<DeviceBasicInfo[]> {
  return dbService.fetchList("SELECT id, image, name FROM devices", [])
}

export function fetchBrandDevicesBasicInfo(brandId: String): Promise<DeviceBasicInfo[]> {
  return dbService.fetchList("SELECT id, image, name FROM devices where brandId = ?", [brandId])
}

export function fetchLikeDevicesBasicInfo(query: String): Promise<DeviceBasicInfo[]> {
  return dbService.fetchList("SELECT id, image, name FROM devices where UPPER(name) like ?", [`%${_.upperCase(query)}%`])
}

export function fetchAllBrands(): Promise<Brand[]> {
  return dbService.fetchList("SELECT * FROM brands", [])
}

export class DeviceBasicInfo {
  id: String
  image: String
  name: String
}

export class Brand {
  id: String
  name: String
  isPopular: Boolean
}