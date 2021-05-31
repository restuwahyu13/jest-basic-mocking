const person = require('../person')

person.set = jest.fn()
person.get = jest.fn()

module.exports = person
