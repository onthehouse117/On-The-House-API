const buildMongoPriceRange = priceRange =>{
    var price = {}
    if(priceRange.gt){
        price["$gt"] = priceRange.gt
      }

      if(priceRange.gte){
        price["$gte"] = priceRange.gte
      }

      if(priceRange.lt){
        price["$lt"] = priceRange.lt
      }

      if(priceRange.lte){
        price["$lte"] = priceRange.lte
      }
    return price
}

module.exports = {
    buildMongoPriceRange
}