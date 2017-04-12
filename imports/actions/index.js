
export const listeningsFilter = (filters) => {
  const selector = {}
  const options = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'bathrooms') {
      if (value) {
        selector['listeningInfo.bathrooms'] = Number(value)
      }
    } else if (key === 'bedrooms') {
      if (value) {
        selector['listeningInfo.bedrooms'] = Number(value)
      }
    } else if (key === 'city') {
      if (value) {
        selector['listeningInfo.city'] = value
      }
    } else if (key === 'priceFrom' || key === 'priceTo') {
      if (value) {
        if (!selector['listeningInfo.price']) {
          selector['listeningInfo.price'] = {}
        }
        selector['listeningInfo.price']['$gte'] = Number(filters.priceFrom.replace(/\s/g, ''))
      }
    } else if (key === 'priceTo') {
      if (value) {
        if (!selector['listeningInfo.price']) {
          selector['listeningInfo.price'] = {}
        }
        selector['listeningInfo.price']['$lte'] = Number(filters.priceTo.replace(/\s/g, ''))
      }
    } else if (key === 'typeDeal') {
      if (value) {
        selector['listeningInfo.typeDeal'] = value.replace(/\s/g, '')
      }
    } else if (key === 'typeProperty') {
      if (value) {
        selector['listeningInfo.typeProperty'] = value.replace(/\s/g, '')
      }
    } else {
      if (value) {
        selector[key] = value
      }
    }
  })

  return { selector, options }
}

export const filterToQuery = (data = []) => {
  const queryParams = {}

  data.forEach((value, key) => {
    if (value.city) {
      queryParams.city = value.city
    } else if (value.typeDeal) {
      queryParams.typeDeal = value.typeDeal
    } else if (value.typeProperty) {
      queryParams.typeProperty = value.typeProperty
    } else if (value.price) {
      if (value.price.from) {
        queryParams.priceFrom = value.price.from
      }
      if (value.price.to) {
        queryParams.priceTo = value.price.to
      }
    }
  })

  return queryParams
}
