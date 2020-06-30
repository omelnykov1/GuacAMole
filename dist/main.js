/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const allHoles = document.querySelectorAll('.hole');\nconst allGuac = document.querySelectorAll('.guac');\nconst difficulty = document.querySelectorAll('.diff');\nconst restart = document.querySelector('.play-again');\nconst totalScore = document.querySelector('.score');\nconst startGame = document.querySelector('button');\n\nconst images = [\"url('./src/images/avocado1.png') bottom center no-repeat; \", \n                \"url('./src/images/cilantro1.png') bottom center no-repeat;\", \n                \"url('./src/images/lime1.png') bottom center no-repeat;\",\n                \"url('./src/images/red_onion.png') bottom center no-repeat;\",\n            ]\n\nlet audio = document.getElementById('background');\nlet choose = document.getElementById('choose');\nlet strikeSound = document.getElementById('strike-sound');\nlet gameOver = document.getElementById('game-over');\nlet restartSound = document.getElementById('restart');\n\n\n\nlet modal = document.querySelector(\".modal-content\");\nlet endGameModal = document.querySelector(\".result-modal\");\nlet closeModal= document.querySelector(\".close\");\nlet closeModalEnd= document.querySelector(\".close-end\");\n\nstartGame.addEventListener('click', () => {\n            lost = true\n            modal.classList.add('modal-active')\n        });\n\ncloseModal.addEventListener('click', () => modal.classList.remove('modal-active'));\ncloseModalEnd.addEventListener('click', () => {\n    endGameModal.classList.remove('modal-active')\n});\n\nlet score = 0;\nlet lost = false;\nlet started = false;\nlet strikes = [];\nlet clicked;\n\nconst randomHole = allHoles => {\n    let previous;\n    const idx = Math.floor(Math.random() * allHoles.length);\n    const hole = allHoles[idx];\n    if (hole === previous) {\n        return randomHole(allHoles)\n    }\n    previous = hole;\n    return hole;\n}\n\nconst populate = (start) => {\n    const hole = randomHole(allHoles);\n    const image = images[Math.floor(Math.random() * images.length)];\n    hole.firstElementChild.setAttribute(\"style\", `background: ${image}; background-size: 50%;`);\n    hole.classList.add('show');\n\n    if (strikes.length > 4) {\n        lost = true;\n        gameOver.play();\n        startTime();\n    }\n\n    clicked = false;\n    \n    setTimeout(() => { \n        hole.classList.remove('show');\n        let strike;\n\n        if (!clicked) {\n            strikes.push('strike');\n            strike = document.querySelector(`.no-strike-${strikes.length}`);\n            strike.classList.remove(`no-strike-${strikes.length}`);\n            strikeSound.volume = 0.3;\n            strikeSound.play();\n            strike.classList.add('yes-strike');  \n        }\n        if (!lost) populate(start);\n    }, start);\n}\n\n\n\nconst startTime = () => {\n    // const startMin = 1;\n    // let mins = startMin * 60;\n    // const timer = document.getElementById('clock');\n    \n        // let minutes = Math.floor(mins / 60);\n        // let seconds = mins % 60;\n    \n        // seconds = seconds < 10 ? '0' + seconds : seconds;\n    \n        // timer.innerHTML = `${minutes} : ${seconds}`;\n        // mins--;\n        let result = document.getElementById('score-new');\n        let title = document.getElementById('title');\n\n        if (lost) {\n            lost = true;\n            if (score === 0){\n                title.innerHTML = 'Did you even try?'\n            } else if (score < 10) {\n                title.innerHTML = 'Not bad, you should try again!'\n            } else if (score > 10 && score < 35) {\n                title.innerHTML = 'Great job, keep it up!'\n            } else if (score > 35) {\n                title.innerHTML = 'Wooow, you are Guac-A-Mole MVP!!!!'\n            }\n            audio.pause();\n            result.innerHTML = score;\n            endGameModal.classList.add('modal-active')\n        }\n}\n\nconst restartGame = () => {\n    lost = false;\n    score = 0;\n    totalScore.textContent = 0;\n    audio.volume = 0.05;\n    audio.play();\n    started = true;\n    strikes = [];\n    let allStrikes = Array.from(document.querySelector('.strikes').children);\n\n    allStrikes.forEach((str, i) => {\n        str.classList.remove('yes-strike');\n        str.classList.add(`no-strike-${i + 1}`);\n    })\n}\n\nconst start = (e) => {\n    restartGame();\n    let start;\n\n    if (e.currentTarget.classList[1] === 'easy') {\n        start = 1350;\n    } else if(e.currentTarget.classList[1] === 'medium') {\n        start = 1070;\n    } else if (e.currentTarget.classList[1] === 'hard') {\n        start = 870;\n    }\n\n    populate(start);\n    modal.classList.remove('modal-active');\n    startTime();\n}\n\nconst hit = e => {\n    let hitSound = document.getElementById('slice');\n    hitSound.volume = 0.3;\n    hitSound.play();\n    score++;\n    clicked = true;\n    e.currentTarget.parentNode.classList.remove('show');\n    totalScore.textContent = score;\n}\n\nallGuac.forEach(guac => guac.addEventListener(\"click\", hit));\ndifficulty.forEach(diff => diff.addEventListener('click', start));\n\ndifficulty.forEach(diff => diff.addEventListener('click', () => {\n    choose.play()\n    choose.volume = 0.3;\n    \n    okBtn.classList.remove('start-btn');\n    okBtn.classList.add('start-btn-hidden');\n}))\n\nrestart.addEventListener('click', () => {\n    lost = true\n    restartSound.play();\n    endGameModal.classList.remove('modal-active');\n    modal.classList.add('modal-active')\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });