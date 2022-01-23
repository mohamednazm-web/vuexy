const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink('./' + filePath, (req, res, next, err) => {
        if (err) {
            res.redirect('back')
        }
        console.log('File deleted succesfully');
    });
}

exports.deleteFile = deleteFile;