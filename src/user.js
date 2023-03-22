
let userId = 0;
class User {
  constructor(name, email, company, offers, memberSince, userRole, gender) {
    this.id = userId++
    this.name = name
    this.email = email
    this.gender = gender
    this.company = company // company that the user is from
    this.offers = offers // offers that the user can see
    this.memberSince = memberSince // member since When
    this.userRole = userRole // admin, user
  }
}

module.exports = User
