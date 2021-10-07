const palindrome = require('../utils/for_testing').palindrome

//test(description, functions defined the functionality for the test case)
test('palindrome of a', () => {
  const result = palindrome('a')
  expect(result).toBe('a')
  //   expect(result).toBe(1)

})

test('palindrome of react', () => {
  const result = palindrome('react')
  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')
  expect(result).toBe('releveler')
})