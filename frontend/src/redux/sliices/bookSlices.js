// Тоже самое как в папке books, его рефакторинг
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'

const initialState = []

export const fetchBook = createAsyncThunk('book/fetchBook', async () => {
	const res = await axios.get('http://localhost:3000/andom-book')
	return res.data
})

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
	extraReducers: builder => {
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			if (action.payload.titleBook && action.payload.authorBook) {
				state.push(createBookWithID(action.payload, 'API'))
			}
		})
	},
})

export const { addBook, delBook, toggleFavorite } = bookSlice.actions

export const selecBooks = state => state.books

export default bookSlice.reducer
