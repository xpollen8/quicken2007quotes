const fetchQuotes = require('./fetchQuotes.cjs');
const symbolsArray = require('./symbols.json');
const credentials = require('./rapidapi.json');

(async () => {
	try {
		console.log(`!Type:Prices`);
		console.log(`Type:Prices`);
		const results = await fetchQuotes(credentials, symbolsArray);
		results.forEach(({ Symbol, Last, Today, High, Low, Volume }) => {
			console.log(`${Symbol},${Last},${Today},${High},${Low},${Volume}`);
		});
		console.log(`^`);
	} catch (error) {
		console.error(error);
	}
})();
