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

const user = {
  name: 'John Doe',
  email: 'testøasd.de',
  company: 'company',
  offers: [offers],
  memberSince: '01.01.2020',
  userRole: 'admin', // admin, user
}

const offer1 = {
  name: 'offer 1',
  category: 'health',
  discount: 10,
  typeofDiscount: 'percent',
  startOffer: '01.01.2020',
  endOffer: '01.01.2024',
}

const company = {
  name: 'company',
  users: [user],
  offers: [offer1],
  customerSince: '01.01.2020',
}
