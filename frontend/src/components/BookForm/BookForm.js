import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addBook } from '../../redux/books/actionCreators'
import booksData from '../../data/books.json'
import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const dispatch = useDispatch()

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)
		const randomBook = booksData[randomIndex]
		console.log(randomBook)

		const randomBookWithID = {
			...randomBook,
			id: uuidv4(),
			isFavorite: false,
		}

		dispatch(addBook(randomBookWithID))
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
			const book = {
				titleBook: title,
				authorBook: author,
				id: uuidv4(),
				isFavorite: false,
			}
			dispatch(addBook(book))
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
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<label htmlFor='author'>Author:</label>
					<input
						type='author'
						id='author'
						value={author}
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
