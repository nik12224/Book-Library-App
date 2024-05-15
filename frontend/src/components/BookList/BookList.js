import { useSelector, useDispatch } from 'react-redux'
import { delBook } from '../../redux/books/actionCreators'
import './BookList.css'

const BookList = () => {
	const books = useSelector(state => state.books)
	const dispatch = useDispatch()

	const handleDeleteBook = id => {
		dispatch(delBook(id))
	}

	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{books.map((book, i) => {
						return (
							<li key={book.id}>
								<div className='book-info'>
									{++i}. {book.titleBook} by <strong>{book.authorBook}</strong>
								</div>
								<div className='book-actions'>
									<button onClick={() => handleDeleteBook(book.id)}>
										Delete
									</button>
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default BookList
