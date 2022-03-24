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
  deployApplication: async (answers) => {
    await axios.post(url + '/api/apps', {
      headers: {
        Authorization: 'Bearer ' //+ token
      },
      data: {
        appImage: answers.appImage,
        appName: answers.appName,
        hostName: answers.hostName,
        databaseImage: answers.databaseImage,
      }
    });
  },
  canaryDeploy: async (answers) => {
    await axios.post(url + '/api/apps/canary/deploy', {
      data: {
        appImage: answers.appImage,
        appName: answers.appName,
      },
    });
  },
  canaryTraffic: async (answers) => {
    await axios.post(url + '/api/apps/canary/traffic', {
      data: {
        appName: answers.appName,
        trafficPercentage: answers.trafficPercentage,
      },
    });
  },
  promoteCanary: async (answers) => {
    await axios.post(url + '/api/apps/canary/promote', {
      data: {
        appName: answers.appName,
      },
    });
  },
  rollbackCanary: async (answers) => {
    await axios.post(url + '/api/apps/canary/rollback', {
      data: {
        appName: answers.appName,
      },
    });
  },
  getInventory: async () => {
    await axios.get(url + '/api/apps/');
  },
  getAppHeatlh: async () => {
    await axios.get(url + '/api/apps/health');
  },
  removeApp: async () => {
    await axios.delete(url + '/api/apps/remove');
  },
  destroyAll: async () => {
    await axios.delete(url + '/api/destroy');
  },
};

export default api;

