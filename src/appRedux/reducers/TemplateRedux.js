import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    templateRequest: ['data'],
    templateSuccess: ['payload'],
    templateFailure: null
})

export const TemplateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    data: null,
    fetching: null,
    payload: [],
    error: null
})

/* ------------- Selectors ------------- */

export const TemplateSelectors = {
    getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
    state.merge({ fetching: true, data })

// successful api lookup
export const success = (state, action) => {
    const { payload } = action
    return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
    state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TEMPLATE_REQUEST]: request,
    [Types.TEMPLATE_SUCCESS]: success,
    [Types.TEMPLATE_FAILURE]: failure
})
