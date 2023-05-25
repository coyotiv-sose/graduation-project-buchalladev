const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const rideSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})

rideSchema.plugin(autopopulate)

class Ride {}

rideSchema.loadClass(Ride)

module.exports = mongoose.model('Ride', rideSchema)
