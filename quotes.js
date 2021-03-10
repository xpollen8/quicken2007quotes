const symbols = process.argv.slice(2);
if (!symbols || !symbols.length) {
	console.log(`USAGE: node quotes.js SYMBOL [SYMBOL SYMBOL ...]`);
	process.exit();
}
const { spawn } = require('child_process');
const cmd = spawn('quotes', ['-g', ...symbols]);
const moment = require('moment')

const date = new Date();
const today = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

let quotes = '';
cmd.stdout.on('data', (data) => {
	quotes += data;
});

cmd.stderr.on('data', (data) => {
	console.error(`stderr: ${data}`);
});

cmd.on('close', async (code) => {
	const data = quotes.toString();
	const removePipes = (row) => {
		return row.substr(1, row.length - 2);
	}
	const getFields = (row) => {
		return removePipes(row).split('|');
	}
	const rows = data.replace(/ /g, '').split('\n');
	const headers = getFields(rows[0]);
	const res = [];
	for (let i = 2 ; i < rows.length ; i++) {
			const r = getFields(rows[i]);
			if (r.length > 1) {
				let obj = {};
				headers.forEach((h, j) => {
					obj[h] = r[j];
				});
				res.push(obj);
			}
	};
	console.log(`!Type:Prices`);
	console.log(`Type:Prices`);
	res.forEach(({ Symbol, Last, High, Low, Volume }) => {
		console.log(`${Symbol},${Last},${today},${High},${Low},${Volume.replace(/,/g, '')}`);
	});
	console.log(`^`);
});
