const axios = require('axios')
const User = require('./models/user')
const Ride = require('./models/ride')
axios.defaults.baseURL = 'http://localhost:3000'

require('dotenv').config()
require('./database-connection')

async function main() {
  await User.deleteMany()
  await Ride.deleteMany()

  const andreas = await axios.post('/users', {
    name: 'Andreas',
    email: 'andreasbuchalla@me.com',
    password: '123456',
  })

  const johanna = await axios.post('/users', {
    name: 'Johanna',
    email: 'johanna@web.de',
    password: '123456',
  })

  const andreasRide = await axios.post('/rides', {
    user: andreas.data._id,
    name: "Andreas' Ride",
    location: 'Zollspieker Fährhaus',
    date: '2023-07-03',
    time: '10:00',
    distance: 50,
  })

  const johannasRide = await axios.post('/rides', {
    user: johanna.data._id,
    name: "Johanna's Ride",
    location: 'Sperrwerk Billwerder Bucht',
    date: '2023-07-05',
    time: '13:00',
    distance: 60,
  })

  await axios.post(`/rides/${andreasRide.data._id}/attendees`, {
    user: johanna.data._id,
  })

  await axios.post(`/rides/${johannasRide.data._id}/attendees`, {
    user: andreas.data._id,
  })

  const allUsers = await axios.get('/users')
  console.log('List of all users', allUsers.data)
}

main().catch(error => {
  console.log(error.message ? error.message : error)
})
