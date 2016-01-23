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
	
		handleClientLoad: function() {
			// Step 2: Reference the API key
			gapi.client.setApiKey(apiKey);
			window.setTimeout(checkAuth,1);
		},
	
		checkAuth: function() {
			gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
		},
	
		handleAuthResult: function(authResult) {
			console.log(authResult);
			var authorizeButton = document.getElementById('authorize-button');
			if (authResult && !authResult.error) {
				authorizeButton.style.visibility = 'hidden';
				makeApiCall();
			} else {
				authorizeButton.style.visibility = '';
				authorizeButton.onclick = handleAuthClick;
			}
		},
	
		handleAuthClick: function(event) {
			// Step 3: get authorization to use private data
			gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
			return false;
		},
	
		// Load the API and make an API call.  Display the results on the screen.
		makeApiCall: function() {
			// Step 4: Load the Google+ API
			gapi.client.load('plus', 'v1').then(function() {
				// Step 5: Assemble the API request
				var request = gapi.client.plus.people.get({
					'userId': 'me'
				});
				// Step 6: Execute the API request
				request.then(function(resp) {
					var heading = document.createElement('h4');
					var image = document.createElement('img');
					image.src = resp.result.image.url;
					heading.appendChild(image);
					heading.appendChild(document.createTextNode(resp.result.displayName));
	
					document.getElementById('content').appendChild(heading);
				}, function(reason) {
					console.log('Error: ' + reason.result.error.message);
				});
			});
		},
		render: function() {
			var clientId = '654523739383-6vltqp62tnsungcl9oqjvkssgm3lktmb.apps.googleusercontent.com';
	
			var apiKey = 'UTtEjVVLlcr51ctxgDLmUGEE';
	
			var scopes = 'https://www.googleapis.com/auth/plus.me';
	
			{this.handleClientLoad()}
	
			return (
				React.DOM.div( {className:"application"}, 
				React.DOM.button( {id:"authorize-button", style:"visibility"}, "Authorize"),
				React.DOM.div( {id:"content"}
				)
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

/***/ }
/******/ ])
//# sourceMappingURL=page.generated.js.map