const chalk = require('chalk');
const init = require('../lib/init');

const menus = {
	main: `
    ${chalk.green.bold('ma [command] <options>')}

    ${chalk.bold('go')} .............. fetch new orders and process
    ${chalk.bold('version, -v')} ............ show package version
    ${chalk.bold('help, -h')} ............... show help menu for a command
    
    good luck!`,

	go: ` ${chalk.green.bold('ma go <options>')}

    ${chalk.bold('--yes, -y')} ..... go default all the way. run automatically`
};

module.exports = args => {
	const subCmd = args._[0] === 'help' ? args._[1] : args._[0];
	init();
	console.log(menus[subCmd] || menus.main);
};
