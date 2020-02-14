const chalk = require('chalk');
const figlet = require('figlet');
module.exports = init = () => {
	console.log(
		chalk.magenta(
			figlet.textSync('modernassessor', {
				font: 'Small',
				kerning: 'fitted',
				horizontalLayout: 'default',
				verticalLayout: 'default'
			})
		)
	);
};
