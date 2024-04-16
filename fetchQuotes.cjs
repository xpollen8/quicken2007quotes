const fetchQuotes = async (credentials, symbols) => {
	const fetch = require('node-fetch');
	const date = new Date();
	const today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

	const fetcBatch = async (symbols) => {
		const url = `https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${symbols}`;
		const options = {
			method: 'GET',
			headers: credentials,
		};

		const response = await fetch(url, options);
		const resp = await response.json();
		const res = resp?.quoteResponse?.result?.map(r => {
			const { symbol, regularMarketPrice, averageDailyVolume10Day } = r;
			return [ symbol, regularMarketPrice, 0, 0, JSON.stringify(averageDailyVolume10Day) || '' ];
		});
		return res;
	}

	if (credentials['X-RapidAPI-Key'] === 'YOUR-KEY-HERE-SEE-README') {
		throw "You must edit the rapidapi.json file - See README.md";
	}
	// cannot fetch all in one batch, so break 'em up
	const symbols1 = symbols.slice(0, 30).join('%2C');
	const symbols2 = symbols.slice(30).join('%2C');
	const res1 = (symbols1?.length) ? await fetcBatch(symbols1) : [];
	const res2 = (symbols2?.length) ? await fetcBatch(symbols2) : [];
	// normalize the result
	return [ ...res1, ...res2 ].map(([ Symbol, Last, High, Low, Volume ]) => (
		{
			Symbol: Symbol.replace('-', '.'), Last, Today: today, High, Low, Volume: Volume.replace(/,/g, '')
		}
	));
}

module.exports = fetchQuotes;
