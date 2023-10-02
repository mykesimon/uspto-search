export interface IQueryParams {
	[key: string];
	searchText: string;
	publicationFromDate?: string;
	publicationToDate?: string;
}

export interface IPatent {
	inventionSubjectMatterCategory: string;
	inventionSubjectMatterCategory: string;
	patentApplicationNumber: string;
	filingDate: string;
	mainCPCSymbolText: string | null;
	furtherCPCSymbolArrayText: string | null;
	inventorNameArrayText: string | null;
	abstractText: string[];
	assigneeEntityName: string | null;
	assigneePostalAddressText: string | null;
	inventionTitle: string;
	filelocationURI: string;
	archiveURI: string;
	claimText: string[];
	descriptionText: string[];
	publicationDate: string;
	publicationDocumentIdentifier: string;
}

export interface IPatents {
	recordTotalQuantity: number;
	results: IPatent[];
}
