const expect = require("chai").expect

const Location = require("../models/Location")

describe("Location", function () {
  it("should be invalid if name is empty", function (done) {
    const l = new Location()

    l.validate(function (err) {
      expect(err.errors.name).to.exist
      done()
    })
  })
})

describe("Location", function () {
  it("should be invalid if _id is empty", function (done) {
    const l = new Location()

    l.validate(function (err) {
      expect(err.errors._id).to.exist
      done()
    })
  })
})
