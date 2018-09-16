const IBM = require('ibm-cos-sdk')
const credentials = require('../../object-storage-credentials')
const Building = require('../../models/index').building

var config = {
  endpoint: "xx",
  apiKeyId: credentials.apikey,
  ibmAuthEndpoint: 'https://iam.ng.bluemix.net/oidc/token',
  serviceInstanceId: credentials.resource_instance_id
}

var cos = new IBM.S3(config);

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: 'yRcrtEb4lgsAf9THrHBL8-fGNH4i4OIR1TIW08chX89N'
});

const fs = require('fs')
const path = require('path')

file = fs.readFileSync(path.join(__dirname, '../../img.jpg'))

const createBaseBuilding = (coordinates) => Building
  .create({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude
  })


const checkImg = (file, coordinates) => new Promise((resolve, reject) => {
  createBaseBuilding(coordinates)
    .then(building => {
      visualRecognition.classify({
        images_file: file,
        classifier_ids: ['DefaultCustomModel_1148617143'],
        threshold: 0.6
      }, (err, classificationResult) => {
        console.log(JSON.stringify(classificationResult, null, 2))
        cos.putObject({
            Bucket: "bucket-yyny",
            ACL: "public-read",
            Body: file,
            Key: building.id + ".jpg"
        }, (err, res) => {
            building
              .update({
                classification: classificationResult.images[0].classifiers[0].classes[0].class,
                img_url: config.endpoint + '/bucket-yyny/' + building.id + '.jpg'
              })
              .then(building => {
                resolve(building)
              })
              .catch(err => {
                reject(err)
              })
          })
      })

    })
    .catch(err => console.log(err))
})

// checkImg(file, {latitude: 45.2, longitude: -71.4})
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => console.log(err))

module.exports = {checkImg}
