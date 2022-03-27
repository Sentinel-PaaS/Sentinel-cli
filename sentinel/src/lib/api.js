const axios = require('axios')
const path = require('path')
const fs = require('fs')
let url = ''

// FIXME: Refactor opportunity, the api object is a good candidate for being class
// TODO: Make sure axios headers are implemented correctly
const api = {
  setURL: async (sentinelConfigPath) => {
    let sentinelIP = await new Promise((resolve, reject) => {
      fs.readFile(path.join(`${sentinelConfigPath}/sentinel-ip.txt`), 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    sentinelIP = sentinelIP.replace('\n', '')
    // FIXME: hard coded port should be 80
    url = `http://${sentinelIP}:3000`
  },
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
  removeApp: async () => {
    await axios.delete(url + '/api/apps/remove')
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
  startDockerSwarm: async () => {
    console.log(url)
    // TODO: make the request 
    // await axios.post(url + '/api/cluster/initialize')
  },
}

export default api
