import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { buildApiUrl } from '../../utils/BuildApiUrl';

import { IPatent, IQueryParams } from '../../types/types';
import { SearchBarProps } from './types';
import { ERROR_LIST } from '../../utils/ErrorsList';

import classes from './SearchBar.module.css';

const SearchBar = ({ setPatents, setLoading, setError }: SearchBarProps) => {
	// This will check if there are query params in the URL on loading page
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchTextParam = queryParams.get('searchText') || '';
	const fromDateParam = queryParams.get('publicationFromDate') || '';
	const toDateParam = queryParams.get('publicationToDate') || '';

	// Set the query params with the URL params value or default values
	const [searchText, setSearchText] = useState<string>(searchTextParam);
	const [publicationFromDate, setPublicationFromDate] = useState<string>(fromDateParam);
	const [publicationToDate, setPublicationToDate] = useState<string>(toDateParam);

	// This is to keep a record of the previous params so that we don't
	// run the search if the query is the same
	const [prevSearchQuery, setPrevSearchQuery] = useState<IQueryParams>({
		searchText: '',
		publicationFromDate: '',
		publicationToDate: '',
	});

	// Fetch Patents function
	const fetchPatents = async (): Promise<IPatent[] | any> => {
		const apiUrlWithQuery = buildApiUrl('/api', { searchText, publicationFromDate, publicationToDate });

		setError(ERROR_LIST.reset);
		setPatents([]);

		try {
			const response = await fetch(apiUrlWithQuery);
			if (!response.ok) {
				setError(ERROR_LIST.network);
				throw new Error(ERROR_LIST.network);
			}
			const { results }: { results: IPatent[] } = await response.json();

			if (results.length === 0) {
				setError(ERROR_LIST.noResultsFound);
			}

			setPatents(results);
			setLoading(false);
		} catch (error: any) {
			setPatents([]);
			setError(error.message);
			setLoading(false);
		}
	};

	// On form submit fetch the patents with the query params
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// If the search has the same query params, do not make the any API request
		if (searchText === prevSearchQuery.searchText && publicationFromDate === prevSearchQuery.publicationFromDate && publicationToDate === prevSearchQuery.publicationToDate && searchText.trim() !== '') {
			return;
		}

		setLoading(true);
		setError(ERROR_LIST.reset);

		if (searchText.trim() !== '') {
			window.history.pushState({}, '', `${buildApiUrl('', { searchText, publicationFromDate, publicationToDate }).toString()}`);

			await fetchPatents();
			const newQuery = {
				searchText,
				publicationFromDate,
				publicationToDate,
			};
			setPrevSearchQuery(newQuery);
		} else {
			setPatents([]);
			setSearchText('');
			setLoading(false);
			setError(ERROR_LIST.emptyValue);
		}
	};

	// This is used to fetch the patents on when the component mount if there are query params in the URL
	useEffect(() => {
		const hasQueryParams = searchTextParam || fromDateParam || toDateParam;
		if (hasQueryParams) {
			setLoading(true);
			fetchPatents();
		}
	}, []);

	return (
		<header className={classes.searchBar}>
			<div className={classes.innerContainer}>
				<h1>Search for a patent</h1>
				<form
					className={classes.form}
					onSubmit={handleSubmit}
				>
					<div className={classes.inputContainer}>
						<label htmlFor='search-text'>Search for a patent</label>
						<div className={classes.searchContainer}>
							<FiSearch className={classes.searchIcon} />
							<input
								type='search'
								name='search-text'
								id='search-text'
								placeholder='Seach for a patent'
								value={searchText}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value)}
							/>
						</div>
					</div>
					<div className={classes.inputContainer}>
						<label htmlFor='publication-from-date'>Publication from date</label>
						<input
							type='date'
							name='publication-from-date'
							id='publication-from-date'
							value={publicationFromDate}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPublicationFromDate(event.target.value)}
						/>
					</div>
					<div className={classes.inputContainer}>
						<label htmlFor='publication-to-date'>Publication to date</label>
						<input
							type='date'
							name='publication-to-date'
							id='publication-to-date'
							value={publicationToDate}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPublicationToDate(event.target.value)}
						/>
					</div>
					<button
						role='button'
						className={classes.submitBtn}
						type='submit'
					>
						Find panent
					</button>
				</form>
			</div>
		</header>
	);
};

export default SearchBar;
