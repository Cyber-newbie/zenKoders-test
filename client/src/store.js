import {
    configureStore
} from '@reduxjs/toolkit'
import rootReducers from './reducers'
const initalState = {}


const store = configureStore({
    reducer: rootReducers,
    preloadedState: initalState
})
export default store