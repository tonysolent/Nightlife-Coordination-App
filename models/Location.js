const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema({
  id: {type: String, required: true, },
  alias: {type: String, },
  going: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },],
})



locationSchema.statics.updateResults = function(results) {
  return this.find({ id: { $in: results, }, })
    .populate("going", "twitter.displayName")
}

const Location = mongoose.model("Location", locationSchema, "locations")

module.exports = Location