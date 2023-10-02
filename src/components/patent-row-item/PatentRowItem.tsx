import { IPatent } from '../../types/types';

import classes from './PatentRowItem.module.css';

const PatentRowItem = ({ patent }: { patent: IPatent }) => {
	return (
		<tr>
			<td>{patent.patentApplicationNumber}</td>
			<td>{patent.publicationDate}</td>
			<td>{patent.filingDate}</td>
			<td>{patent.publicationDocumentIdentifier}</td>
			<td>
				<span className={classes.label}>{patent.inventionSubjectMatterCategory}</span>
			</td>
		</tr>
	);
};

export default PatentRowItem;
