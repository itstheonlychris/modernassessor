//run with node setup {{000}} {{"Riley County"}} {{Assessor}}

const fs = require('fs');
const path = require('path');

const readline = require('readline');

var settings = process.argv.slice(2);
console.log('Settings: ', settings);

var projId = settings[0];
var projName = settings[1];
var version = settings[2];

console.log(projId + '_' + projName);

function main() {
	try {
		//createFolders();
		duplicateProject();
	} catch (err) {
		console.log(err);
	}
}

// Create Render Folder and Delivery Folder
const createFolders = () => {
	// Navigate to MA folder directory
	const folderName = projId + '_' + projName;
	const maFolder =
		'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor';
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

// Duplicate After Effects Project and Rename
const duplicateProject = () => {
	const projectLocation =
		'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor/_PROJECTS/Modern Assessor Videos/Who Are Appraisers/MA_Who Are AppraisersAssessors_TEMPLATE_RenderProject';
	const sourceName = '000_MA_Assessors_TEMPLATE_110519.aep';
	const source = path.join(projectLocation, sourceName);
	const curDate = getCurDate();
	const destName = `${projId}_MA_${version}_${curDate}_${projName}.aep`;
	const dest = path.join(projectLocation, destName);
	fs.copyFile(source, dest, err => {
		if (err) throw err;
		console.log(`${destName} was copied to the directory`);
	});
};

main();

// UTILITY FUNCITONS

function getCurDate() {
	var divider = '';
	var yearLength = 2;
	var d = new Date(Date(0));
	var yearTrim = yearLength === 2 ? 2 : 0;
	var date =
		'' +
		padZeros(d.getMonth() + 1) +
		divider +
		padZeros(d.getDate()) +
		divider +
		d
			.getFullYear()
			.toString()
			.substring(yearTrim, 4);
	return date;
}

function padZeros(n) {
	if (n <= 9) {
		return '0' + n;
	}
	return n;
}
