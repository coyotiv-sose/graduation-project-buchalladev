const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const rideSchema = new mongoose.Schema({
  name: String,
  location: String,
  pace: Number,
  date: String,
  rideLength: Number,
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

class ride {
  get details() {
    return `
# ride ${this.name}
## meeting at ${this.location} on ${this.date} to ride at ${this.pace} w/kg for ${this.rideLength}km

${this.attendees.length} people are attending:
${this.attendees.map(attendee => attendee.name).join(', ')}
`
  }

  set details(newDetails) {
    throw new Error('You cannot edit the details of a ride directly.')
  }
}

rideSchema.loadClass(ride)

module.exports = mongoose.model('ride', rideSchema)