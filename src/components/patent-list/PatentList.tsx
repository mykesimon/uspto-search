import Loader from '../../components/loader/Loader';
import ErrorMessage from '../error-message/ErrorMessage';
import PatentRowItem from '../patent-row-item/PatentRowItem';

import { IPatent } from '../../types/types';

import classes from './PatentList.module.css';

interface PatentListProps {
	patents: IPatent[];
	loading: boolean;
	error: string;
}

const PatentList = ({ patents, loading, error }: PatentListProps) => {
	return (
		<main className={classes.searchResults}>
			<h2>Patent list</h2>

			{loading && <Loader />}

			{error && <ErrorMessage error={error} />}

			{patents && patents.length > 0 && (
				<table className={classes.PatentListTable}>
					<thead>
						<tr>
							<th>Patent Application Number</th>
							<th>Publication Date</th>
							<th>Filing Date</th>
							<th>Publication Document Identifier</th>
							<th>Invention Subject Matter Category</th>
						</tr>
					</thead>
					<tbody>
						{patents.map((patent: IPatent, idx: number) => (
							<PatentRowItem
								key={idx}
								patent={patent}
							/>
						))}
					</tbody>
				</table>
			)}
		</main>
	);
};

export default PatentList;
