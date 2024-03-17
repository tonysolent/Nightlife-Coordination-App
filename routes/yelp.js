const router = require("express").Router()
const path = require("path")
const yelp = require("yelp-fusion")
require("dotenv").config({ path: path.resolve(__dirname, ".env"), })

const { yelpKey, } = process.env
const client = yelp.client(yelpKey)

module.exports = () => {

  router.get("/", (req, res) => {
    const { query, } = req

    client.search({
      ...query,
      sort_by: "distance",
    }).then(response => {
      res.json({
        success: true,
        query,
        response,
      })
    }).catch(err => {

      res.json({
        success: false,
        query,
        response: err 
          ? err.response.body
          : { code: "", description: "Unable to Access API",},
      })
    })
  })

  return router
}