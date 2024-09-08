const person = require('../person')

describe('Mocking using jest.spyOn and mockRestore function', function () {
	beforeAll(function () {
		jest.restoreAllMocks()
	})

	afterAll(function () {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	it('Result data using mockReturnValue and mockRestore', async function (done) {
		const mockSpy = jest.spyOn(person, 'get')
		mockSpy.mockReturnValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		let afterMockValue = person.get()
		expect(person.get).toBeDefined()
		expect(afterMockValue).toMatchObject({ name: 'john doe', age: 28, hobby: 'swimming' })

		mockSpy.mockRestore()
		const beforeMockValue = person.get()

		expect(person.get).toBeDefined()
		expect(jest.isMockFunction(mockSpy)).toBeTruthy()
		expect(beforeMockValue).toMatchObject({ name: 'max cavalera', age: 25, hobby: 'coding' })
		done()
	})
})
