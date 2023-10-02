import express from 'express';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
	rejectUnauthorized: false,
});

const app = express();
const port = process.env.PORT || 5008;
const apiUrlEndpoint = `https://developer.uspto.gov/ibd-api/v1/application/publications`;

// Function to create the URL with the query params
function buildApiUrl(baseURL, queryParams) {
	let apiUrl = baseURL;

	if (typeof queryParams === 'object' && Object.keys(queryParams).length > 0) {
		apiUrl += '?';

		for (const key in queryParams) {
			if (queryParams.hasOwnProperty(key) && queryParams[key] !== '') {
				apiUrl += `${key}=${queryParams[key]}&`;
			}
		}

		apiUrl = apiUrl.slice(0, -1);
	}

	return apiUrl;
}

app.get('/api', async (req, res) => {
	try {
		const apiUrl = buildApiUrl(apiUrlEndpoint, req.query);

		// Make a request to the external API
		const response = await axios.get(apiUrl, {
			httpsAgent: agent,
		});

		// Send the data from the external API as the response
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching data from the external API:', error);
		res.status(500).json({ error: 'An error occurred while fetching data.' });
	}
});

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
