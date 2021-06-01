const person = require('../person')

describe('Mocking using jest.spyOn function', function () {
	beforeAll(function () {
		jest.restoreAllMocks()
	})

	afterAll(function () {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	it('Result data using mockReturnValue', function () {
		const mockSpy = jest.spyOn(person, 'get')
		mockSpy.mockReturnValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		const data = person.get()

		expect(person.get).toBeDefined()
		expect(jest.isMockFunction(mockSpy)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy.mock.results[0].value).toMatchObject(data)
	})

	it('Result data using mockImplementation', function () {
		const mockSpy = jest.spyOn(person, 'get')
		mockSpy.mockImplementation(() => Promise.resolve({ name: 'john doe', age: 28, hobby: 'swimming' }))

		const data = person.get()

		expect(person.get).toBeDefined()
		expect(jest.isMockFunction(mockSpy)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy.mock.results[0].value).toMatchObject(data)
	})

	it('Result data using mockResolvedValue', async function (done) {
		const mockSpy = jest.spyOn(person, 'set')
		mockSpy.mockResolvedValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		const data = person.set({ name: 'restu wahyu saputra', age: 25, hobby: 'coding' })

		expect(person.set).toBeDefined()
		expect(jest.isMockFunction(mockSpy)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(await person.set({ name: 'john doe', age: 28, hobby: 'swimming' }))
		expect(mockSpy.mock.results[0].value).toMatchObject(data)
		done()
	})
})
