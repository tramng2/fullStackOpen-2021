const average = require('../utils/for_testing').average

describe('average', () => {
  test('of value is itself', () => {
    expect(average([1])).toBe(1)
  })
  test('of many is calculated right', () => {
    expect(average([1,2,3,4,5])).toBe(3)
  })

})