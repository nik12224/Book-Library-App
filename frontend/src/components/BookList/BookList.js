import { useSelector, useDispatch } from 'react-redux'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import { delBook, toggleFavorite } from '../../redux/books/actionCreators'
import {
	selecTitleFilter,
	selecAuthorFilter,
	selecOnlyFavoriteFilter,
} from '../../redux/sliices/filterSlice'
import './BookList.css'

const BookList = () => {
	const books = useSelector(state => state.books)
	const titleFilter = useSelector(selecTitleFilter)
	const autorFilter = useSelector(selecAuthorFilter)
	const onlyFavoriteFilter = useSelector(selecOnlyFavoriteFilter)
	const dispatch = useDispatch()

	const handleDeleteBook = id => {
		dispatch(delBook(id))
	}

	const handleToggleFavorite = id => {
		dispatch(toggleFavorite(id))
	}

	const filteredBooks = books.filter(book => {
		const matchesTitle = book.titleBook
			.toLowerCase()
			.includes(titleFilter.toLowerCase())
		const matchesAuthor = book.authorBook
			.toLowerCase()
			.includes(autorFilter.toLowerCase())
		const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
		return matchesTitle && matchesAuthor && matchesFavorite
	})

	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filteredBooks.map((book, i) => {
						return (
							<li key={book.id}>
								<div className='book-info'>
									{++i}. {book.titleBook} by <strong>{book.authorBook}</strong>
								</div>
								<div className='book-actions'>
									<span onClick={() => handleToggleFavorite(book.id)}>
										{book.isFavorite ? (
											<BsBookmarkStarFill className='star-icon' />
										) : (
											<BsBookmarkStar className='star-icon' />
										)}
									</span>
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
