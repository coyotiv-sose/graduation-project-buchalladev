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

var capitalize = require('capitalize')

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

createCompany('Faktor mensch', [], [], '07.05.2020')
createCompany('Spaccaforno', [], [], '07.03.2021')
createUser('John Doe', 'test@asd.de', null, [], '01.01.2020', 'admin', 'male')
createUser('Max Mustermann', 'test2@asd.de', null, [], '22.04.2021', 'user', 'male')
createUser('Lisa Lustig', 'test3@asd.de', null, [], '12.04.2019', 'user', 'female')
createOffer('Urban Sports Club', ['fitness', 'wellbeing'], 10, '%', '01.01.2020', '01.01.2024')
createOffer('Bistro Jolie', ['food', 'wellbeing'], 20, '%', '01.01.2020', '01.01.2024')

companies[0].addUser(users[0])
companies[0].addUser(users[1])
companies[0].addOffer(offers[0])

//tests

console.log('These are Tests:')
console.log('____________')
console.log(`Test1: ${users[1].id === 1} // Check if IDs are right`)
console.log(`Test2: ${companies[0].users.length === 2} // Check if Company 2 has 1 User`)
console.log(`Test3: ${offers.length >= 1} // Check if an Offer was created `)
console.log('____________')
// console.log(users)

//CONTROLOUTPUT
console.log('#Users')
users.forEach(element => console.log(`* ${element.name}`))
console.log('')
console.log('#Companies')
companies.forEach(element => console.log(`* ${element.name}`))
console.log('')
console.log('#Offers')
offers.forEach(element => console.log(`* ${element.name}`))
console.log('______________________')
console.log('')
console.log(`#Offers linked to ${companies[0].name}`)
console.log(companies[0].offers.forEach(element => console.log(`* ${element.name}`)))
console.log('______')
console.log('')
console.log(`#Users linked to ${companies[0].name}`)
console.log(companies[0].users.forEach(element => console.log(`* ${element.name}`)))

console.log('______________________')
console.log('______________________')
console.log('')

// TERMINAL OUTPUT
console.log(
  'Welcome to HealthHub! We are a company that is used for communicating with customers and offers them discounts for their health insurance and other health related services.'
)
// console.log('---------')
// console.log(companies[0])

console.log('---------')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let answers = {}
setTimeout(() => {
  rl.question('What is your name? ', name => {
    answers.name = name

    rl.question('What is your company? ', company => {
      answers.company = company
      console.log(``)
      console.log(
        `Hello ${answers.name}, your company ${capitalize.words(answers.company)} has the following offer:
        ${findOffer(answers.company)}`
      )

      rl.close()
    })
  })
}, 1000)

//find company in companies and return offer
function findOffer(company) {
  let foundOffer = companies.find(c => c.name == company)
  return foundOffer.offers.map(o => `* ${o.discount} ${o.typeofDiscount} at ${o.name} until ${o.endOffer}`)
}
