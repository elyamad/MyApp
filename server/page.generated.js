module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** ./server/page.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	var React = __webpack_require__(/*! react */ 1);
	
	var Application = __webpack_require__(/*! ../app/Application */ 2);
	
	var styleCollector = __webpack_require__(/*! ./style-collector */ 3);
	
	module.exports = function(req, scriptFilename) {
	
		var html;
		var css = styleCollector.collect(function() {
			html = React.renderComponentToString(Application( {url:req.url}));
		});
		return React.renderComponentToString(
			React.DOM.html(null, 
				React.DOM.head(null, 
					React.DOM.style( {id:"server-side-style", dangerouslySetInnerHTML:{__html: css}} )
				),
				React.DOM.body(null, 
					React.DOM.div( {id:"content", dangerouslySetInnerHTML:{__html: html}} ),
					React.DOM.script( {src:"assets/" + scriptFilename})
				)
			)
		);
	}

/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!****************************!*\
  !*** ./app/Application.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	var React = __webpack_require__(/*! react */ 1);
	
	var Application = React.createClass({displayName: 'Application',
		render: function() {
			__webpack_require__(/*! ./Application.css */ 4);
			return (
				React.DOM.div( {className:"application"}, 
					React.DOM.h1(null, "Hello World !"),
					React.DOM.pre(null, this.props.url)
				)
			);
		}
	});
	
	module.exports = Application;


/***/ },
/* 3 */
/*!***********************************!*\
  !*** ./server/style-collector.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	exports.collect = function(fn) {
		var stuff = [];
		function add(css) {
			stuff.push(css);
		}
		var old = exports.add;
		exports.add = add;
		fn();
		exports.add = old;
		return stuff.join("\n");
	}
	
	exports.add = function() {}

/***/ },
/* 4 */
/*!*****************************!*\
  !*** ./app/Application.css ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./server/style-collector.js */ 3).add(__webpack_require__(/*! !./~/css-loader!./app/Application.css */ 5));
	delete __webpack_require__.c[module.id];

/***/ },
/* 5 */
/*!********************************************!*\
  !*** ./~/css-loader!./app/Application.css ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports =
		".application {\n\tborder: 1px solid blue;\n\tbackground: url("+__webpack_require__(/*! ./image.png */ 7)+"), url("+__webpack_require__(/*! ./image.jpg */ 6)+");\n}";

/***/ },
/* 6 */
/*!***********************!*\
  !*** ./app/image.jpg ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "59e68da5e8cbc0ba28bd706801d425ba.jpg"

/***/ },
/* 7 */
/*!***********************!*\
  !*** ./app/image.png ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAlSURBVBhXYzix//nMm6+AJBAxAFkIDhD/X3cSiIBCUGUgyf3PAeejJoXynSD8AAAAAElFTkSuQmCC"

/***/ }
/******/ ])
//# sourceMappingURL=page.generated.js.map