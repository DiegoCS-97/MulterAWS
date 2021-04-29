var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const path = require('path');
const fs = require('fs')
var index = fs.readFileSync('index.html');

const PORT = 5500;

const app = express();

app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log('app is running in port ' + PORT);
});

const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = 'pae-ejercicio';

var s3 = new aws.S3({
    params: { bucket: BUCKET_NAME }
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

aws.config.update({
    region: 'us-east-2',
    accessKeyId: ID,
    secretAccessKey: SECRET
});
 
app.post('/image', upload.array('photos', 3), function (req, res, next) {
    console.log('se guardo');
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})