var express = require('express')
const Ride = require('../models/ride')
const User = require('../models/user')
var router = express.Router()

/* GET rides listing. */
router.get('/', async function (req, res, next) {
  const rides = await Ride.find()

  res.send(rides)
})

/* GET ride details. */
router.get('/:id', async function (req, res, next) {
  const ride = await Ride.findById(req.params.id)

  if (!ride) return next({ status: 404, message: 'Ride not found' })

  res.send(ride)
})

// create a ride for a user
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  const ride = await user.createRide(req.body.name, req.body.location, req.body.date, req.body.time, req.body.distance)

  res.send(ride)
})

// join a ride
router.post('/:rideId/attendees', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  const ride = await Ride.findById(req.params.rideId)

  await user.joinRide(ride)

  res.send(ride)
})

// leave a ride
router.delete('/:rideId/attendees', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const ride = await Ride.findById(req.params.rideId)

  await user.leaveRide(ride)

  const updatedRide = await Ride.findById(req.params.rideId)

  res.send(updatedRide)
})
module.exports = router
