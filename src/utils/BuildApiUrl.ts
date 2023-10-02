import { IQueryParams } from '../types/types';

// Function to create the URL with the query params
export function buildApiUrl(baseURL: string, queryParams: IQueryParams): string {
	let constructedApiUrl = baseURL;

	if (typeof queryParams === 'object' && Object.keys(queryParams).length > 0) {
		constructedApiUrl += '?';

		// Loop through the queryParams and append them to constructedApiUrl
		for (const key in queryParams) {
			if (queryParams.hasOwnProperty(key) && queryParams[key] !== '') {
				constructedApiUrl += `${key}=${queryParams[key]}&`;
			}
		}

		// Remove the trailing '&' character
		constructedApiUrl = constructedApiUrl.slice(0, -1);
	}

	return constructedApiUrl;
}
