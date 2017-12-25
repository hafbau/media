/**
 * Auth Class
 */
const uuid = require('cuid');
const request = require('request-promise-native');

 class Media {
     constructor({ appId = uuid(), apiUrl = 'http://localhost:3010' }) {
        this.appId = appId;
        this.apiUrl = apiUrl;
     }

     init({ appId = this.appId, apiUrl = this.apiUrl }) {
         // backfills constructor
         this.appId = appId;
         this.apiUrl = apiUrl;
     }

     upload(fileStream, fieldName = 'file') {
         return Promise.resolve().then(_ => {
             console.log('instance of file', fileStream instanceof File)
             console.log('type of file', typeof fileStream)
            // fileStream is of node ReadStream
            // if (
            //     typeof fileStream.read !== 'function' ||
            //     typeof fileStream.on !== 'function'
            // ) {
            
                return request({
                    method: 'POST',
                    uri: `${this.apiUrl}/files`,
                    formData: { [fieldName]: fileStream },
                    json: true
                })
            // }
        })
        .then(fileDetail => {
            return fileDetail;
        })
        .catch(err => {
            throw err
        })
    }
 }

 // exports a singleton instance
 module.exports = new Media({});