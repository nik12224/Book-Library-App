// Тоже самое как в папке books, его рефакторинг
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'

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

export const thunkFunction = async (dispatch, getState) => {
	try {
		const res = await axios.get('http://localhost:4000/random-book')
		if (res?.data?.titleBook && res?.data?.authorBook) {
			dispatch(addBook(createBookWithID(res.data, 'API')))
		}
	} catch (error) {
		console.log('Error fetching random book', error)
	}
}
export const selecBooks = state => state.books

export default bookSlice.reducer
