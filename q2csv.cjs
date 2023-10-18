const fs = require("fs");
const stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const quotes = stdinBuffer.toString().split('\n').filter(l => l.includes(',')).map(r => {
	return r.split(',')
});

quotes.forEach(([ symbol, close = 0, dt, high = 0, low = 0, volume = 0 ]) => {
	const [ mn, dy, yr ] = dt.split('/');
	const zeroPad = (x) => String(x).length === 1 ? `0${x}` : x;
	const date = `${yr}-${zeroPad(mn)}-${zeroPad(dy)}`;
	console.log(`delete from stock.quote where symbol='${symbol}' and date='${date}';`);
	console.log(`insert into stock.quote values(NULL,"${symbol}","${date}",0,${high || 0},${low || 0},${close || 0},${volume || 0});`);
});
