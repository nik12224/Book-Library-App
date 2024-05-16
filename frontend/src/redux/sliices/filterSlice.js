import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	title: '',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialState,
	reducers: {
		setTitleFilter: (state, action) => {
			state.title = action.payload
		},
		resetFilter: state => {
			return initialState
		},
	},
})

export const setTitleFilter = filterSlice.actions.setTitleFilter
export const resetFilter = filterSlice.actions.resetFilter
// тоже самое, что и вверху
// export const { resetFilter, setTitleFilter } = filterSlice.actions
export const selecTitleFilter = state => state.filter.title

export default filterSlice.reducer
