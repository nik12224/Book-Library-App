import { useDispatch, useSelector } from 'react-redux'
import {
	selecTitleFilter,
	setTitleFilter,
	resetFilter,
} from '../../redux/sliices/filterSlice'
import './Filter.css'

const Filter = () => {
	const dispatch = useDispatch()
	const titleFilter = useSelector(selecTitleFilter)

	const handleTtitleFilterChange = e => {
		dispatch(setTitleFilter(e.target.value))
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
					<button
						type='button'
						onClick={handleResetFilters}
					>
						Reset Filters
					</button>
				</div>
			</div>
		</div>
	)
}

export default Filter
