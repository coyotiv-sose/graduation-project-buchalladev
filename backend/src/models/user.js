const Ride = require('./ride')

const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: String,
  ftp: Number,
  rides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ride',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})

userSchema.plugin(autopopulate)

class User {
  async createRide(name, location, date) {
    const ride = await Ride.create({ name, location, date })

    await this.joinRide(ride)

    return ride
  }

  async joinRide(ride) {
    ride.attendees.push(this)
    this.rides.push(ride)

    await ride.save()
    await this.save()
  }

  leaveRide(ride) {
    ride.attendees = ride.attendees.filter(attendee => attendee !== this)
    this.rides = this.rides.filter(p => p !== ride)
  }

  get profile() {
    return `
# ${this.name}

${this.rides.length} rides:
${this.rides
  .map(
    ride => `
- ${ride.name} meeting at ${ride.location} on ${ride.date}
`
  )
  .join('')}
    `
  }
}

userSchema.loadClass(User)

module.exports = mongoose.model('User', userSchema)
