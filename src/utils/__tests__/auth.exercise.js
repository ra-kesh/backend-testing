// Testing Pure Functions
import {isPasswordAllowed} from '../auth'

const allowedPasswords = ['!aBc123']

const notAllowedPasswords = [
  'a2c!',
  '123456!',
  'ABCdef!',
  'abc123!',
  'ABC123!',
  'ABCdef123',
]

allowedPasswords.forEach((password) => {
  test(`allows ${password}`, () => {
    expect(isPasswordAllowed(password)).toBe(true)
  })
})

notAllowedPasswords.forEach((password) => {
  test(`not allows ${password}`, () => {
    expect(isPasswordAllowed(password)).toBe(false)
  })
})

// test('isPasswordAllowed returns true for valid passwords', () => {
//   expect(isPasswordAllowed('!aBc123')).toBe(true)
// })

// test('isPasswordAllowed returns false for invalid passwords', () => {
//   expect(isPasswordAllowed('a2c!')).toBe(false)
//   expect(isPasswordAllowed('123456!')).toBe(false)
//   expect(isPasswordAllowed('ABCdef!')).toBe(false)
//   expect(isPasswordAllowed('abc123!')).toBe(false)
//   expect(isPasswordAllowed('ABC123!')).toBe(false)
//   expect(isPasswordAllowed('ABCdef123')).toBe(false)
// })
