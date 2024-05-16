import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: '',
	author: '',
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
		resetFilter: state => {
			return initialState
		},
	},
})

export const setTitleFilter = filterSlice.actions.setTitleFilter
export const setAuthorFilter = filterSlice.actions.setAuthorFilter
export const resetFilter = filterSlice.actions.resetFilter
// тоже самое, что и вверху
// export const { resetFilter, setTitleFilter } = filterSlice.actions
export const selecTitleFilter = state => state.filter.title
export const selecAuthorFilter = state => state.filter.author

export default filterSlice.reducer
