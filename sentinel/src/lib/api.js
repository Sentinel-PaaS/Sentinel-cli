/* eslint-disable max-lines-per-function */
const axios = require('axios')
const path = require('path')
const ipFile = '../../sentinel-ip.txt'
let url = ''
const FormData = require('form-data')

const fs = require('fs')

fs.readFile(path.join(__dirname, ipFile), 'utf-8', (err, data) => {
  if (err) throw err
  url = `http://${data}`
})

// Make sure axios headers are implemented correctly
const api = {
  deployApplication: async (answers, file = '', dbFileName = '') => {
    let form = new FormData()
    if (answers.pathToDbFile) {
      form.append(`${answers.appName}_db`, file, dbFileName) //1st arg renames file, 2nd arg is the actual file, 3rd arg is the original file name
    }

    await axios.post(url + '/api/apps', {
      headers: {
        ...form.getHeaders(), //This sets the form headers and the form boundary appropriately. Required.
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
        dbCreateSchemaOnDeploy: answers.createSchemaOnDeploy,
        dbFile: form,
      },
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  canaryDeploy: async (answers) => {
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
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  canaryTraffic: async (answers) => {
    await axios.put(url + `/api/apps/${answers.appName}/canary`, {
      data: {
        trafficPercentage: answers.trafficPercentage,
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
    await axios.post(url + `/api/apps/${answers.appName}/promote`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  rollbackCanary: async (answers) => {
    await axios.post(url + `/api/apps/${answers.appName}/rollback`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  getApps: async () => {
    await axios.get(url + '/api/apps/')
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  getApp: async (answers) => {
    await axios.get(url + `/api/apps/${answers.appName}`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  removeApp: async (answers) => {
    await axios.delete(url + `/api/apps/${answers.appName}`)
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  destroyAll: async () => {
    await axios.delete(url + '/api/destroy')
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  scaleCluster: async (answers) => {
    await axios.put(url + '/api/cluster/scale', {
      data: {
        scaleCluster: answers.scaleCluster,
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
    await axios.get(url + '/api/cluster')
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
  scaleApp: async (answers) => {
    await axios.put(url + `/api/apps/${answers.appName}/scale`, {
      data: {
        scaleNumber: answers.scaleNumber,
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
    await axios.post(url + '/api/cluster/initialize')
    .then(response => {
      return response
    })
    .catch(error => {
      return error.message
    })
  },
}

export default api

