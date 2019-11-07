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

const buildFilterOptions = body =>{
  var filters = {}

  if(body.sortBy){
    filters.sort = {}
    for(option of Object.keys(body.sortBy)){
      filters.sort[option] = body.sortBy[option] === 'asc' ? 1 : -1
    }
  }
  if(body.limit){
    filters.limit = body.limit
  }
  if(body.skip){
    filters.skip = body.skip
  }

  return filters
}

module.exports = {
    buildFieldOptions,
    buildFilterOptions
}