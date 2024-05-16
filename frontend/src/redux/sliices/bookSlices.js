// Тоже самое как в папке books, его рефакторинг
import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const bookSlice = createSlice({
	name: 'books',
	initialState: initialState,
	reducers: {
		addBook: (state, action) => {
			state.push(action.payload)
		},
		delBook: (state, action) => {
			return state.filter(book => book.id !== action.payload)
		},
		toggleFavorite: (state, action) => {
			state.forEach(book => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite
				}
			})
			// Можно так как ниже
			// return state.map(book =>
			// 	book.id === action.payload
			// 		? { ...book, isFavorite: !book.isFavorite }
			// 		: book
			// )
		},
	},
})

export const { addBook, delBook, toggleFavorite } = bookSlice.actions

export const selecBooks = state => state.books

export default bookSlice.reducer
