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

class user {
  constructor(name, email, company, offers, memberSince, userRole) {
    this.name = name
    this.email = email
    this.company = company // company that the user is from
    this.offers = offers // offers that the user can see
    this.memberSince = memberSince // member since When
    this.userRole = userRole // admin, user
  }
}

class company {
  constructor(name, users, offers, customerSince) {
    this.name = name
    this.users = users
    this.offers = offers
    this.customerSince = customerSince
  }
  addUser(user) {
    this.users.push(user)
    user.company = this
  }
  removeUser(user) {
    this.users = this.users.filter(u => u !== user)
    user.company = null
  }
}

class offer {
  constructor(name, category, discount, typeofDiscount, startOffer, endOffer) {
    this.name = name
    this.category = category // health, fitness, wellness, beauty, etc
    this.discount = discount // 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
    this.typeofDiscount = typeofDiscount // percent, fixed
    this.startOffer = startOffer // when the offer starts
    this.endOffer = endOffer // when the offer ends
  }
}

const user1 = new user('John Doe', 'test@asd.de', [], [], '01.01.2020', 'admin')
const company1 = new company('Pizza Social Club', [], [], '07.05.2020')
const offer1 = new offer('Urban Sports Club', ['fitness', 'wellbeing'], 10, 'percent', '01.01.2020', '01.01.2024')

console.log(user1)
console.log(company1)
console.log(offer1)
