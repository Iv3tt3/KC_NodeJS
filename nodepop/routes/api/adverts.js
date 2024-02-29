var express = require('express');
var router = express.Router();
const Advert = require('../../models/Advert');

/* GET listing. */
router.get('/', async function(req, res, next) {
    try {

        //Filter 
            //GET /api/adverts?name=Sofa
            const filterByName = req.query.name;
            //GET /api/adverts?sell=true
            const filterBySell = req.query.sell;
            //GET 
            // api/adverts?tags=lifestyle house&type=all - Return ads containing ALL the tags
            // api/adverts?tags=lifestyle house&type=in - Return ads containing some tags

            const filterType = req.query.type;
            const filterByTags = req.query.tags;

            const filter = {}

            if (filterByName) {
                filter.name = filterByName;
            }

            if (filterBySell) {
                filter.sell = filterBySell;
            }

            if (filterByTags) {
                if (filterType === 'all'){
                    filter.tags = { $all: filterByTags.split(' ') };
                }
                else if (filterType === 'in'){
                    filter.tags = { $in: filterByTags.split(' ') };
                }
            }
        

        const adverts = await Advert.find(filter);
        res.json({results: adverts});

    } catch (error){
        next(error)
    }
});

module.exports = router;
