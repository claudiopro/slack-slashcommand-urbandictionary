// src/createShortUrls.js
const urban = require("urban");

const createErrorDescription = (code, err) => {
	switch (code) {
		case 400:
			return "Bad Request";
		case 401:
			return "Unauthorized: Be sure you configured the integration to use a valid API key";
		case 403:
			return `Invalid request: ${err.source} ${err.message}`;
		case 404:
			return `Not found: ${err.source} ${err.message}`;
		case 503:
			return `Short URL service currently under maintenance. Retry later`;
		default:
			return `Unexpected error connecting to Rebrandly APIs`;
	}
};

const createError = (term, error) => {
	// const errorDescription = createErrorDescription(
	// 	err.statusCode,
	// 	JSON.parse(err.body)
	// );
	const errorDescription = error;
	return new Error(`Cannot look up "${term}": ${errorDescription}`);
};

const createUrbanFactory = () => term =>
	new Promise((resolve, reject) => {
		urban(term).first(response => {
			if (response.result_type === 'no_results') {
				resolve(createError(term, response));
				return;
			}
			resolve(response);
		});
	});

module.exports = createUrbanFactory;
