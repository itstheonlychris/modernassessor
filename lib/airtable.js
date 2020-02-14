require('dotenv').config();
var Table = require('cli-table');

const Airtable = require('airtable');

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
let base = Airtable.base('appf3otPEL1TfkHhu');

const fetchNewOrders = async () => {
	var table = new Table({
		head: [
			'Order ID',
			'Date',
			'Status',
			'Product',
			'Customer',
			'Title',
			'Version',
			'customLogo',
			'spanish',
			'customRequest',
			'Price'
		]
	});
	pendingOrders = [];
	try {
		const records = await base('Orders')
			.select({
				maxRecords: 5,
				sort: [{ field: 'OrderID', direction: 'asc' }],
				filterByFormula: "OR({Status} = '', {Status} = 'pending')"
			})
			.firstPage();

		records.forEach(record => {
			order = {
				orderId: record.get('OrderID'),
				dateSubmitted: record.get('DateSubmitted'),
				status: record.get('Status') || '',
				product: record.get('Product')[0],
				customer: record.get('Customer'),
				title: record.get('Title'),
				version: record.get('Version'),
				customLogo: record.get('CustomLogo') || '',
				spanish: record.get('Spanish') || false,
				customRequest: record.get('CustomRequest') || '',
				price: record.get('Price')
			};
			pendingOrders.push(order);
			//console.log(Object.values(order));
			//table.push(Object.values(order));
			//console.log(pendingOrders[pendingOrders.length - 1]);
		});
		//console.log(table.toString());
		return pendingOrders;
	} catch (err) {
		console.error(err);
		return null;
	}
};

exports.fetchNewOrders = fetchNewOrders;
