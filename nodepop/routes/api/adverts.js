var express = require('express');
var router = express.Router();
const Advert = require('../../models/Advert');

/* GET listing. */
router.get('/', async function(req, res, next) {
    try {

        //Filters
        const filterByName = req.query.name;
        const filterBySell = req.query.sell;
        const filterByTags = req.query.tags;

        const filter = {}

        if (filterByName) {
            filter.name = filterByName;
        }

        if (filterBySell) {
            filter.sell = filterBySell;
        }

        if (filterByTags) {
            filter.tags = filterByTags;
        }

        const adverts = await Advert.find(filter);
        res.json({results: adverts});

    } catch (error){
        next(error)
    }
});

module.exports = router;
