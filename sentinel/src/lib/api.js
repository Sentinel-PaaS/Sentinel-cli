/* eslint-disable max-lines-per-function */
const axios = require('axios')
// const path = require('path')
const FormData = require('form-data')
const fs = require('fs')
const childProcess = require('child_process')

let token = ''
let url = ''

async function execute(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (err, contents) => {
      if (err) {
        reject(err)
        return
      }

      resolve(contents)
    })
  })
}

async function setConfigs() {
  console.log("in setConfigs");
  let user = await execute('echo $USER')
  user = user.replace('\n', '')
  let path = `/home/${user}/.sentinel/config`

  try {
    token = await new Promise((resolve, reject) => {
      fs.readFile(`${path}/token.txt`, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    let sentinelIP = await new Promise((resolve, reject) => {
      fs.readFile(`${path}/sentinel-ip.txt`, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    sentinelIP = sentinelIP.replace('\n', '')
    url = `http://${sentinelIP}:80`
  } catch (error) {
    console.log(error);
  }
}

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

    try {
      await setConfigs()
      const response = await axios.post(url + `/api/apps/${answers.appName}/upload`, form, {
        headers,
      })
      return response
    } catch (error) {
      throw error
    }
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
    let headers = { Authorization: `Bearer ${token}` }

    try {
      await setConfigs()
      const response = await axios.post(url + '/api/apps', data, {
        headers
      })
      return response
    } catch (error) {
      throw response
    }
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

    try {
      await setConfigs()
      const response = await axios.post(url + `/api/apps/${answers.appName}/canary`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response;
    } catch (error) {
      throw error
    }
  },
  canaryTraffic: async (answers) => {
    let data = {
      newWeight: answers.trafficPercentage,
    }

    try {
      await setConfigs()
      const response = await axios.put(url + `/api/apps/${answers.appName}/canary`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  promoteCanary: async (answers) => {
    try {
      await setConfigs()
      const response = await axios.post(url + `/api/apps/${answers.appName}/promote`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  rollbackCanary: async (answers) => {
    try {
      await setConfigs()
      const response = await axios.post(url + `/api/apps/${answers.appName}/rollback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  getApps: async () => {
    try {
      await setConfigs()
      const response = await axios.get(url + '/api/apps/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  getApp: async (answers) => {
    try {
      await setConfigs()
      const response = await axios.get(url + `/api/apps/${answers.appName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  removeApp: async (answers) => {
    try {
      await setConfigs()
      const response = await axios.delete(url + `/api/apps/${answers.appName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  destroyAll: async () => {
    try {
      await setConfigs()
      const response = await axios.delete(url + '/api/destroy', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      return response
    } catch (error) {
      throw error
    }
  },
  scaleCluster: async (answers) => {
    let data = {
      scaleCluster: answers.scaleCluster,
    }
    try {
      await setConfigs()
      const response = await axios.put(url + '/api/cluster/scale', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response
    } catch (error) {
      throw error
    }

  },
  inspectCluster: async () => {
    try {
      await setConfigs()
      const response = await axios.get(url + '/api/cluster', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }
  },
  scaleApp: async (answers) => {
    let data = {
      scaleNumber: answers.scaleNumber,
    }

    try {
      await setConfigs()
      const response = await axios.put(url + `/api/apps/${answers.appName}/scale`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      throw error
    }

  },
  initializeCluster: async () => {
    try {
      await setConfigs()

      const response = await axios.post(url + '/api/cluster/initialize')
      console.log(response)
    } catch (error) {
      throw error
    }
  }

}

export default api
