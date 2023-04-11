var express = require('express')
const ride = require('../models/ride')
const User = require('../models/user')
var router = express.Router()

/* GET rides listing. */
router.get('/', async function (req, res, next) {
  const rides = await ride.find()

  if (req.query.view === 'json') return res.send(rides)

  res.render('rides', {
    rides,
  })
})

/* GET ride details. */
router.get('/:id', async function (req, res, next) {
  const ride = await ride.findById(req.params.id)

  if (!ride) return res.status(404).send('ride not found')

  if (req.query.view === 'json') return res.send(ride)

  res.render('ride-detail', {
    ride,
  })
})

// create a ride
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  const ride = await user.createride(req.body.name, req.body.location, req.body.date)

  res.send(ride)
})

// join a ride
router.post('/:rideId/attendees', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  console.log('user', req.body.user, req.params.rideId)
  const ride = await ride.findById(req.params.rideId)

  await user.joinride(ride)

  res.send({
    name: ride.name,
    location: ride.location,
    date: ride.date,
    attendees: ride.attendees.map(attendee => attendee.name),
  })
})

module.exports = router
