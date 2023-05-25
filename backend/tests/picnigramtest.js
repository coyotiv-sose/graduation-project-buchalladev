const request = require('supertest')
const User = require('../src/models/user')
const Ride = require('../src/models/ride')

const app = require('../src/app')

describe('Gruppetto', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Ride.deleteMany()
  })

  it('can create a user', async () => {
    const name = 'Andreas'

    const expectedOutput = {
      name,
      rides: [],
    }

    const actualOutput = await request(app).post('/users').send({ name })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('can create a ride', async () => {
    const name = 'Andreas'

    const user = await request(app).post('/users').send({ name })

    const rideName = "Andreas' Ride"
    const location = 'Zollspieker Fährhaus'
    const date = '2023-07-03'

    const expectedOutput = {
      name: rideName,
      location,
      date,
      attendees: [user.body],
    }

    const actualOutput = await request(app).post('/rides').send({ user: user.body._id, name: rideName, location, date })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('can add an attendee to a Ride', async () => {
    const andreas = await request(app).post('/users').send({ name: 'Andreas' })
    const johanna = await request(app).post('/users').send({ name: 'Johanna' })

    const rideName = "Andreas' Ride"
    const location = 'Zollspieker Fährhaus'
    const date = '2023-07-03'

    const ride = await request(app).post('/rides').send({ user: andreas.body._id, name: rideName, location, date })

    const expectedOutput = {
      name: rideName,
      location,
      date,
      attendees: [{ _id: andreas.body._id }, { _id: johanna.body._id }],
    }

    const actualOutput = await request(app).post(`/rides/${Ride.body._id}/attendees`).send({ user: johanna.body._id })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('responds with 404 if the ride is not found', async () => {
    const andreas = await request(app).post('/users').send({ name: 'Andreas' })

    const rideName = "Andreas' Ride"
    const location = 'Zollspieker Fährhaus'
    const date = '2023-07-03'

    await request(app).post('/rides').send({ user: andreas.body._id, name: rideName, location, date })

    const expectedOutput = {
      message: 'Ride not found',
    }

    const actualOutput = await request(app).get('/rides/6439611cbbecfcc5af0ed27c')

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.status).toBe(404)
  })

  it('can let a user leave a Ride', async () => {
    const andreas = await request(app).post('/users').send({ name: 'Andreas' })
    const johanna = await request(app).post('/users').send({ name: 'Johanna' })

    const rideName = "Andreas' Ride"
    const location = 'Zollspieker Fährhaus'
    const date = '2023-07-03'

    const ride = await request(app).post('/rides').send({ user: andreas.body._id, name: rideName, location, date })

    await request(app).post(`/rides/${ride.body._id}/attendees`).send({ user: johanna.body._id })

    const expectedOutput = {
      name: rideName,
      location,
      date,
      attendees: [{ _id: andreas.body._id }],
    }

    const actualOutput = await request(app).delete(`/rides/${ride.body._id}/attendees`).send({ user: johanna.body._id })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()

    const rideAfterLeave = await request(app).get(`/rides/${ride.body._id}`)

    expect(rideAfterLeave.body.attendees).toHaveLength(1)

    const johannaAfterLeave = await request(app).get(`/users/${johanna.body._id}`)
    expect(johannaAfterLeave.body.rides).toHaveLength(0)

    const andreasAfterLeave = await request(app).get(`/users/${andreas.body._id}`)

    expect(andreasAfterLeave.body.rides).toHaveLength(1)

    expect(andreasAfterLeave.body.rides[0]._id).toBe(ride.body._id)

    expect(andreasAfterLeave.body.rides[0].name).toBe(rideName)

    expect(andreasAfterLeave.body.rides[0].location).toBe(location)

    expect(andreasAfterLeave.body.rides[0].date).toBe(date)

    expect(andreasAfterLeave.body.rides[0].attendees).toHaveLength(1)

    expect(andreasAfterLeave.body.rides[0].attendees[0]._id).toBe(andreas.body._id)

    expect(andreasAfterLeave.body.rides[0].attendees[0].name).toBe('Andreas')
  })

  it('can retrieve a list of users', async () => {
    const andreas = await request(app).post('/users').send({ name: 'Andreas' })
    const johanna = await request(app).post('/users').send({ name: 'Johanna' })

    const expectedOutput = [
      { _id: andreas.body._id, name: 'Andreas' },
      { _id: johanna.body._id, name: 'Johanna' },
    ]

    const actualOutput = await request(app).get('/users')

    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('returns 404 if the user is not found', async () => {
    const expectedOutput = {
      message: 'User not found',
    }

    const actualOutput = await request(app).get('/users/6439611cbbecfcc5af0ed27c')

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.status).toBe(404)
  })

  it('returns a list of rides', async () => {
    const andreas = await request(app).post('/users').send({ name: 'Andreas' })
    const johanna = await request(app).post('/users').send({ name: 'Johanna' })

    const rideName = "Andreas's Birthday Picnic"
    const location = 'Tempelhofer Feld'
    const date = '2023-05-01'

    const ride = await request(app).post('/rides').send({ user: andreas.body._id, name: rideName, location, date })

    await request(app).post(`/rides/${ride.body._id}/attendees`).send({ user: johanna.body._id })

    const expectedOutput = [
      {
        _id: ride.body._id,
        name: rideName,
        location,
        date,
        attendees: [{ _id: andreas.body._id }, { _id: johanna.body._id }],
      },
    ]

    const actualOutput = await request(app).get('/rides')

    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('returns 404 for an unknown url', async () => {
    const expectedOutput = {
      message: 'Not Found',
    }

    const actualOutput = await request(app).get('/unknown')

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.status).toBe(404)
  })

  it('rejects user creation if the name is missing', async () => {
    const expectedOutput = {
      message: 'User validation failed: name: Path `name` is required.',
    }

    const actualOutput = await request(app).post('/users').send({})

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.status).toBe(500)
  })
})
