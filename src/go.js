const ora = require('ora');
const { fetchNewOrders } = require('../lib/airtable');
const init = require('../lib/init');

module.exports = async args => {
	init();
	const spinner = ora().start();

	try {
		const newOrders = await fetchNewOrders();
		spinner.stop();
		console.log(`Latest new orders in Airtable:`);
		console.log(newOrders);
		// Setup new orders
	} catch (err) {
		spinner.stop();

		console.error(err);
	}
};

// TODO: everything looks fine, process it?
