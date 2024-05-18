// Тоже самое как в папке books, его рефакторинг
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithID from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = {
	books: [],
	isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
	'book/fetchBook',
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url)
			return res.data
		} catch (error) {
			thunkAPI.dispatch(setError(error.message))

			return thunkAPI.rejectWithValue(error)
			// то-же самое, что и return thunkAPI. rejectWithValue(error)
			// throw error
		}
	}
)

const bookSlice = createSlice({
	name: 'books',
	initialState: initialState,
	reducers: {
		addBook: (state, action) => {
			state.books.push(action.payload)
		},
		delBook: (state, action) => {
			return {
				...state,
				books: state.books.filter(book => book.id !== action.payload),
			}
		},
		clearBook: state => {
			return {
				...state,
				books: [],
			}
		},
		toggleFavorite: (state, action) => {
			state.books.forEach(book => {
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
	// OPTION 1
	extraReducers: {
		[fetchBook.pending]: state => {
			state.isLoadingViaAPI = true
		},
		[fetchBook.fulfilled]: (state, action) => {
			state.isLoadingViaAPI = false
			if (action.payload.titleBook && action.payload.authorBook) {
				state.books.push(createBookWithID(action.payload, 'API'))
			}
		},
		[fetchBook.rejected]: state => {
			state.isLoadingViaAPI = false
		},
	},
	// OPTION 2
	// extraReducers: builder => {
	// 	builder.addCase(fetchBook.pending, state => {
	// 		state.isLoadingViaAPI = true
	// 	})
	// 	builder.addCase(fetchBook.fulfilled, (state, action) => {
	// 		state.isLoadingViaAPI = false

	// 		if (action.payload.titleBook && action.payload.authorBook) {
	// 			state.books.push(createBookWithID(action.payload, 'API'))
	// 		}
	// 	})
	// 	builder.addCase(fetchBook.rejected, (state) => {
	// 		state.isLoadingViaAPI = false

	// 	})
	// },
})

export const { addBook, delBook, toggleFavorite, clearBook } = bookSlice.actions

export const selecBooks = state => state.books.books
export const selectIsLoadingViaAPI = state => state.books.isLoadingViaAPI

export default bookSlice.reducer
