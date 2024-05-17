import { useSelector, useDispatch } from 'react-redux'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import {
	delBook,
	toggleFavorite,
	selecBooks,
} from '../../redux/slices/bookSlices'
import {
	selecTitleFilter,
	selecAuthorFilter,
	selecOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice'
import './BookList.css'

const BookList = () => {
	const books = useSelector(selecBooks)
	const titleFilter = useSelector(selecTitleFilter)
	const authorFilter = useSelector(selecAuthorFilter)
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
			.includes(authorFilter.toLowerCase())
		const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
		return matchesTitle && matchesAuthor && matchesFavorite
	})

	const highlightMatch = (text, filter) => {
		if (!filter) return text

		const regex = new RegExp(`(${filter})`, 'gi')
		return text.split(regex).map((substring, i) => {
			if (substring.toLowerCase() === filter.toLowerCase()) {
				return (
					<span
						key={i}
						className='highlight'
					>
						{substring}
					</span>
				)
			}
			return substring
		})
	}
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
									{++i}. {highlightMatch(book.titleBook, titleFilter)} by{' '}
									<strong>
										{highlightMatch(book.authorBook, authorFilter)}
									</strong>{' '}
									({book.source})
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
