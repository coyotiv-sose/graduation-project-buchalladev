var express = require('express')
const User = require('../models/user')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('users', { title: '', users: User.list })
  //res.render('users', { title: '' })
  res.render('index', { title: 'GRUPETTO' })
})

module.exports = router
