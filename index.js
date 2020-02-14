const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { getCurDate } = require('./lib/helpers');

const tmpDirectory =
	'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor/_PROJECTS/Modern Assessor Videos/Who Are Appraisers/tmp';
const maFolder =
	'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor';

module.exports = () => {
	const args = minimist(process.argv.slice(2));
	let cmd = args._[0] || 'help';

	if (args.version || args.v) {
		cmd = 'version';
	}

	if (args.help || args.h) {
		cmd = 'help';
	}

	switch (cmd) {
		case 'go':
			require('./src/go')(args);
			break;
		case 'help':
			require('./src/help')(args);
			break;
		case 'version':
			require('./src/version')(args);
			break;
		case 'old':
			require('./src/old')(args);
		default:
			console.error(
				`"${cmd}" is not a valid command. Try ${chalk.bold('ma help')}`
			);
			break;
	}
};

const init = () => {
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

const getInputs = () => {
	const inputs = [
		{
			name: 'projId',
			type: 'input',
			message: 'What is the Project ID?'
		},
		{
			name: 'customer',
			type: 'input',
			message: 'What is the Customer Name?'
		},
		{
			name: 'title',
			type: 'input',
			message: 'What is the custom title?'
		},
		{
			name: 'version',
			type: 'list',
			message: 'Which Version?',
			choices: ['Appraiser', 'Assessor']
		},
		{
			name: 'logo',
			type: 'confirm',
			message: 'Is there a custom logo?'
		},
		{
			name: 'confirmed',
			type: 'confirm',
			message: 'IMPORTANT: Are these answers EXACTLY correct?'
		}
	];
	return inquirer.prompt(inputs).then(answers => {
		if (answers.confirmed === false) {
			console.log('Starting over');
			return getInputs();
		} else {
			return answers;
		}
	});
};

const createJSON = data => {
	const file = path.join(tmpDirectory, 'data.json');
	fs.writeFileSync(file, JSON.stringify(data));
	return file;
};

// Create Render Folder and Delivery Folder
const createFolders = (projId, projName) => {
	// Navigate to MA folder directory
	const folderName = projId + '_' + projName;

	const renderFolder = path.join(maFolder, '_PROJECTS/renders', folderName);
	const dir = path.join(maFolder, folderName);
	try {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		if (!fs.existsSync(renderFolder)) {
			fs.mkdirSync(renderFolder);
		}
	} catch (err) {
		console.error(err);
	}
};

// duplicate After Effects project and rename
const duplicateProject = (projId, projName, version) => {
	const templateName = '000_MA_Assessors_TEMPLATE_110519.aep';
	const templateLocation = path.join(
		maFolder,
		'_PROJECTS/Modern Assessor Videos/Who Are Appraisers/MA_Who Are AppraisersAssessors_TEMPLATE_RenderProject'
	);
	const source = path.join(templateLocation, templateName);
	const curDate = getCurDate();
	const destName = `${projId}_MA_${version}_${curDate}_${projName}.aep`;
	const dest = path.join(templateLocation, destName);
	fs.copyFile(source, dest, err => {
		if (err) throw err;
	});
	return destName;
};

const success = () => {
	console.log(chalk.white.bgGreen.bold(`SUCCESS!`));
	console.log(chalk.green.bold(`GET READY TO RUMMMMMBLLEEEEE`));
};
const run = async () => {
	// instructions
	init();

	// get Inputs
	const answers = await getInputs();
	console.log(answers);

	// create json file
	const filePath = createJSON(answers);
	console.log(chalk.white.bgGreen.bold(`SUCCESS!`));
	console.log(chalk.green.bold(`Created JSON file at ${filePath}`));
	console.log('---');

	// create Folders
	createFolders(answers.projId, answers.customer);
	console.log(chalk.green(`Created Render Folders!`));
	console.log('---');
	// duplicate Project
	// TODO: Add feature for custon (duplicates CUSTOM project instead of render)
	const destName = await duplicateProject(
		answers.projId,
		answers.customer,
		answers.version
	);
	console.log(chalk.green(`${destName} duplicated to the directory.`));
	console.log('---');

	// show success message
	success();
};
