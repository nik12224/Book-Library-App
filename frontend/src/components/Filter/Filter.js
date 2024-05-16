import { useDispatch, useSelector } from 'react-redux'
import {
	selecTitleFilter,
	setTitleFilter,
	setAuthorFilter,
	resetFilter,
	selecAuthorFilter,
} from '../../redux/sliices/filterSlice'
import './Filter.css'

const Filter = () => {
	const dispatch = useDispatch()
	const titleFilter = useSelector(selecTitleFilter)
	const authorFilter = useSelector(selecAuthorFilter)

	const handleTtitleFilterChange = e => {
		dispatch(setTitleFilter(e.target.value))
	}

	const handleAuthorFilterChange = e => {
		dispatch(setAuthorFilter(e.target.value))
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
