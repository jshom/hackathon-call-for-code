const fs = require('fs')
const path = require('path')
const express = require('express');
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
const watsonInterface = require('../services/watson-interface')

module.exports = function(app) {
  var router = express.Router();

  var cpUpload = upload.fields([{ name: 'building_img', maxCount: 1 }])
  router.post('/check', cpUpload, (req, res) => {
    console.log(req.body)
    // console.log(req.files['building_img'])
    const relPath = "../../" + req.files['building_img'][0].path
    const absPth = path.join(__dirname, relPath)

    console.log(req.files['building_img'][0])

    // res.send(200)

    watsonInterface
      .checkImg(fs.readFileSync(absPth), {
        latitude: +req.body.latitude,
        longitude: +req.body.longitude
      })
      .then(() => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  });

  router.get('/', (req, res) => {
    res.send('woo')
  })

  app.use("/image", router);
}
