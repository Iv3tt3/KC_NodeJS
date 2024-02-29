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
        
        // Pagination GET api/adverts?skip=2&limit=2
            const skip = req.query.skip;
            const limit = req.query.limit;

        // Order GET api/adverts?sort=price
            const sort = req.query.sort;

        // Select fields GET api/adverts?fields=tags
            const fields = req.query.fields;

        const adverts = await Advert.list(filter, skip, limit, sort, fields);
        res.json({results: adverts});

    } catch (error){
        next(error)
    }
});

// Return ad by ID   GET /api/adverts/<_id>
router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const advert = await Advert.findById(id);
  
      res.json({ result: advert })
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
