const router = require("express").Router()

const User = require("../models/User")
const Location = require("../models/Location")

module.exports = () => {
  
  console.debug("WARNING: collection wipe endpoints still configured, remove before moving to production")

  router.get("/wipeusers", (req, res) => {
    User.remove({}, err => {
      if (err) return console.error(err)
      const message = "Successfully wiped 'user' collection"
      console.info(message)
      res.json({success: true, message,})
    })
  })

  router.get("/wipelocations", (req, res) => {
    Location.remove({}, err => {
      if (err) return console.error(err)
      const message = "Successfully wiped 'locations' collection"
      console.info(message)
      res.json({ success: true, message, })
    })
  })

  router.get("/users", (req, res) => {
    User.find({}, (err, docs) => {
      if (err) return console.error(err)
      res.json(docs)
    })
  })

  router.get("/locations", (req, res) => {
    Location.find({}, (err, docs) => {
      if (err) return console.error(err)
      res.json(docs)
    })
  })


  ///////////////////////////////////////////////////////////
  // Return db entries based on received Location IDs
  ///////////////////////////////////////////////////////////
  router.post("/updatedresults", async (req, res, next) => {
    if (!req.body) return next(Error("Must supply array of locations"))

    const { resultIds, } = req.body
    const updates = await Location.updateResults(resultIds)

    res.json({success: true, updates,})
  })


  /* Add validator later */
  ///////////////////////////////////////////////////////////
  // Update Location and User models with 'going' status
  ///////////////////////////////////////////////////////////
  router.post("/going", async (req, res, next) => {

    if (!req.body) {
      return next(Error("Invalid 'body' received"))
    }

    if (!req.user) {
      return next(Error("Must be logged in to perform this action"))
    }
    const { id, alias, } = req.body.location
    const { _id: userId, } = req.user


    try {
      const user = await User.findById(userId)
      if (!user) throw new Error(`No user found matching ID ${userId}`)

      const location = await Location.findOne({id,}) ||
        await new Location({
          id,
          alias,
          going: [],
        }).save()

      const locationIndex = user.going.indexOf(location._id)
      const userIndex = location.going.indexOf(user._id)

      // Add location to user.going if user is going
      if (locationIndex === -1) {
        user.going.push(location._id)
        location.going.push(user._id)
      } else {
        // Remove location from User going array if user not going
        user.going = [
          ...user.going.slice(0, locationIndex),
          ...user.going.slice(locationIndex + 1),
        ]

        location.going = [
          ...location.going.slice(0, userIndex),
          ...location.going.slice(userIndex + 1),
        ]
      }

      await user.save()
      await location.save()

      // Remove location from DB if no users are going
      if (location.going.length === 0) {
        await Location.deleteOne({_id: location._id,})
      }

      res.json({ success: true, going: user.going,})

    } catch(err) {
      return next(err)
    }


  })

  return router

}