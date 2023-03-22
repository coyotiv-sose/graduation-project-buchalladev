let offerId = 0

class Offer {
  constructor(name, category, discount, typeofDiscount, startOffer, endOffer) {
    this.id = offerId++
    this.name = name
    this.category = category // health, fitness, wellness, beauty, etc
    this.discount = discount // 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
    this.typeofDiscount = typeofDiscount // percent, fixed
    this.startOffer = startOffer // when the offer starts
    this.endOffer = endOffer // when the offer ends
  }
}

module.exports = Offer
