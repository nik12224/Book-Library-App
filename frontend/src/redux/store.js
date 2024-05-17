import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './sliices/bookSlices'
import filterReducer from './sliices/filterSlice'
import errorReducer from './sliices/errorSlice'

const store = configureStore({
	reducer: {
		books: booksReducer,
		filter: filterReducer,
		erorr: errorReducer,
	},
})

export default store
