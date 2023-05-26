var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
var session = require('express-session')
var MongoStore = require('connect-mongo')
const passport = require('passport')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')

const mongoose = require('mongoose')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var ridesRouter = require('./routes/rides')
var accountsRouter = require('./routes/accounts')

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user')
const Meeting = require('./models/ride')

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

require('dotenv').config()
console.log(process.env.MONGODB_CONNECTION_STRING)
require('./database-connection')

var app = express()
app.use(helmet())

app.set('trust proxy', 1)

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const clientPromise = mongoose.connection.asPromise().then(connection => (connection = connection.getClient()))

app.use(
  session({
    secret: 'iids)2aykk1',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
      sameSite: 'lax', //process.env.NODE_ENV === 'production' ? 'none' : true,
      domain: process.env.NODE_ENV === 'production' ? '.herokuapp.com' : 'localhost',
    },
    store: MongoStore.create({ clientPromise, stringify: false }),
    // mongoUrl: process.env.MONGODB_CONNECTION_STRING,
  })
)

app.use(passport.session())

app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.history = req.session.history || []
  req.session.history.push({ url: req.url, ip: req.ip })

  // console.log('session', req.session)

  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(mongoSanitize())
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/rides', ridesRouter)
app.use('/accounts', accountsRouter)
app.use('/delete-all', async (req, res) => {
  await User.deleteMany({})
  await Meeting.deleteMany({})
  res.send('ok')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.createSocketServer = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  })

  console.log('socket.io server created')

  io.on('connection', function (socket) {
    console.log('a user connected')

    setInterval(() => {
      socket.emit('time', Math.random() * 10)
    }, 1500)

    socket.on('disconnect', function () {
      console.log('user disconnected')
    })
  })
}

module.exports = app
