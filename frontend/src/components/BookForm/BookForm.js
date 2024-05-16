import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook } from '../../redux/sliices/bookSlices'
import createBookWithID from '../../utils/createBookWithID'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
	const [titleBook, setTitle] = useState('')
	const [authorBook, setAuthor] = useState('')
	const dispatch = useDispatch()

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]
		console.log(randomBook)

		dispatch(addBook(createBookWithID(randomBook)))
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (titleBook && authorBook) {
			dispatch(addBook(createBookWithID({ titleBook, authorBook })))
			setTitle('')
			setAuthor('')
		}
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
						onChange={e => setTitle(e.target.value)}
					/>
					<label htmlFor='author'>Author:</label>
					<input
						type='author'
						id='author'
						value={authorBook}
						onChange={e => setAuthor(e.target.value)}
					/>
					<button type='submit'>Add Book</button>
					<button
						type='button'
						onClick={handleAddRandomBook}
					>
						Add Random
					</button>
				</div>
			</form>
		</div>
	)
}

export default BookForm
