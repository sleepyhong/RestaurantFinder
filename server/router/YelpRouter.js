const express = require('express');
const yelp = require('yelp-fusion');

const router = express.Router();
const client = yelp.client(process.env.YELP_API_KEY);

router.get("/businesses/search", async (req, res) => {
    client
        .search(req.query)
        .then((businesses) => {
            return res
                .status(200)
                .json({
                    msg: "Businesses Retrieved Successfully",
                    businesses: JSON.parse(businesses.body)
                });
        })
        .catch((err) => {
            return res
                .status(400)
                .json({
                    msg: err.toString()
                })
        });

});

router.get("/businesses/:id/reviews", async (req, res) => {
    client
        .reviews(req.params.id)
        .then((reviews) => {
            return res
                .status(200)
                .json({
                    msg: "Reviews Retrieved Successfully",
                    reviews: JSON.parse(reviews.body)
                });
        })
        .catch((err) => {
            return res
                .status(400)
                .json({
                    msg: err.toString()
                })
        });
});

module.exports = router;