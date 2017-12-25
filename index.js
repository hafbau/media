/**
 * Auth Class
 */
const uuid = require('cuid');
const request = require('request-promise-native');
const superagent = require('superagent');

class Media {
    constructor({ appId = uuid(), apiUrl = 'http://localhost:4002' }) {
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
            // fileStream is of File from the browser
            if (process.browser && fileStream instanceof File) {
                const formData = new FormData()
                formData.append(fieldName, this.state.file);
                
                return superagent.post(`${this.apiUrl}/files`)
                .send(formData)
            }
            // fileStream is of node ReadStream
            if (
                typeof fileStream.read === 'function' ||
                typeof fileStream.on === 'function'
            ) {
            
                return request({
                    method: 'POST',
                    uri: `${this.apiUrl}/files`,
                    formData: { [fieldName]: fileStream },
                    json: true
                })
            }
            // unrecognized file type
            throw new TypeError("File must be an instance of Web API File or a node ReadStream") 
        })
        .then(fileDetail => {
            const files = fileDetail.files;
            return (files && files.length === 1) ? files[0] : files;
        })
        .catch(err => {
            console.log('error in media upload', err)
            throw err
        })
    }
 }

 // exports a singleton instance
 module.exports = new Media({});