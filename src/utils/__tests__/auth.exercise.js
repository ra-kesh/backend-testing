// Testing Pure Functions
import cases from 'jest-in-case'
import {isPasswordAllowed} from '../auth'

function casify(obj) {
  return Object.entries(obj).map(([name, password]) => ({
    name: `${password}-${name}`,
    password,
  }))
}

cases(
  `isPasswordAllowed:valid passwords`,
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(true)
  },
  casify({'valid Password': '!aBc123'}),
)
cases(
  `isPasswordAllowed: invalid passwords`,
  (options) => {
    expect(isPasswordAllowed(options.password)).toBe(false)
  },
  casify({
    'too short': 'a2c!',
    'no letters': '123456!',
    'no numbers': 'ABCdef!',
    'no uppercase letters': 'abc123!',
    'no lowercase letters': 'ABC123!',
    'no non-alphanumeric characters': 'ABCdef123',
  }),
)
