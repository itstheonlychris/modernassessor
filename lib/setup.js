// Global variables
const tmpDirectory =
	'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor/_PROJECTS/Modern Assessor Videos/Who Are Appraisers/tmp';
const maFolder =
	'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor';

// evaluateOrder
// Check if order is default (return product, default/custom, logo, spanish)
// Who Are Appraisers
// customRequest === ''
// customLogo === ''
// spanish === false

const evaluateOrder = order => {
	const product = order.product;
	const type = order.customRequest === '' ? 'default' : 'custom';
	const logo = order.customLogo === '' ? false : true;

	console.log(`Order ${order.orderId}: 
    Product type: ${product}
    ${type}
    ${logo}
    ${order.spanish}`);

	return {
		product,
		type,
		logo,
		spanish: order.spanish
	};
};

// TODO: create Working Folder

// create Render Folder

// Download images

// TODO: duplicate Project

// TODO: create nexrender json file
