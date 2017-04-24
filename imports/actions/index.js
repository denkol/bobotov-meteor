import { Accounts } from 'meteor/accounts-base'

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

/**
* Auth actions
*/
export const login = payload =>
  new Promise((resolve, reject) => {
    switch (payload.type) {
      case 'Password':
        Meteor.loginWithPassword(payload.email, payload.password, (err, res) => {
          if (err) {
            return reject('Incorrect email or password')
          }
          return resolve(res)
        })
        break
      default:
        Meteor[`loginWith${payload.type}`](payload, (err, res) => {
          if (err) {
            return reject(`Incorrect ${payload.type} account`)
          }
          return resolve(res)
        })
        break
    }
  })

export const signup = data =>
  new Promise((resolve, reject) => {
    Accounts.createUser(data, (err, res) => {
      if (err) {
        return reject(err.message)
      }
      alertify.success('SignUp successfully')
      return resolve(res)
    })
  })

export const forgotPassword = ({ email }) =>
  new Promise((resolve, reject) => {
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        return reject(err.message)
      }
      return resolve('We sent you an email with instructions for reseting your password')
    })
  })

export const resetPassword = ({ token, password, confirmPassword }) =>
  new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      const error = 'Password and it\'s confirmation are not matching'
      return reject(error)
    }
    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        return reject(err.message)
      }
      const message = 'You successfully changed your password'
      return resolve(message)
    })
  })

export const changePassword = ({ oldPassword, password }) =>
  new Promise((resolve, reject) => {
    Accounts.changePassword(oldPassword, password, (err) => {
      if (err) {
        return reject(err.message)
      }
      const message = 'You successfully changed your password'
      return resolve(message)
    })
  })

export const logout = done =>
  Meteor.logout(err => done(err))
