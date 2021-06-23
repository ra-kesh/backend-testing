// Testing Middleware
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

function produceRes(overrides) {
  const res = {
    json: jest.fn(),
    status: jest.fn(),
    ...overrides,
  }
  return res
}

test('responds with 401 for express-jwt UnauthorizedError', () => {
  const req = {}
  const next = jest.fn()
  const res = produceRes()
  const code = 'random_error_code'
  const message = 'random message'
  const error = new UnauthorizedError(code, {message})
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('calls next if header is sent already', () => {
  const req = {}
  const next = jest.fn()
  const res = produceRes({headersSent: true})
  const error = new Error('Some Error')
  errorMiddleware(error, req, res, next)
  expect(next).toHaveBeenCalledWith(error)
  expect(next).toHaveBeenCalledTimes(1)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

test('responds with 500 and the error object', () => {
  const req = {}
  const next = jest.fn()
  const res = produceRes()
  const error = new Error('Some Error')
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
    stack: error.stack,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})
