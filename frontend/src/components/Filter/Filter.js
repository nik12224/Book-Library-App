import { useDispatch, useSelector } from 'react-redux'
import {
	selecTitleFilter,
	setTitleFilter,
	setAuthorFilter,
	setOnlyFavoriteFilter,
	resetFilter,
	selecAuthorFilter,
	selecOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice'
import './Filter.css'

const Filter = () => {
	const dispatch = useDispatch()
	const titleFilter = useSelector(selecTitleFilter)
	const authorFilter = useSelector(selecAuthorFilter)
	const onlyFavoriteFilter = useSelector(selecOnlyFavoriteFilter)

	const handleTtitleFilterChange = e => {
		dispatch(setTitleFilter(e.target.value))
	}

	const handleAuthorFilterChange = e => {
		dispatch(setAuthorFilter(e.target.value))
	}

	const handleOnlyFavoriteFilterChange = () => {
		dispatch(setOnlyFavoriteFilter())
	}

	const handleResetFilters = () => {
		dispatch(resetFilter())
	}
	return (
		<div className='app-block filter'>
			<div className='filter-row'>
				<div className='filter-group'>
					<input
						type='text'
						value={titleFilter}
						placeholder='Filter by title...'
						onChange={handleTtitleFilterChange}
					/>
				</div>
				<div className='filter-group'>
					<input
						type='text'
						value={authorFilter}
						placeholder='Filter by author...'
						onChange={handleAuthorFilterChange}
					/>
				</div>
				<div className='filter-group'>
					<label>
						<input
							type='checkbox'
							checked={onlyFavoriteFilter}
							onChange={handleOnlyFavoriteFilterChange}
						/>
						Only Favorite
					</label>
				</div>
				<button
					type='button'
					onClick={handleResetFilters}
				>
					Reset Filters
				</button>
			</div>
		</div>
	)
}

export default Filter
