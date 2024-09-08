const person = require('../person')

jest.unmock('../person')

describe('Mocking using external jest.unmock', function () {
	beforeAll(function () {
		jest.restoreAllMocks()
	})

	afterAll(function () {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	it('Result data using person.get', function () {
		const data = person.get()

		expect(person.get).toBeDefined()
		expect(jest.isMockFunction(person.get)).toBeFalsy()
		expect(data).toMatchObject({ name: 'jamal cavalera v1', age: 25, hobby: 'coding' })
	})

	it('Result data using person.set', function () {
		const data = person.set({ name: 'jamal cavalera v1', age: 25, hobby: 'coding' })

		expect(person.set).toBeDefined()
		expect(jest.isMockFunction(person.set)).toBeFalsy()
		expect(data).toMatchObject({ name: 'jamal cavalera v1', age: 25, hobby: 'coding' })
	})
})
