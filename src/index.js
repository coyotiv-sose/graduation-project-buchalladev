//  HealthHub is an app that is used for communicating with customers and offers them discounts for their health insurance and other health related services.

// I need several objects.. companies, users and offers

// I need to be able to create a user and assign wich company he is from
// I need to be able to create a company and assign wich users are in it
// I need to be able to create a user and assign wich offers he can see
// I need to be able to create a company and assign wich offers it can see
// I need to be able to create an offer and assign wich companies can see it
// I need to be able to create an offer and assign wich users can see it

// i need to create an admin who can modify users and offers
// offers need to display which discounts they have
const User = require('./user.js')
const Company = require('./company.js')
const Offer = require('./offer.js')

const users = []
const companies = []
const offers = []

const company1 = new Company('Pizza Social Club', [], [], '07.05.2020')
const company2 = new Company('Spaccaforno', [], [], '07.03.2021')
const offer1 = new Offer('Urban Sports Club', ['fitness', 'wellbeing'], 10, 'percent', '01.01.2020', '01.01.2024')

// company1.addUser(user1)
// company1.addUser(user2)
// company1.addUser(user3)

function createUser(name, email, company, offers, memberSince, userRole, gender) {
  const u = new User(name, email, company, offers, memberSince, userRole, gender)
  users.push(u)

  if (company) {
    company.addUser(u)
  }
  return u
}

function createCompany(name, users, offers, memberSince) {
  const c = new Company(name, users, offers, memberSince)
  companies.push(c)
  return c
}

function createOffer(name, category, discount, typeofDiscount, startOffer, endOffer) {
  const o = new Offer(name, category, discount, typeofDiscount, startOffer, endOffer)
  offers.push(o)
  return o
}

createCompany('Pizza Social Club', [], [], '07.05.2020')
createCompany('Spaccaforno', [], [], '07.03.2021')
createUser('John Doe', 'test@asd.de', companies[0], [], '01.01.2020', 'admin', 'male')
createUser('Max Mustermann', 'test2@asd.de', companies[1], [], '22.04.2021', 'user', 'male')
createUser('Lisa Lustig', 'test3@asd.de', null, [], '12.04.2019', 'user', 'female')
createOffer('Urban Sports Club', ['fitness', 'wellbeing'], 10, 'percent', '01.01.2020', '01.01.2024')

console.log(users)

//tests

console.log('These are Tests:')
console.log('_____')

console.log(`Test1: ${users[1].id === 1} // Check if IDs are right`)
// console.log(`Test2: ${company1.users.length === 3} // Check if Company has 3 Users`)
// console.log(`Test3: ${offer1.length === 1} // Check if an Offer was created `)

// console.log(users)
