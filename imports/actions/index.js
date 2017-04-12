
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
      const priceRange = {}
      if (filters.priceFrom) {
        priceRange['$gte'] = Number(filters.priceFrom.replace(/\s/g, ''))
      }
      if (filters.priceTo) {
        priceRange['$lte'] = Number(filters.priceTo.replace(/\s/g, ''))
      }
      selector['listeningInfo.price'] = priceRange
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
