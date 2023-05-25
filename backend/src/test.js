const axios = require('axios')
const User = require('./models/user')
const ride = require('./models/ride')
axios.defaults.baseURL = 'http://localhost:3000'

console.log('Gruppetto is an App to Arrange Grouprides!')

async function main() {
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
    name: "Andreas' Ride",
    location: 'Tempelhofer Feld',
    date: '2023-05-01',
    pace: 3.5,
    rideLength: 45.7,
  })

  const johannasRide = await axios.post('/rides', {
    user: johanna.data._id,
    name: 'Johannas Ride',
    location: 'Sperrwerk Entenwerder',
    date: '2023-06-21',
    pace: 2.1,
    rideLength: 61.2,
  })

  // await axios.post(`/rides/${andreasRide.data._id}/attendees`, {
  //   user: johanna.data._id,
  // })

  const allUsers = await axios.get('/users')
  console.log('List of all users', allUsers.data)
}

main().catch(error => {
  console.log(error.message ? error.message : error)
})
