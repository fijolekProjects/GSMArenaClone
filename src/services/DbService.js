import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase({ name: 'db.sqlite', createFromLocation: 1 })

export function fetchSingle(sql: String, params: any[]): Promise<any> {
  return fetch(sql, params)
    .then(resultSet => {
      return resultSet.rows.item(0)
    })
}

export function fetchList(sql: String, params: any[]): Promise<any> {
  return fetch(sql, params)
    .then(resultSet => {
      const resultArray = []
      for (let i = 0; i < resultSet.rows.length; ++i) {
        resultArray.push(resultSet.rows.item(i))
      }
      return resultArray
    })
}

function fetch(sql: String, params: any[]): Promise<ResultSet> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(sql, params,
        (tx, resultSet) => {
          resolve(resultSet)
        },
        err => {
          reject(err)
        })
    })
  })
}