const AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + '/../../../config/s3Info.json');
const s3 = new AWS.S3();

const awsS3 = {
    bucketName: 'spin-protocol-resource',
    acl: 'public-read-write',
    url: 'https://spin-protocol-resource.s3.ap-northeast-2.amazonaws.com/campaign',

    getS3Bucket() {
        return this.bucketName;
    },

    getS3URL() {
        return this.url;
    },

    getS3ACL() {
        return this.acl;
    },

    convertImgPath(id, user_id, fileName) {
        return `/campaign_${id}_${user_id}/${fileName}`;
    },

    mainImgParams(file, imgPath) {
        return {
            Bucket: this.getS3Bucket(),
            ACL: this.getS3ACL(), // 접근 권한
            Key: `campaign${imgPath}`, // 경로
            ContentType: file.mimetype, // 파일 타입
            Body: file.buffer // 파일 본문
        }
    },

    insertImgToS3(file, imgPath) {
        s3.putObject(this.mainImgParams(file, imgPath), (err, data) => {
            if (err) {
                return;
            }
        })
    }
};

module.exports = awsS3;