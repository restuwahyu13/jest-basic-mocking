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

	it('Result data using mockReturnValue', function () {
		const data = person.get()

		expect(jest.isMockFunction(person.get)).toBeFalsy()
		expect(data).toMatchObject({ name: 'restu wahyu saputra', age: 25, hobby: 'coding' })
	})

	it('Result data using mockResolvedValue', function () {
		const data = person.set({ name: 'restu wahyu saputra', age: 25, hobby: 'coding' })

		expect(jest.isMockFunction(person.set)).toBeFalsy()
		expect(data).toMatchObject({ name: 'restu wahyu saputra', age: 25, hobby: 'coding' })
	})
})
