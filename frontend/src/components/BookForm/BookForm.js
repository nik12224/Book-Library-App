import { useState } from 'react'
import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {
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
				</div>
			</form>
		</div>
	)
}

export default BookForm
