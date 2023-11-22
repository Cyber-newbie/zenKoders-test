import {
    combineReducers
} from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import subsReducer from './subsReducer'
import newsReducer from './newsReducer'
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    subscription: subsReducer,
    news: newsReducer
})