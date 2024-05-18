import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import {
	addBook,
	fetchBook,
	selectIsLoadingViaAPI,
} from '../../redux/slices/bookSlices'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
	const [titleBook, setTitleBook] = useState('')
	const [authorBook, setAuthorBook] = useState('')
	const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI)
	const dispatch = useDispatch()

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]
		console.log(randomBook)

		dispatch(addBook(createBookWithID(randomBook, 'random')))
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (titleBook && authorBook) {
			dispatch(addBook(createBookWithID({ titleBook, authorBook }, 'manual')))
			setTitleBook('')
			setAuthorBook('')
		} else {
			dispatch(setError('You must fill title and author!'))
		}
	}

	const handleAddRandomBookViaAPI = () => {
		dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
	}

	return (
		<div className='app-block book-form'>
			<h2>Add a new Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title:</label>
					<input
						type='text'
						id='title'
						value={titleBook}
						onChange={e => setTitleBook(e.target.value)}
					/>
					<label htmlFor='author'>Author:</label>
					<input
						type='text'
						id='author'
						value={authorBook}
						onChange={e => setAuthorBook(e.target.value)}
					/>
					<button type='submit'>Add Book</button>
					<button
						type='button'
						onClick={handleAddRandomBook}
					>
						Add Random
					</button>
					<button
						type='button'
						onClick={handleAddRandomBookViaAPI}
						disabled={isLoadingViaAPI}
					>
						{isLoadingViaAPI ? (
							<>
								<span>Loading book...</span>
								<FaSpinner className='spinner' />
							</>
						) : (
							'Add Random via API'
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
