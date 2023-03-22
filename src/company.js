let companyId = 0

class Company {
  constructor(name, users, offers, customerSince) {
    this.id = companyId++
    this.name = name
    this.users = users
    this.offers = offers
    this.customerSince = customerSince
  }
  addUser(user) {
    user.company = this
    this.users.push(user)
  }
  removeUser(user) {
    this.users = this.users.filter(u => u !== user)
    user.company = null
  }
  addOffer(offer) {
    offer.company = this
    this.offers.push(offer)
    offers.push(offer)
  }
}


module.exports = Company
