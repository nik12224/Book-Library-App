import * as a from './actionTypes'

export const addBook = newBook => {
	return {
		type: a.ADD_BOOK,
		payload: newBook,
	}
}

export const delBook = id => {
	return {
		type: a.DELETEDE_BOOK,
		payload: id,
	}
}
