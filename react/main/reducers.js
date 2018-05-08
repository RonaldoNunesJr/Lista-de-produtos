import { combineReducers } from 'redux'
import productReducer from '../product/productReducer'

const rootReducer = combineReducers({
    list: productReducer
})

export default rootReducer