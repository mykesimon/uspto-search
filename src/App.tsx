import { useState } from 'react';
import { IPatent } from './types/types';
import SearchBar from './components/search-bar/SearchBar';
import PatentList from './components/patent-list/PatentList';

function App() {
	const [patents, setPatents] = useState<IPatent[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<any>('');

	return (
		<>
			<SearchBar
				setPatents={setPatents}
				setLoading={setLoading}
				setError={setError}
			/>

			<PatentList
				patents={patents}
				error={error}
				loading={loading}
			/>
		</>
	);
}

export default App;
