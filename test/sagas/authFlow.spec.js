import { expect } from 'chai'
import { callApi, watchLogin } from '../../client/scripts/redux/sagas/auth'
import { api } from '../../client/scripts/services'
import { login } from '../../client/scripts/redux/actions/auth'
import { put, call, take } from 'redux-saga/effects'

describe('Auth Flow', () => {
  it('should return LOGIN_FAIL action', () => {
    const action = { data: { username: 'me@me.com' } }
    const generator = callApi(login, api.login, action)

    expect(generator.next().value).to.deep.equal(call(api.login, action))

    expect(generator.throw('login failed').value
    ).to.deep.equal(
      put({
        type: 'LOGIN_FAILURE',
        error: 'login failed',
      })
    )
  })

  it('should return LOGIN_SUCCESS action', () => {
    const action = { data: { username: 'me' } }
    const response = { token: '12345' }
    const generator = watchLogin(true)

    expect(generator.next().value).to.deep.equal(take('LOGIN_REQUEST'))
    expect(generator.next(action).value).to.deep.equal(call(callApi, login, api.login, action.data))
    expect(generator.next(response).value).to.deep.equal(put({
      type: 'LOGIN_SUCCESS',
      response,
    }))
  })
})