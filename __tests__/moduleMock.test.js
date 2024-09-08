const axios = require('axios')

jest.mock('axios')

describe('Mocking using external jest.mock with node_modules', function () {
	beforeAll(function () {
		jest.restoreAllMocks()
	})

	afterAll(function () {
		jest.clearAllMocks()
		jest.resetAllMocks()
	})

	it('Result data using mockReturnValue', async function (done) {
		axios.get.mockReturnValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		const data = await axios.get('https://jsonplaceholder.typicode.com/users/1')

		expect(axios.get).toBeDefined()
		expect(jest.isMockFunction(axios.get)).toBeTruthy()
		expect(axios.get).toHaveBeenCalled()
		expect(axios.get).toHaveBeenCalledTimes(1)
		expect(axios.get.mock.results[0].value).toMatchObject(data)
		done()
	})

	it('Result data using mockImplementation', async function (done) {
		axios.get.mockImplementation(() => Promise.resolve({ name: 'john doe', age: 28, hobby: 'swimming' }))

		// if you use mockImplementation you can't use await because it is already a promise
		const data = axios.get('https://jsonplaceholder.typicode.com/users/1')

		expect(axios.get).toBeDefined()
		expect(jest.isMockFunction(axios.get)).toBeTruthy()
		expect(axios.get).toHaveBeenCalled()
		expect(axios.get).toHaveBeenCalledTimes(1)
		expect(axios.get.mock.results[0].value).toMatchObject(data)
		done()
	})

	it('Result data using mockResolvedValue', async function (done) {
		axios.post.mockResolvedValue({ name: 'john doe', age: 28, hobby: 'swimming' })

		// if you use mockResolvedValue you can't use await because it is already a promise
		const data = axios.post('https://jsonplaceholder.typicode.com/users/1', {
			name: 'max cavalera',
			age: 25,
			hobby: 'coding'
		})

		expect(axios.post).toBeDefined()
		expect(jest.isMockFunction(axios.post)).toBeTruthy()
		expect(axios.post).toHaveBeenCalled()
		expect(axios.post).toHaveBeenCalledTimes(1)
		expect(axios.post).toHaveBeenCalledWith(await axios.post({ name: 'john doe', age: 28, hobby: 'swimming' }))
		expect(axios.post.mock.results[0].value).toMatchObject(data)
		done()
	})
})
