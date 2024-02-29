var express = require('express');
var router = express.Router();
const Advert = require('../models/Advert');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{

    const adverts = await Advert.find()

    res.render('index', {title: "Nodepop adverts", adverts: adverts});
  
  } catch (error){
    next(error)
  }
});

module.exports = router;
