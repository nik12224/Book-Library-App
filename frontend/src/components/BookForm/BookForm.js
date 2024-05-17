import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook, fetchBook } from '../../redux/slices/bookSlices'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
	const [titleBook, setTitleBook] = useState('')
	const [authorBook, setAuthorBook] = useState('')
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
					>
						Add Random via API
					</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
