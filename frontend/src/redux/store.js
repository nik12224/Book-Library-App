import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './sliices/bookSlices'
import filterReducer from './sliices/filterSlice'

const store = configureStore({
	reducer: {
		books: booksReducer,
		filter: filterReducer,
	},
})

export default store
