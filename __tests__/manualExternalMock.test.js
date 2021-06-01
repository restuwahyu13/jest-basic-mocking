const person = require('../__mocks__/personMocks')

jest.setMock('../__mocks__/personMocks')

describe('Mocking using external jest.mock', function () {
	beforeAll(function () {
		jest.restoreAllMocks()
	})

	afterAll(function () {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	it('Result data using mockReturnValue', function () {
		person.get.mockReturnValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		const data = person.get()

		expect(person.get).toBeDefined()
		expect(jest.isMockFunction(person.get)).toBeTruthy()
		expect(person.get).toHaveBeenCalled()
		expect(person.get).toHaveBeenCalledTimes(1)
		expect(person.get.mock.results[0].value).toMatchObject(data)
	})

	it('Result data using mockImplementation', function () {
		person.get.mockImplementation(() => Promise.resolve({ name: 'john doe', age: 28, hobby: 'swimming' }))

		const data = person.get()

		expect(person.get).toBeDefined()
		expect(jest.isMockFunction(person.get)).toBeTruthy()
		expect(person.get).toHaveBeenCalled()
		expect(person.get).toHaveBeenCalledTimes(1)
		expect(person.get.mock.results[0].value).toMatchObject(data)
	})

	it('Result data using mockResolvedValue', async function (done) {
		person.set.mockResolvedValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		const data = person.set({ name: 'restu wahyu saputra', age: 25, hobby: 'coding' })

		expect(person.set).toBeDefined()
		expect(jest.isMockFunction(person.set)).toBeTruthy()
		expect(person.set).toHaveBeenCalled()
		expect(person.set).toHaveBeenCalledTimes(1)
		expect(person.set).toHaveBeenCalledWith(await person.set({ name: 'john doe', age: 28, hobby: 'swimming' }))
		expect(person.set.mock.results[0].value).toMatchObject(data)
		done()
	})
})
