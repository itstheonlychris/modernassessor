// prettier-ignore
"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

// ma-script.jsx
// Author: Chris Zachary
// authorsprojects.com
//
// Name: MA Versioner
// Version: 1.0
//
// Description:
// ...
// Load JSON and customize MA video into AE.

(function(thisObj) {
	// Global  Settings
	var globals = {};
	globals.scriptName = 'MA Versioner 1.0';
	globals.helpText = 'Make it happen';
	globals.credits = '---\n\ncreated by Chris Zachary (itstheonlychris.com)';
	globals.helpUrl = 'https://itstheonlychris.com/';
	var options = {};

	options.renderCompName = '_RENDER COMP_';
	options.renderLabelColor = 10;
	options.editLayerName = 'phone-number';
	options.nameScheme = '#COMPNAME-#DATE-#PHONE';
	options.logoPath =
		'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor/_PROJECTS/Modern Assessor Videos/Who Are Appraisers/_logos/050_logo.jpg';
	options.renderDestination =
		'/Users/chriszachary/Dropbox (Personal)/Clients/502/modernassessor/_PROJECTS/renders/';
	options.autoRender = false;
	options.mediaEncoder = false;

	var nameElements = ['#COMPNAME', '#DATE', '#PHONE'];

	var data, newComp;

	var processedFlag = false;

	function createUI(thisObj) {
		var pal =
			thisObj instanceof Panel
				? thisObj
				: new Window('palette', globals.scriptName, undefined, {
						resizeable: true
				  });
		pal.preferredSize = [200, 200];
		pal.orientation = 'column';
		pal.alignChildren = ['fill', 'fill'];
		pal.spacing = 10;
		pal.margins = 11;

		var compText = 'Please Select a Comp to Version';
		if (activeComp) {
			compText = 'Versioning: ' + activeComp.name;
		}

		// TPANEL1 - MAIN PANEL
		// =======
		var tpanel1 = pal.add('tabbedpanel', undefined, undefined, {
			name: 'tpanel1'
		});
		tpanel1.alignChildren = 'fill';
		tpanel1.preferredSize.width = 160;
		tpanel1.margins = 0;

		// TAB1 - ACTION TAB
		// ====
		var tab1 = tpanel1.add('tab', undefined, undefined, { name: 'tab1' });
		tab1.text = 'MA Versioner';
		tab1.orientation = 'column';
		tab1.alignChildren = ['left', 'top'];
		tab1.spacing = 5;
		tab1.margins = 5;

		var divider1 = tab1.add('panel', undefined, undefined, {
			name: 'divider1'
		});
		divider1.alignment = 'fill';

		var loadJSONButton = tab1.add('button', undefined, undefined, {
			name: 'loadJSONButton'
		});
		loadJSONButton.text = 'Load JSON File';
		loadJSONButton.alignment = ['fill', 'top'];

		var numListBox = tab1.add('listbox', [0, 0, 150, 150]);
		numListBox.alignment = ['fill', 'center'];
		numListBox.add('item', 'load the JSON file to start');

		var divider2 = tab1.add('panel', undefined, undefined, {
			name: 'divider2'
		});
		divider2.alignment = 'fill';
		var renderGroup = tab1.add('group');
		renderGroup.orientation = 'row';
		renderGroup.alignChildren = ['fill', 'fill'];

		var renderCheckbox = renderGroup.add('checkbox', undefined, 'Auto Render');
		renderCheckbox.value = options.autoRender;

		var encoderCheckbox = renderGroup.add(
			'checkbox',
			undefined,
			'Media Encoder'
		);
		encoderCheckbox.value = options.mediaEncoder;

		var goButton = tab1.add('button', undefined, undefined, {
			name: 'goButton'
		});
		goButton.text = 'MAKE IT!';
		goButton.alignment = ['fill', 'bottom'];

		var renderButton = tab1.add('button', undefined, 'Render', {
			name: 'renderButton'
		});
		renderButton.alignment = ['center', 'button'];

		// TAB2 - HELP TAB
		// ====
		var tab2 = tpanel1.add('tab', undefined, undefined, { name: 'tab2' });
		tab2.text = 'Help';
		tab2.orientation = 'column';
		tab2.alignChildren = ['left', 'top'];
		tab2.spacing = 5;
		tab2.margins = 5;

		var helpBtnGroup = tab2.add('group', undefined, undefined, {
			name: 'helpBtnGroup'
		});
		helpBtnGroup.alignment = 'fill';
		helpBtnGroup.orientation = 'column';
		helpBtnGroup.alignChildren = ['fill', 'fill'];

		var helpButton = helpBtnGroup.add('button', undefined, undefined, {
			name: 'helpButton'
		});
		helpButton.text = 'Instructions';

		var reportButton = helpBtnGroup.add('button', undefined, undefined, {
			name: 'reportButton'
		});
		reportButton.text = 'Report Bug';

		var divider4 = tab2.add('panel', undefined, undefined, {
			name: 'divider4'
		});
		divider4.alignment = 'fill';

		var nameScheme = tab2.add(
			'edittext { properties: {name: "nameScheme", multiline: true}}'
		);
		nameScheme.text = options.nameScheme;

		var savePrefsButton = tab2.add('button', undefined, undefined, {
			name: 'savePrefsButton'
		});
		savePrefsButton.text = 'Save Prefs';

		var divider5 = tab2.add('panel', undefined, undefined, {
			name: 'divider5'
		});
		divider5.alignment = 'fill';

		var statictext3 = tab2.add('statictext', undefined, undefined, {
			name: 'statictext3'
		});
		statictext3.text = 'itstheonlychris.com';

		// =======
		tpanel1.selection = tab1;

		//pal.grp = pal.add(res);
		pal.layout.layout();
		//pal.grp.minimumSize = pal.grp.size;
		pal.layout.resize();
		pal.onResizing = pal.onResize = function() {
			this.layout.resize();
		};

		pal.onShow = function() {
			pal.minimumSize = pal.size;
			this.layout.resize();
		};

		// MAIN ACTIONS
		loadJSONButton.onClick = function() {
			try {
				data = loadJSONFromFile();

				if (data) {
					// fill in listbox in UI

					//clear listbox
					numListBox.removeAll();

					for (var prop in data) {
						numListBox.add('item', prop + ' : ' + data[prop].toString());
					}
				} else {
					alert('No Data found.');
					return false;
				}
			} catch (err) {
				alert(err);
			}
		};

		goButton.onClick = function() {
			main();
		};

		renderCheckbox.onClick = function() {
			options.autoRender = !options.autoRender;
		};
		encoderCheckbox.onClick = function() {
			options.mediaEncoder = !options.mediaEncoder;
		};

		renderButton.onClick = function() {
			if (!processedFlag) {
				alert('Please process the video before rendering.');
			} else {
				alert(newComp.name);
				renderGo(newComp);
			}
		};

		// HELP DIALOG
		reportButton.onClick = function() {
			openURL(globals.helpUrl);
		};

		helpButton.onClick = function() {
			var helpW = new Window('dialog', 'Help', undefined, { resizable: true });
			var helpPanel = helpW.add('panel', undefined, 'INSTRUCTIONS');
			var helpText = helpPanel.add('statictext', undefined, globals.helpText, {
				multiline: true,
				name: 'helpText'
			});
			helpText.text = globals.helpText;
			helpW.add('statictext', undefined, globals.credits, {
				multiline: true,
				name: 'creditText',
				enabled: false
			});
			helpW.center();
			helpW.show();
		};

		savePrefsButton.onClick = function() {
			savePrefsFile(globals, options);
		};

		nameScheme.onChange = function() {
			options.nameScheme = nameScheme.text;
		};

		return pal;
	}

	// Build Name
	function buildName(comp, phone) {
		var nameStr = options.nameScheme;
		//var regex = /\B(\#[A-Z]+\b)/g;

		for (var i = 0; i < nameElements.length; i++) {
			var element = nameElements[i];

			switch (element) {
				case '#COMPNAME':
					nameStr = nameStr.replace(element, comp.name);
					break;
				case '#DATE':
					nameStr = nameStr.replace(element, getCurrentDate());
					break;
				case '#PHONE':
					nameStr = nameStr.replace(element, phone);
					break;
			}
		}
		//alert(nameStr);
		return nameStr;
	}

	// main

	var activeComp = app.project.activeItem;
	if (activeComp === null || !(activeComp instanceof CompItem)) {
		activeComp = false;
	}

	var ui = createUI(thisObj);
	if (ui !== null) {
		if (ui instanceof Window) {
			ui.center();
			ui.show();
		} else ui.layout.layout();
	}

	function main(thisObj) {
		try {
			app.beginUndoGroup('ModernAssessor Versioning');

			// Set Render Comp
			var comp = getCompByName(options.renderCompName);
			if (comp === null || !(comp instanceof CompItem)) {
				comp = false;
				alert('You must select a composition before versioning.');
				return false;
			}

			// Check if JSON has been loaded
			if (!data) {
				alert('You gotta load a JSON file before pressing that button...');
				return false;
			} else {
				var layers = comp.layers;
				var numLayers = layers.length;
				var curDate = getCurrentDate();

				newComp = comp.duplicate();
				newComp.label = options.renderLabelColor;
				newComp.name = 'MA_' + data['customer'] + '_' + data['version'];

				// get all dynamic layers in Render Comp
				var editLayer;
				for (prop in data) {
					editLayer = getLayerByName(prop, newComp);
					if (editLayer) {
						//alert(editLayer.name + ' - ' + data[prop]);
						// if edit layer is Logo, replace logo image first
						if (editLayer.name == 'logo') {
							var logo = getAssetByName(editLayer.name);
							//var newLogo = new ImportOptions(options.logoPath, false);
							var newLogo = new File(options.logoPath);
							logo.replace(newLogo);
						}

						editLayer.sourceText.setValue(data[prop].toString());
					}

					// for each dynamic layer matching key, change sourcetext to match value
				}

				newComp.openInViewer();
				processedFlag = true;
			}

			if (options.autoRender) {
				render(newComp);
			}
			// Build FileName Rename Comp to file name

			// Locate Render Destination

			// add to media encoder queue
		} catch (err) {
			alert(err);
		} finally {
			app.endUndoGroup();
		}
	}
})(this);

function renderGo(comp) {
	try {
		// check if render has been created

		if (!comp || comp == null || comp.name == options.renderCompName) {
			alert('Please customize the comp before rendering!');
			return;
		}

		var renderQueue = app.project.renderQueue;

		// locate render desintation
		var renderDestination =
			options.renderDestination + '/' + data.projId + '_' + customer + '/';

		// clear render queue
		while (renderQueue.numItems > 0) {
			renderQueue.item(renderQueue.numItems).remove();
		}

		// check if media encoder or render queue
		if (options.mediaEncoder) {
			alert('AME not supported yet!');
		} else {
			var renderItem = renderQueue.items.add(comp);
			var outputModule = renderItem.outputModule(1);
			outputModule.applyTemplate('MA_mp4');
			outputModule.file = File(renderDestination + '/' + comp.name);

			//renderQueue.render();
		}
	} catch (error) {
		alert(error);
	}

	// add to render and start
}

// UTILITY FUNCTIONS

// Load JSON
// return data object
function loadJSONFromFile() {
	var file = File.openDialog('Please select the JSON data file');

	if (file.open('r')) {
		file.encoding = 'UTF-8';
		var contents = file.read();
		var data = JSON.parse(contents);
		//alert(data);
		file.close();
		return data;
	} else {
		return false;
	}
}

// Get OS
function checkOS() {
	var os = system.osName;
	if (!os.length) {
		os = $.os;
	}
	var app_os = os.indexOf('Win') != -1 ? 'Win' : 'Mac';
	return app_os;
}

// open URL
function openURL(url) {
	if (checkOS() == 'Win') {
		system.callSystem('explorer ' + url);
	} else {
		system.callSystem('open ' + url);
	}
}

function padZeros(n) {
	if (n <= 9) {
		return '0' + n;
	}
	return n;
}

function getLayerByName(layerName, comp) {
	for (var i = 1; i <= comp.numLayers; i++) {
		write(comp.layer(i).name);
		if (comp.layer(i).name === layerName) {
			return comp.layer(i);
		}
	}
	return null;
}

function getCurrentDate() {
	var divider = '-';
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

function getCompByName(itemName) {
	for (var i = 1; i <= app.project.numItems; i++) {
		if (
			app.project.item(i) instanceof CompItem &&
			app.project.item(i).name === itemName
		) {
			return app.project.item(i);
		}
	}
}

function createFolder(folderName) {
	for (var i = 1; i <= app.project.numItems; i++) {
		if (
			app.project.item(i) instanceof FolderItem &&
			app.project.item(i).name === folderName
		) {
			return app.project.item(i);
		}
	}
	return app.project.items.addFolder(folderName);
}

function getLayerByName(layerName, comp) {
	for (var i = 1; i <= comp.numLayers; i++) {
		write(comp.layer(i).name);
		if (comp.layer(i).name === layerName) {
			return comp.layer(i);
		}
	}
	return null;
}

function searchCompForDynamicLayers(comp) {
	var results = [];
	var layers = comp.layers;
	var numLayers = layers.length;
	//alert('made it here');
	//loop through all layers
	for (var i = 1; i <= numLayers; i++) {
		var layer = layers[i];
		if (
			layer('Effects')('iris_dino') &&
			layer('Effects')('iris_dino')('Make Dynamic').value == 1
		) {
			results.push(layer);
		}
		if (layer.source instanceof CompItem) {
			results.push(searchCompForDynamicLayers(layer.source));
		}
	}
	return results;
}

function getAssetByName(itemName) {
	for (var i = 1; i <= app.project.numItems; i++) {
		if (
			app.project.item(i) instanceof FootageItem &&
			app.project.item(i).name === itemName
		) {
			return app.project.item(i);
		}
	}
}
