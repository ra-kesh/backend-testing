// Testing Middleware
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

test('responds with 401 for express-jwt UnauthorizedError', () => {
  const req = {}
  const next = jest.fn()
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  const error = new UnauthorizedError('random_error_code', {
    message: 'random message',
  })
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.json).toHaveBeenCalledWith({
    code: 'random_error_code',
    message: 'random message',
  })
})

// 🐨 you'll need both of these:
// import {UnauthorizedError} from 'express-jwt'
// import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
// 💰 const error = new UnauthorizedError('some_error_code', {message: 'Some message'})
// 💰 const res = {json: jest.fn(() => res), status: jest.fn(() => res)}

// 🐨 Write a test for the headersSent case

// 🐨 Write a test for the else case (responds with a 500)
