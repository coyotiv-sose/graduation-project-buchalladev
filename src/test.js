const axios = require('axios')
const User = require('./models/user')
const ride = require('./models/ride')
axios.defaults.baseURL = 'http://localhost:3000'

console.log('Gruppetto is an App to Arrange Grouprides!')

async function main() {
  await User.deleteMany()
  await ride.deleteMany()

  const andreas = await axios.post('/users', {
    name: 'Andreas',
    ftp: 3.3,
  })

  const johanna = await axios.post('/users', {
    name: 'Johanna',
    ftp: 4.0,
  })

  const andreasRide = await axios.post('/rides', {
    user: andreas.data._id,
    pace: 3.5,
    name: 'GroupRide of Andreas',
    location: 'Ohlsdorfer Friedhof',
    date: '2023-06-03',
  })

  const johannasRide = await axios.post('/rides', {
    user: johanna.data._id,
    pace: 3.5,
    name: 'GroupRide of Johanna',
    location: 'Sperrwerk Entenwerder',
    date: '2023-05-16',
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
