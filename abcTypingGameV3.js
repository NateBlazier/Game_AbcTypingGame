/////////////////////////
// TODO
// - database
// - login / registration page
// - mobile
// - check for any automation software
// - capitalization
// - display of special characters
/////////////////////////

let keyboardbuttons = {
	8: 'backspace',
	9: 'tab',
	13: 'enter',
	16: 'shift',
	17: 'ctrl',
	18: 'alt',
	19: 'pausebreak',
	20: 'capslock',
	27: 'escape',
	32: ' ',
	33: 'pageup',
	34: 'pagedown',
	35: 'end',
	36: 'home',
	37: 'leftarrow',
	38: 'uparrow',
	39: 'rightarrow',
	40: 'downarrow',
	45: 'insert',
	46: 'delete',
	48: '0',
	49: '1',
	50: '2',
	51: '3',
	52: '4',
	53: '5',
	54: '6',
	55: '7',
	56: '8',
	57: '9',
	65: 'a',
	66: 'b',
	67: 'c',
	68: 'd',
	69: 'e',
	70: 'f',
	71: 'g',
	72: 'h',
	73: 'i',
	74: 'j',
	75: 'k',
	76: 'l',
	77: 'm',
	78: 'n',
	79: 'o',
	80: 'p',
	81: 'q',
	82: 'r',
	83: 's',
	84: 't',
	85: 'u',
	86: 'v',
	87: 'w',
	88: 'x',
	89: 'y',
	90: 'z',
	91: 'leftwindowkey',
	92: 'rightwindowkey',
	93: 'selectkey',
	96: 'numpad0',
	97: 'numpad1',
	98: 'numpad2',
	99: 'numpad3',
	100: 'numpad4',
	101: 'numpad5',
	102: 'numpad6',
	103: 'numpad7',
	104: 'numpad8',
	105: 'numpad9',
	106: 'multiply',
	107: 'add',
	109: 'subtract',
	110: 'decimalpoint',
	111: 'divide',
	112: 'f1',
	113: 'f2',
	114: 'f3',
	115: 'f4',
	116: 'f5',
	117: 'f6',
	118: 'f7',
	119: 'f8',
	120: 'f9',
	121: 'f10',
	122: 'f11',
	123: 'f12',
	144: 'numlock',
	145: 'scrolllock',
	186: 'semicolon',
	187: '=',
	188: 'comma',
	189: 'dash',
	190: 'period',
	191: 'forwardslash',
	192: 'graveaccent',
	219: 'openbracket',
	220: 'backslash',
	221: 'closebraket',
	222: 'singlequote'
};

// My Game Constructor
function Game(textToType, titleBarText, endMessage) {
	this.textToType = textToType;
	this.titleBarText = titleBarText;
	this.endMessage = endMessage;
}

const TheLynnGame = new Game('This is want lynn is typing', 'THis is the Lynngame message', 'Lynn let you win');
const TheNateGame = new Game('This is want nate is typing', 'THis is the nate game message', 'Nate let you win');

let g_oGamesList = {
	alphabet: {
		textToType: 'abcdefghijklmnopqrstuvwxyz',
		titleBarText: 'abcdefghijklmnopqrstuvwxyz',
		endMessage: "Now you know your abc's"
	},
	theQuickBrownFox: {
		textToType: 'The Quick Brown Fox Jumps Over The Lazy Dog',
		titleBarText: 'The Quick Brown Fox Jumps Over The Lazy Dog',
		endMessage: 'You should get a new dog.'
	},

	TheLynnGame,
	TheNateGame
};

//////////////////////////
// THE SELECTORS
/////////////////////////

//let h1 = document.querySelector('h1');
let characterPlaceholder = document.querySelector('#characterPlaceholder');
let divTimer = document.querySelector('#timer');
let btnRestart = document.querySelector('#btnRestart');
let input = document.querySelector('input');
let endMessage = document.querySelector('#endMessage');
let gameTitleBar = document.querySelector('#gameTitleBar');
let btnGameTabs = document.querySelectorAll('.btnGameTabs');

//Games tab
let game_abcGame = document.querySelector('#btnAbcGame');
let game_QuickBrownFox = document.querySelector('#btnQuickBrownFoxGame');
let game_MakeYourOwnGame = document.querySelector('#btnMakeYourOwnGame');

//////////////////////////
// Display Variables
/////////////////////////

//StopWatch
let timeBegan = null,
	timeStopped = null,
	stoppedDuration = 0,
	started = null;

let arrGameChoice = CreateGameKeysArray(g_oGamesList.alphabet.textToType, keyboardbuttons);
let iEndOfGameIndex = arrGameChoice.length;
let iStartKey = arrGameChoice[0];
let iCurrentkey = arrGameChoice[0];
let iCurrentGameArrayIndex = 0;
let sGameTitleBarText = g_oGamesList.alphabet.titleBarText;
let sGamesEndMessage = g_oGamesList.alphabet.endMessage;

//////////////////////////
// Working Area
/////////////////////////

function CreateGameKeysArray(sGameValuesString, keyboardbuttons) {
	//The Array of KeyCodes we are trying to build
	let arrGame_Keys = [];
	//Lowercasing the String... We will change this for uppercase eventually.
	let str = sGameValuesString.toLowerCase();
	//taking the string and using "spread" to seperate the characters and put them in an array
	let arrGame_Values = [ ...str ];

	for (let iLup = 0; iLup < arrGame_Values.length; iLup++) {
		for (var sKey in keyboardbuttons) {
			if (keyboardbuttons[sKey] === arrGame_Values[iLup]) {
				let iKey = parseInt(sKey);
				arrGame_Keys.push(iKey);
			}
		}
	}
	return arrGame_Keys;
}

function selectGameTab(evt) {
	for (i = 0; i < btnGameTabs.length; i++) {
		btnGameTabs[i].className = btnGameTabs[i].className.replace(' btnTabSelected', '');
	}
	evt.currentTarget.className += ' btnTabSelected';
}

function pickGame() {
	game_abcGame.addEventListener('click', function(evt) {
		selectGameTab(evt);
		arrGameChoice = CreateGameKeysArray(g_oGamesList.alphabet.textToType, keyboardbuttons);
		iStartKey = arrGameChoice[0];
		iEndOfGameIndex = arrGameChoice.length;
		sGameTitleBarText = g_oGamesList.alphabet.titleBarText;
		sGamesEndMessage = g_oGamesList.alphabet.endMessage;
		resetGame();
	});

	game_QuickBrownFox.addEventListener('click', function(evt) {
		selectGameTab(evt);
		arrGameChoice = CreateGameKeysArray(g_oGamesList.theQuickBrownFox.textToType, keyboardbuttons);
		iStartKey = arrGameChoice[0];
		iEndOfGameIndex = arrGameChoice.length;
		sGameTitleBarText = g_oGamesList.theQuickBrownFox.titleBarText;
		sGamesEndMessage = g_oGamesList.theQuickBrownFox.endMessage;
		resetGame();
	});

	game_MakeYourOwnGame.addEventListener('click', function(evt) {
		selectGameTab(evt);
		arrGameChoice = arrGame_MakeYourOwnGameKeys;
		iStartKey = arrGameChoice[0];
		iEndOfGameIndex = arrGameChoice.length;
		sGameTitleBarText = arrGame_MakeYourOwnGameValues.join('');
		sGamesEndMessage = 'you finished!';
		resetGame();
	});
}

//////////////////////////
// Finished Area
/////////////////////////

windowsOnloadInit();

function windowsOnloadInit() {
	btnRestart.addEventListener('click', resetGame);
	pickGame();
	resetGame();
}

function keyCode(event) {
	let iTypedKey = event.keyCode;

	if (iTypedKey === 37) {
		resetGame();
	}

	if (iTypedKey === iCurrentkey) {
		if (iTypedKey === iCurrentkey && iCurrentkey === iStartKey) {
			startTimer();
		}
		iCurrentGameArrayIndex = iCurrentGameArrayIndex + 1;
		iCurrentkey = arrGameChoice[iCurrentGameArrayIndex];

		if (iCurrentkey === arrGameChoice[iEndOfGameIndex]) {
			stopTimer();
			endMessage.textContent = sGamesEndMessage;
		} else {
			characterPlaceholder.textContent = keyboardbuttons[iCurrentkey];
		}
	}
}

if (iCurrentkey === 32) {
}

//Resetting of the game
function resetGame() {
	resetTimer();
	arrGameChoice = arrGameChoice;
	iStartKey = arrGameChoice[0];
	iCurrentkey = arrGameChoice[0];

	characterPlaceholder.textContent = keyboardbuttons[iStartKey];
	endMessage.textContent = '';
	gameTitleBar.textContent = sGameTitleBarText;

	// iCurrentkey = arrGameChoice[0];
	iCurrentGameArrayIndex = 0;
	input.value = '';
	input.focus();
}

//Timer Methods
function startTimer() {
	if (timeBegan === null) {
		timeBegan = new Date();
	} else {
		clearInterval(started);
	}
	if (timeStopped !== null) {
		stoppedDuration += new Date() - timeStopped;
	}
	started = setInterval(clockRunning, 10);
	return stoppedDuration;
}

function stopTimer() {
	timeStopped = new Date();
	clearInterval(started);
}

function resetTimer() {
	clearInterval(started);
	stoppedDuration = 0;
	timeBegan = null;
	timeStopped = null;
	document.getElementById('display-area').innerHTML = '00:00:00.000';
}

function clockRunning() {
	let currentTime = new Date(),
		timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
		hour = timeElapsed.getUTCHours(),
		min = timeElapsed.getUTCMinutes(),
		sec = timeElapsed.getUTCSeconds(),
		ms = timeElapsed.getUTCMilliseconds();

	document.getElementById('display-area').innerHTML =
		(hour > 9 ? hour : '0' + hour) +
		':' +
		(min > 9 ? min : '0' + min) +
		':' +
		(sec > 9 ? sec : '0' + sec) +
		'.' +
		(ms > 99 ? ms : ms > 9 ? '0' + ms : '00' + ms);
}

//////////////////creating html with JS
// var title = "Constructing HTML Elements";

// var container = $("<div>");
// container.addClass("tutorial");

// var h1 = $("<h1>");
// h1.text(title);
// h1.addClass("tutorial-heading");
// container.append(h1);

// $("body").append(wrapper);

//console.log(arrGame_MakeYourOwnGameValues.join(''));

//////////////////////////////////////if I break this

// for (i = 0; i < arrGame_MakeYourOwnGameValues.length; i++) {
// 	document.writeln(arrGame_MakeYourOwnGameValues[i]);
// }
