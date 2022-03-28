import { json } from 'stream/consumers'

/* eslint-disable max-lines-per-function */
const axios = require('axios')
const path = require('path')
const ipFile = '../../sentinel-ip.txt'
let url = ''
const tokenFile = '../../utils/token.txt'
let token = ''
const FormData = require('form-data')

const fs = require('fs')

//fs.readFile(path.join(__dirname, ipFile), 'utf-8', (err, data) => {
//  if (err) throw err
//  url = `http://${data}`
//})

// Make sure axios headers are implemented correctly
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

    await axios.post(`http://localhost:3000/api/apps/${answers.appName}/upload`, form, {
      headers,
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
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
      //dbFile: form,
    }
/*     let form = new FormData()
    if (answers.dbCreateSchemaOnDeploy) {
      form.append('app_db', file, dbFileName)
      form.append('data', new Blob([JSON.stringify(data)]), 'request.json')
    } */

    let headers = {Authorization: `Bearer ${token}`}

    await axios.post('http://localhost:3000/api/apps', data, {
      headers,
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
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
      canaryWeight: answers.trafficPercentage,
    }

    await axios.post(url + `/api/apps/${answers.appName}/canary`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  canaryTraffic: async (answers) => {
    let data = {
      newWeight: answers.trafficPercentage,
    }

    await axios.put(url + `/api/apps/${answers.appName}/canary`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  promoteCanary: async (answers) => {
    await axios.post(url + `/api/apps/${answers.appName}/promote`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  rollbackCanary: async (answers) => {
    await axios.post(url + `/api/apps/${answers.appName}/rollback`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  getApps: async () => {
    await axios.get(url + '/api/apps/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  getApp: async (answers) => {
    await axios.get(url + `/api/apps/${answers.appName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  removeApp: async (answers) => {
    await axios.delete(url + `/api/apps/${answers.appName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  destroyAll: async () => {
    await axios.delete(url + '/api/destroy', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  scaleCluster: async (answers) => {
    let data = {
      scaleCluster: answers.scaleCluster,
    }

    await axios.put(url + '/api/cluster/scale', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  inspectCluster: async (answers) => {
    await axios.get(url + '/api/cluster', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  scaleApp: async (answers) => {
    let data = {
      scaleNumber: answers.scaleNumber,
    }

    await axios.put(url + `/api/apps/${answers.appName}/scale`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  initializeCluster: async(answers) => {
    await axios.post(url + '/api/cluster/initialize', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
}

export default api

