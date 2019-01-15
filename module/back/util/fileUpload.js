const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3Info = require('../../../config/s3Info');
aws.config.loadFromPath(__dirname + '/../../../config/s3Info.json');
const s3 = new aws.S3();

const upload = (folder) => multer({
   storage: multerS3({
       s3: s3,
       bucket: `${s3Info.bucket}/${folder}`,
       key: function(req, file, cb) {
           console.log(req);
           console.log(file);
           //let extension = path.extname(file.originalname);
           cb(null, Date.now().toString() + file.originalname)
       },
       acl: s3Info.acl
   })
});

module.exports = upload;
