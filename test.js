const media = require('./index');
const fs = require('fs');
const test = require('tape-promise/tape');

// TODO mock / stub out xhr request to server
test('Media#upload should upload filestream', function(t) {
    file = fs.createReadStream('./test.jpg');
    return media.upload(file)
        .then(response => {
            t.ok(response, 'Response is truthy')
            t.ok(typeof response === 'string', 'type of file_id is a string')
            t.ok(response.length, 'file_id is not an empty string')
        })
});
