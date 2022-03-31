/* eslint-disable max-lines-per-function */
const axios = require('axios')
const path = require('path')
const FormData = require('form-data')
const fs = require('fs')
// const tokenFile = '/home/$USER/.sentinel/config'

let token = ''
let url = ''

const api = {
  readToken: async () => {
    fs.readFile(path.join(__dirname, tokenFile), 'utf-8', (err, data) => {
      if (err) throw err
      token = data
    })
  },
  uploadSQL: async (answers, file, dbFileName) => {
    let form = new FormData()
    form.append('app_db', file, dbFileName)
    let headers = {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`,
    }

    const response = await axios.post(url + `/api/apps/${answers.appName}/upload`, form, {
      headers,
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  deployApplication: async (answers) => {
    let data = {
      productionImagePath: answers.appImage,
      productionPort: answers.appImagePort,
      appName: answers.appName,
      hostname: answers.hostName,
      appHasDatabase: answers.hasDatabase,
      dbUsername: answers.dbUsername,
      dbPassword: answers.dbPassword,
      dbHost: answers.dbHost,
      dbName: answers.dbName,
      dbCreateSchemaOnDeploy: answers.createSchemaOnDeploy,
    }
  
    let headers = {Authorization: `Bearer ${token}`}

    const response = await axios.post(url + '/api/apps', data, {
      headers,
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  canaryDeploy: async (answers) => {
    let data = {
      productionImagePath: answers.appImage,
      productionPort: answers.appImagePort,
      canaryImagePath: answers.canaryImage,
      canaryPort: answers.canaryImagePort,
      hostname: answers.hostName,
      appHasDatabase: answers.hasDatabase,
      dbUsername: answers.dbUsername,
      dbPassword: answers.dbPassword,
      dbName: answers.dbName,
      dbHost: answers.dbHost,
      canaryWeight: answers.trafficPercentage,
    }

    const response = await axios.post(url + `/api/apps/${answers.appName}/canary`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })

    return response
  },
  canaryTraffic: async (answers) => {
    let data = {
      newWeight: answers.trafficPercentage,
    }

    const response = await axios.put(url + `/api/apps/${answers.appName}/canary`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  promoteCanary: async (answers) => {
    const response = await axios.post(url + `/api/apps/${answers.appName}/promote`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  rollbackCanary: async (answers) => {
    const response = await axios.post(url + `/api/apps/${answers.appName}/rollback`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  getApps: async () => {
    const response = await axios.get(url + '/api/apps/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  getApp: async (answers) => {
    const response = await axios.get(url + `/api/apps/${answers.appName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  removeApp: async (answers) => {
    const response = await axios.delete(url + `/api/apps/${answers.appName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  destroyAll: async () => {
    const response = await axios.delete(url + '/api/destroy', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  scaleCluster: async (answers) => {
    let data = {
      scaleCluster: answers.scaleCluster,
    }

    const response = await axios.put(url + '/api/cluster/scale', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  inspectCluster: async (answers) => {
    const response = await axios.get(url + '/api/cluster', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  scaleApp: async (answers) => {
    let data = {
      scaleNumber: answers.scaleNumber,
    }

    const response = await axios.put(url + `/api/apps/${answers.appName}/scale`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    })
    return response
  },
  initializeCluster: async () => {
    console.log("Mock request to initialize cluster: ", url);
    // TODO: initialize the cluster
    // const response = await axios.post(url + '/api/cluster/initialize', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(response => {
    //     return response
    //   })
    //   .catch(error => {
    //     return error.message
    //   })
    // return response
  },
  setConfigs: async (sentinelConfigPath) => {
    let sentinelIP = await new Promise((resolve, reject) => {
      fs.readFile(path.join(`${sentinelConfigPath}/sentinel-ip.txt`), 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    token = await new Promise((resolve, reject) => {
      fs.readFile(path.join(`${sentinelConfigPath}/token.txt`), 'utf-8', (err, data) => {
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
  }
}

export default api
