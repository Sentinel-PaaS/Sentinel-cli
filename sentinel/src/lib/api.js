const axios = require('axios')
const path = require('path')
const ipFile = '../../sentinel-ip.txt'
let url = ''

const fs = require('fs')

fs.readFile(path.join(__dirname, ipFile), 'utf-8', (err, data) => {
  if (err) throw err
  url = `http://${data}`
})

// Make sure axios headers are implemented correctly
const api = {
  deployApplication: async (answers) => { //done
    await axios.post(url + '/api/apps', {
      headers: {
        Authorization: 'Bearer ' //+ token
      },
      data: {
        appImage: answers.appImage,
        appPort: answers.appImagePort,
        appName: answers.appName,
        hostName: answers.hostName,
        appHasDatabase: answers.hasDatabase,
        dbUsername: answers.dbUsername,
        dbPassword: answers.dbPassword,
      },
    })
  },
  canaryDeploy: async (answers) => { //done
    await axios.post(url + `/api/apps/${answers.appName}/canary`, {
      data: {
        appImage: answers.appImage,
        appPort: answers.appImagePort,
        canaryImage: answers.canaryImage,
        canaryPort: answers.canaryImagePort,
        appName: answers.appName,
        hostName: answers.hostName,
        appHasDatabase: answers.hasDatabase,
        dbUsername: answers.dbUsername,
        dbPassword: answers.dbPassword,
        canaryTraffic: answers.trafficPercentage,
      },
    })
  },
  canaryTraffic: async (answers) => { //done
    await axios.put(url + `/api/apps/${answers.appName}/canary`, {
      data: {
        trafficPercentage: answers.trafficPercentage,
      },
    })
  },
  promoteCanary: async (answers) => { //done
    await axios.post(url + `/api/apps/${answers.appName}/promote`)
  },
  rollbackCanary: async (answers) => { //done
    await axios.post(url + `/api/apps/${answers.appName}/rollback`)
  },
  getApps: async () => { //done
    await axios.get(url + '/api/apps/')
  },
  getApp: async (answers) => { //Left off here
    await axios.get(url + `/api/apps/${answers.appName}`)
  },
  removeApp: async (answers) => {
    await axios.delete(url + `/api/apps/${answers.appName}`)
  },
  destroyAll: async () => {
    await axios.delete(url + '/api/destroy')
  },
  scaleCluster: async (answers) => {
    await axios.put(url + '/api/cluster/scale', {
      data: {
        scaleCluster: answers.scaleCluster,
      },
    })
  },
  inspectCluster: async (answers) => {
    await axios.get(url + '/api/cluster')
  },
  scaleApp: async (answers) => {
    await axios.post(url + `/api/apps/${answers.appName}/scale`, {
      data: {
        scaleNumber: answers.scaleNumber,
      },
    })
  },
}

export default api

