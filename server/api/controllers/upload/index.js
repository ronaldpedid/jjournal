/**
 * NPM Modules
 */
const fs = require('fs');

/**
 * Local Dependencies
 */
const util = require('../../lib/utils.js');

/**
 * Public Methods
 */
module.exports = {
    upload: upload,
    uploaded: uploaded
};

function upload(req, res) {

    let imageFile = req.files.file;
    console.log(imageFile);
    let fileName = 'img-' + new Date().getTime() + '.' + imageFile.name.split('.').slice(-1)[0];

    fs.writeFileSync(`../server/public/uploads/${fileName}`, imageFile.data);

    res.json({ files: `http://localhost:4000/public/uploads/images/${fileName}` });

}

function uploaded(req, res) {
    res.send('posted.');
}