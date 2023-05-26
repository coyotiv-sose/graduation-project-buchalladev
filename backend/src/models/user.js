const Ride = require('./ride')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ride',
      autopopulate: false,
    },
  ],
})

userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

class User {
  async createRide(name, location, date, time, distance) {
    const ride = await Ride.create({ name, location, date, time, distance })

    await this.joinRide(ride)

    return ride
  }

  async joinRide(ride) {
    ride.attendees.push(this)
    this.rides.push(ride)

    await ride.save()
    await this.save()
  }

  async leaveRide(ride) {
    ride.attendees.pull(this)
    this.rides.pull(ride)

    await ride.save()
    await this.save()
  }
}

userSchema.loadClass(User)

module.exports = mongoose.model('User', userSchema)
