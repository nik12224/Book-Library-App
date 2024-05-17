import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: '',
	author: '',
	onlyFavorite: false,
}

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialState,
	reducers: {
		setTitleFilter: (state, action) => {
			state.title = action.payload
		},
		setAuthorFilter: (state, action) => {
			state.author = action.payload
		},
		setOnlyFavoriteFilter: state => {
			state.onlyFavorite = !state.onlyFavorite
		},
		resetFilter: state => {
			return initialState
		},
	},
})

// export const setTitleFilter = filterSlice.actions.setTitleFilter
// export const setAuthorFilter = filterSlice.actions.setAuthorFilter
// export const resetFilter = filterSlice.actions.resetFilter
// export const setOnlyFavoriteFilter = filterSlice.actions.setOnlyFavorite

// тоже самое, что и вверху
export const {
	resetFilter,
	setTitleFilter,
	setOnlyFavoriteFilter,
	setAuthorFilter,
} = filterSlice.actions
export const selecTitleFilter = state => state.filter.title
export const selecAuthorFilter = state => state.filter.author
export const selecOnlyFavoriteFilter = state => state.filter.onlyFavorite

export default filterSlice.reducer
