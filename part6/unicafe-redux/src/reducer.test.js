import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }
    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok and bad are incremented', () => {
    const action1 = {
      type: 'OK'
    }
    const action2 = {
      type: 'BAD'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action1)
    deepFreeze(newState)
    const finalState = counterReducer(newState, action2)
    expect(finalState).toEqual({
      good: 0,
      ok: 1,
      bad: 1
    })
  })

  test('stats are reset', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 5,
      ok: 4,
      bad: 2
    }
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('undefined actions return the unedited state', () => {
    const action = {
      type: 'SOMETHING WEIRD'
    }
    const state = {
      good: 5,
      ok: 4,
      bad: 2
    }  
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(state)
  })
})