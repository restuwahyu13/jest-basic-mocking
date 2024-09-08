const person = {
	set: (data) => data,
	get: function () {
		return {
			name: 'max cavalera',
			age: 25,
			hobby: 'coding'
		}
	}
}

module.exports = person
