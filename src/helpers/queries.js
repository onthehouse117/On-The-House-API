const buildFieldOptions = body =>{
    var fieldOptions = {}

    if(body.community){
      fieldOptions.community = req.body.community
    }
    if(body.author){
      fieldOptions.author = req.body.author
    }
    if(body.priceRange){
      fieldOptions.price = buildMongoPriceRange(req.body.priceRange)
    }

  return fieldOptions
}

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
    buildFieldOptions
}