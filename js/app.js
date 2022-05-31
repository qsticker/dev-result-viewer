/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_system_LanguageSelector_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/system/LanguageSelector.vue */ \"./src/components/system/LanguageSelector.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'App',\n  components: {\n    LanguageSelector: _components_system_LanguageSelector_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  data: function data() {\n    return {//\n    };\n  },\n  computed: {\n    isLoading: function isLoading() {\n      return this.$store.state.isLoading;\n    }\n  },\n  mounted: function mounted() {\n    var token = this.$route.query.token;\n\n    if (token) {\n      this.$cookies.set('token', token);\n    } else if (true) {\n      if (true) {\n        this.$cookies.set('token', \"ySbUuimgZwqOtZAalARY9J4cuDjdU53X2dHg\");\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=script&lang=ts&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/system/LanguageSelector.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].extend({\r\n  data() {\r\n    return {\r\n      langs: [\r\n        {\r\n          label: '繁體中文',\r\n          code: 'zh-TW',\r\n        },\r\n        {\r\n          label: 'English',\r\n          code: 'en',\r\n        },\r\n      ],\r\n    };\r\n  },\r\n  methods: {\r\n    changeLang(lang) {\r\n      this.$i18n.locale = lang.code;\r\n      this.$store.commit('updateCurrentLang', lang.label);\r\n    },\r\n  },\r\n}));\r\n\n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5f20872c-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5f20872c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"v-app\",\n    [\n      _c(\"v-app-bar\", { attrs: { app: \"\", color: \"primary\", dark: \"\" } }, [\n        _c(\"div\", { staticClass: \"bar\" }, [\n          _c(\"div\", { staticClass: \"d-flex align-center\" }, [\n            _c(\"i\", {\n              staticClass: \"far fa-comment fa-flip-horizontal\",\n              staticStyle: { \"font-size\": \"25px\" }\n            }),\n            _c(\"h2\", { staticClass: \"pl-3\" }, [\n              _vm._v(\" \" + _vm._s(_vm.$t(\"brandname\")) + \" \")\n            ])\n          ]),\n          _c(\n            \"div\",\n            { staticClass: \"language-btn\" },\n            [_c(\"LanguageSelector\")],\n            1\n          )\n        ])\n      ]),\n      _c(\"v-main\", [_c(\"router-view\")], 1),\n      _c(\n        \"v-overlay\",\n        { attrs: { value: _vm.isLoading } },\n        [\n          _c(\"v-progress-circular\", {\n            attrs: { indeterminate: \"\", size: \"64\", width: \"7\", color: \"blue\" }\n          })\n        ],\n        1\n      ),\n      _c(\"notifications\", {\n        attrs: { position: \"bottom center\", \"ignore-duplicates\": true }\n      })\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225f20872c-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5f20872c-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5f20872c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/system/LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"text-center\" },\n    [\n      _c(\n        \"v-menu\",\n        {\n          attrs: { \"offset-y\": \"\" },\n          scopedSlots: _vm._u([\n            {\n              key: \"activator\",\n              fn: function(ref) {\n                var on = ref.on\n                var attrs = ref.attrs\n                return [\n                  _c(\n                    \"v-btn\",\n                    _vm._g(\n                      _vm._b(\n                        {\n                          staticStyle: { padding: \"0px\" },\n                          attrs: { color: \"light\", light: \"\" }\n                        },\n                        \"v-btn\",\n                        attrs,\n                        false\n                      ),\n                      on\n                    ),\n                    [\n                      _c(\"div\", { staticClass: \"center\" }, [\n                        _c(\"i\", {\n                          staticClass: \"fas fa-globe-americas\",\n                          staticStyle: {\n                            \"font-size\": \"1.5rem\",\n                            color: \"#6c757d\"\n                          }\n                        }),\n                        _c(\"i\", {\n                          staticClass: \"fas fa-sort-down ml-2\",\n                          staticStyle: { \"margin-bottom\": \"5px\" }\n                        })\n                      ])\n                    ]\n                  )\n                ]\n              }\n            }\n          ])\n        },\n        [\n          _c(\n            \"v-list\",\n            { staticClass: \"mt-1 rounded\" },\n            _vm._l(_vm.langs, function(lang, i) {\n              return _c(\n                \"v-list-item\",\n                {\n                  key: i,\n                  on: {\n                    click: function($event) {\n                      $event.preventDefault()\n                      return _vm.changeLang(lang)\n                    }\n                  }\n                },\n                [_c(\"v-list-item-title\", [_vm._v(_vm._s(lang.label))])],\n                1\n              )\n            }),\n            1\n          )\n        ],\n        1\n      )\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225f20872c-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".loading-dialog {\\n  background-color: rgba(0, 0, 0, 0.2);\\n}\\n.bar {\\n  width: 100%;\\n  display: flex;\\n  justify-content: space-between;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \".text-center button[data-v-ac9f3c12] {\\n  padding: 0;\\n}\\n.center[data-v-ac9f3c12] {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=scss&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"6f033d23\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"24ebaabe\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?./node_modules/vue-style-loader??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ \"./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ \"./src/App.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VApp */ \"./node_modules/vuetify/lib/components/VApp/index.js\");\n/* harmony import */ var vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VAppBar */ \"./node_modules/vuetify/lib/components/VAppBar/index.js\");\n/* harmony import */ var vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VMain */ \"./node_modules/vuetify/lib/components/VMain/index.js\");\n/* harmony import */ var vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VOverlay */ \"./node_modules/vuetify/lib/components/VOverlay/index.js\");\n/* harmony import */ var vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VProgressCircular */ \"./node_modules/vuetify/lib/components/VProgressCircular/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_5__[\"VApp\"],VAppBar: vuetify_lib_components_VAppBar__WEBPACK_IMPORTED_MODULE_6__[\"VAppBar\"],VMain: vuetify_lib_components_VMain__WEBPACK_IMPORTED_MODULE_7__[\"VMain\"],VOverlay: vuetify_lib_components_VOverlay__WEBPACK_IMPORTED_MODULE_8__[\"VOverlay\"],VProgressCircular: vuetify_lib_components_VProgressCircular__WEBPACK_IMPORTED_MODULE_9__[\"VProgressCircular\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=js&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=js& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-style-loader??ref--8-oneOf-1-0!../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5f20872c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5f20872c-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5f20872c-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5f20872c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5f20872c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/components/system/LanguageSelector.vue":
/*!****************************************************!*\
  !*** ./src/components/system/LanguageSelector.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _LanguageSelector_vue_vue_type_template_id_ac9f3c12_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true& */ \"./src/components/system/LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true&\");\n/* harmony import */ var _LanguageSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LanguageSelector.vue?vue&type=script&lang=ts& */ \"./src/components/system/LanguageSelector.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true& */ \"./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ \"./node_modules/vuetify-loader/lib/runtime/installComponents.js\");\n/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ \"./node_modules/vuetify/lib/components/VBtn/index.js\");\n/* harmony import */ var vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VList */ \"./node_modules/vuetify/lib/components/VList/index.js\");\n/* harmony import */ var vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VMenu */ \"./node_modules/vuetify/lib/components/VMenu/index.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _LanguageSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _LanguageSelector_vue_vue_type_template_id_ac9f3c12_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _LanguageSelector_vue_vue_type_template_id_ac9f3c12_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"ac9f3c12\",\n  null\n  \n)\n\n/* vuetify-loader */\n\n\n\n\n\n\n_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__[\"VBtn\"],VList: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_6__[\"VList\"],VListItem: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_6__[\"VListItem\"],VListItemTitle: vuetify_lib_components_VList__WEBPACK_IMPORTED_MODULE_6__[\"VListItemTitle\"],VMenu: vuetify_lib_components_VMenu__WEBPACK_IMPORTED_MODULE_7__[\"VMenu\"]})\n\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/system/LanguageSelector.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?");

/***/ }),

/***/ "./src/components/system/LanguageSelector.vue?vue&type=script&lang=ts&":
/*!*****************************************************************************!*\
  !*** ./src/components/system/LanguageSelector.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LanguageSelector.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?");

/***/ }),

/***/ "./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-style-loader??ref--8-oneOf-1-0!../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=style&index=0&id=ac9f3c12&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_style_index_0_id_ac9f3c12_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?");

/***/ }),

/***/ "./src/components/system/LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./src/components/system/LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5f20872c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_template_id_ac9f3c12_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5f20872c-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5f20872c-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/system/LanguageSelector.vue?vue&type=template&id=ac9f3c12&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5f20872c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_template_id_ac9f3c12_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5f20872c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LanguageSelector_vue_vue_type_template_id_ac9f3c12_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/system/LanguageSelector.vue?");

/***/ }),

/***/ "./src/i18n.js":
/*!*********************!*\
  !*** ./src/i18n.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ \"./node_modules/core-js/modules/es.array.for-each.js\");\n/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ \"./node_modules/core-js/modules/es.regexp.exec.js\");\n/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.match */ \"./node_modules/core-js/modules/es.string.match.js\");\n/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-i18n */ \"./node_modules/vue-i18n/dist/vue-i18n.esm.js\");\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_6__[\"default\"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\n\nfunction loadLocaleMessages() {\n  var locales = __webpack_require__(\"./src/locales sync recursive [A-Za-z0-9-_,\\\\s]+\\\\.json$/\");\n\n  var messages = {};\n  locales.keys().forEach(function (key) {\n    var matched = key.match(/([A-Za-z0-9-_]+)\\./i);\n\n    if (matched && matched.length > 1) {\n      var locale = matched[1];\n      messages[locale] = locales(key);\n    }\n  });\n  return messages;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vue_i18n__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n  locale: navigator.language || 'en',\n  fallbackLocale: \"en\" || false,\n  messages: loadLocaleMessages()\n}));\n\n//# sourceURL=webpack:///./src/i18n.js?");

/***/ }),

/***/ "./src/locales sync recursive [A-Za-z0-9-_,\\s]+\\.json$/":
/*!****************************************************!*\
  !*** ./src/locales sync [A-Za-z0-9-_,\s]+\.json$/ ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./en.json\": \"./src/locales/en.json\",\n\t\"./zh-TW.json\": \"./src/locales/zh-TW.json\",\n\t\"./zh.json\": \"./src/locales/zh.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/locales sync recursive [A-Za-z0-9-_,\\\\s]+\\\\.json$/\";\n\n//# sourceURL=webpack:///./src/locales_sync_%5BA-Za-z0-9-_,\\s%5D+\\.json$/?");

/***/ }),

/***/ "./src/locales/en.json":
/*!*****************************!*\
  !*** ./src/locales/en.json ***!
  \*****************************/
/*! exports provided: brandname, 無法讀取資料, 我的表現, 無法載入分析圖表..., 互動貼圖-測驗結果, 互動貼圖, 馬上檢視測驗結果, 分數：, 題, 分, n分, 總答題秒數：, 秒, n秒, 分數分布圖, 所占人數比例(%), 匯出資料, 匯出所有資料, 所有回答, 所有回答時間, 所有回答開始時間, 所有回答結束時間, 姓名, 學號, 已匯出所有回答, 簡易報告, 作答者：, 項目, 個人表現, 全體平均表現, 分數, 平均每題花費時間, 總花費時間, 詳細資訊, 做題結果, 我的答案, 本題的答案, 我花的時間, 平均花費時間, 平均正確率, 查看, 整體表現, 答題時間關係圖, 共, 人完成作答, 參與測驗者名單, 序號, 代號, 總花費時間（秒）, 全體表現分佈, 答題秒數, 第n題, 總分, 正確率, 題型, 單選題, 複選題, 無設定答案, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"brandname\\\":\\\"Results\\\",\\\"無法讀取資料\\\":\\\"Cannot read data\\\",\\\"我的表現\\\":\\\"My performance\\\",\\\"無法載入分析圖表...\\\":\\\"Failed to Load into the chart\\\",\\\"互動貼圖-測驗結果\\\":\\\"Qsticker-quiz result\\\",\\\"互動貼圖\\\":\\\"Qsticker\\\",\\\"馬上檢視測驗結果\\\":\\\"Check the quiz result\\\",\\\"分數：\\\":\\\"number of correct answers：\\\",\\\"題\\\":\\\"questions\\\",\\\"分\\\":\\\"\\\",\\\"n分\\\":\\\"{n} | {n} | {n} \\\",\\\"總答題秒數：\\\":\\\"Total cost time (sec)：\\\",\\\"秒\\\":\\\"seconds\\\",\\\"n秒\\\":\\\"{n} second | {n} second | {n} seconds\\\",\\\"分數分布圖\\\":\\\"Distribution of the number of correct answers\\\",\\\"所占人數比例(%)\\\":\\\"Percentage of people(%)\\\",\\\"匯出資料\\\":\\\"Export data\\\",\\\"匯出所有資料\\\":\\\"Export all data\\\",\\\"所有回答\\\":\\\"all answers\\\",\\\"所有回答時間\\\":\\\"total time spent\\\",\\\"所有回答開始時間\\\":\\\"start answer time\\\",\\\"所有回答結束時間\\\":\\\"finish answer time\\\",\\\"姓名\\\":\\\"Name\\\",\\\"學號\\\":\\\"ID\\\",\\\"已匯出所有回答\\\":\\\"all data exported\\\",\\\"簡易報告\\\":\\\"Report\\\",\\\"作答者：\\\":\\\"Answerer：\\\",\\\"項目\\\":\\\"Items\\\",\\\"個人表現\\\":\\\"Personal performance\\\",\\\"全體平均表現\\\":\\\"Average performance\\\",\\\"分數\\\":\\\"Score\\\",\\\"平均每題花費時間\\\":\\\"Average time spent per question\\\",\\\"總花費時間\\\":\\\"Total time spent\\\",\\\"詳細資訊\\\":\\\"Detailed information\\\",\\\"做題結果\\\":\\\"Answer result\\\",\\\"我的答案\\\":\\\"My answer\\\",\\\"本題的答案\\\":\\\"Correct answer\\\",\\\"我花的時間\\\":\\\"The time I spent\\\",\\\"平均花費時間\\\":\\\"Average time spent\\\",\\\"平均正確率\\\":\\\"Average correct rate\\\",\\\"查看\\\":\\\"Check\\\",\\\"整體表現\\\":\\\"Overall performance\\\",\\\"答題時間關係圖\\\":\\\"Answer time chart\\\",\\\"共\\\":\\\"There are \\\",\\\"人完成作答\\\":\\\" people finished the Quiz Event\\\",\\\"參與測驗者名單\\\":\\\"List of participants in the test\\\",\\\"序號\\\":\\\"Serial number\\\",\\\"代號\\\":\\\"ID\\\",\\\"總花費時間（秒）\\\":\\\"Total time spent (sec)\\\",\\\"全體表現分佈\\\":\\\"Overall performance distribution\\\",\\\"答題秒數\\\":\\\"Time of answer (sec)\\\",\\\"第n題\\\":\\\"Q {n}\\\",\\\"總分\\\":\\\"Total\\\",\\\"正確率\\\":\\\"Correct Rate\\\",\\\"題型\\\":\\\"Type\\\",\\\"單選題\\\":\\\"Select one answer choice\\\",\\\"複選題\\\":\\\"Select one or more answer choices\\\",\\\"無設定答案\\\":\\\"No answer\\\"}\");\n\n//# sourceURL=webpack:///./src/locales/en.json?");

/***/ }),

/***/ "./src/locales/zh-TW.json":
/*!********************************!*\
  !*** ./src/locales/zh-TW.json ***!
  \********************************/
/*! exports provided: brandname, 無法讀取資料, 我的表現, 無法載入分析圖表..., 互動貼圖-測驗結果, 互動貼圖, 馬上檢視測驗結果, 分數：, 題, 分, n分, 總答題秒數：, 秒, n秒, 分數分布圖, 所占人數比例(%), 匯出資料, 匯出所有資料, 所有回答, 所有回答時間, 所有回答開始時間, 所有回答結束時間, 姓名, 學號, 已匯出所有回答, 簡易報告, 作答者：, 項目, 個人表現, 全體平均表現, 分數, 平均每題花費時間, 總花費時間, 詳細資訊, 做題結果, 我的答案, 本題的答案, 我花的時間, 平均花費時間, 平均正確率, 查看, 整體表現, 答題時間關係圖, 共, 人完成作答, 參與測驗者名單, 序號, 代號, 總花費時間（秒）, 全體表現分佈, 答題秒數, 第n題, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"brandname\\\":\\\"測驗結果\\\",\\\"無法讀取資料\\\":\\\"無法讀取資料\\\",\\\"我的表現\\\":\\\"我的表現\\\",\\\"無法載入分析圖表...\\\":\\\"無法載入分析圖表...\\\",\\\"互動貼圖-測驗結果\\\":\\\"互動貼圖-測驗結果\\\",\\\"互動貼圖\\\":\\\"互動貼圖\\\",\\\"馬上檢視測驗結果\\\":\\\"馬上檢視測驗結果\\\",\\\"分數：\\\":\\\"分數：\\\",\\\"題\\\":\\\"題\\\",\\\"分\\\":\\\"分\\\",\\\"n分\\\":\\\"{n} 分\\\",\\\"總答題秒數：\\\":\\\"總答題秒數：\\\",\\\"秒\\\":\\\"秒\\\",\\\"n秒\\\":\\\"{n} 秒\\\",\\\"分數分布圖\\\":\\\"分數分布圖\\\",\\\"所占人數比例(%)\\\":\\\"所占人數比例(%)\\\",\\\"匯出資料\\\":\\\"匯出資料\\\",\\\"匯出所有資料\\\":\\\"匯出所有資料\\\",\\\"所有回答\\\":\\\"所有回答\\\",\\\"所有回答時間\\\":\\\"所有回答時間\\\",\\\"所有回答開始時間\\\":\\\"所有回答開始時間\\\",\\\"所有回答結束時間\\\":\\\"所有回答結束時間\\\",\\\"姓名\\\":\\\"姓名\\\",\\\"學號\\\":\\\"學號\\\",\\\"已匯出所有回答\\\":\\\"已匯出所有回答\\\",\\\"簡易報告\\\":\\\"簡易報告\\\",\\\"作答者：\\\":\\\"作答者：\\\",\\\"項目\\\":\\\"項目\\\",\\\"個人表現\\\":\\\"個人表現\\\",\\\"全體平均表現\\\":\\\"全體平均表現\\\",\\\"分數\\\":\\\"分數\\\",\\\"平均每題花費時間\\\":\\\"平均每題花費時間\\\",\\\"總花費時間\\\":\\\"總花費時間\\\",\\\"詳細資訊\\\":\\\"詳細資訊\\\",\\\"做題結果\\\":\\\"做題結果\\\",\\\"我的答案\\\":\\\"我的答案\\\",\\\"本題的答案\\\":\\\"本題的答案\\\",\\\"我花的時間\\\":\\\"我花的時間\\\",\\\"平均花費時間\\\":\\\"平均花費時間\\\",\\\"平均正確率\\\":\\\"平均正確率\\\",\\\"查看\\\":\\\"查看\\\",\\\"整體表現\\\":\\\"整體表現\\\",\\\"答題時間關係圖\\\":\\\"答題時間關係圖\\\",\\\"共\\\":\\\"共\\\",\\\"人完成作答\\\":\\\"人完成作答\\\",\\\"參與測驗者名單\\\":\\\"參與測驗者名單\\\",\\\"序號\\\":\\\"序號\\\",\\\"代號\\\":\\\"代號\\\",\\\"總花費時間（秒）\\\":\\\"總花費時間（秒）\\\",\\\"全體表現分佈\\\":\\\"全體表現分佈\\\",\\\"答題秒數\\\":\\\"答題秒數\\\",\\\"第n題\\\":\\\"第 {n} 題\\\"}\");\n\n//# sourceURL=webpack:///./src/locales/zh-TW.json?");

/***/ }),

/***/ "./src/locales/zh.json":
/*!*****************************!*\
  !*** ./src/locales/zh.json ***!
  \*****************************/
/*! exports provided: brandname, 無法讀取資料, 我的表現, 無法載入分析圖表..., 互動貼圖-測驗結果, 互動貼圖, 馬上檢視測驗結果, 分數：, 題, 分, n分, 總答題秒數：, 秒, n秒, 分數分布圖, 所占人數比例(%), 匯出資料, 匯出所有資料, 所有回答, 所有回答時間, 所有回答開始時間, 所有回答結束時間, 姓名, 學號, 已匯出所有回答, 簡易報告, 作答者：, 項目, 個人表現, 全體平均表現, 分數, 平均每題花費時間, 總花費時間, 詳細資訊, 做題結果, 我的答案, 本題的答案, 我花的時間, 平均花費時間, 平均正確率, 查看, 整體表現, 答題時間關係圖, 共, 人完成作答, 參與測驗者名單, 序號, 代號, 總花費時間（秒）, 全體表現分佈, 答題秒數, 第n題, 總分, 正確率, 題型, 單選題, 複選題, 無設定答案, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"brandname\\\":\\\"測驗結果\\\",\\\"無法讀取資料\\\":\\\"無法讀取資料\\\",\\\"我的表現\\\":\\\"我的表現\\\",\\\"無法載入分析圖表...\\\":\\\"無法載入分析圖表...\\\",\\\"互動貼圖-測驗結果\\\":\\\"互動貼圖-測驗結果\\\",\\\"互動貼圖\\\":\\\"互動貼圖\\\",\\\"馬上檢視測驗結果\\\":\\\"馬上檢視測驗結果\\\",\\\"分數：\\\":\\\"分數：\\\",\\\"題\\\":\\\"題\\\",\\\"分\\\":\\\"\\\",\\\"n分\\\":\\\"{n} 分\\\",\\\"總答題秒數：\\\":\\\"總答題秒數：\\\",\\\"秒\\\":\\\"秒\\\",\\\"n秒\\\":\\\"{n} 秒\\\",\\\"分數分布圖\\\":\\\"分數分布圖\\\",\\\"所占人數比例(%)\\\":\\\"所占人數比例(%)\\\",\\\"匯出資料\\\":\\\"匯出資料\\\",\\\"匯出所有資料\\\":\\\"匯出所有資料\\\",\\\"所有回答\\\":\\\"所有回答\\\",\\\"所有回答時間\\\":\\\"所有回答時間\\\",\\\"所有回答開始時間\\\":\\\"所有回答開始時間\\\",\\\"所有回答結束時間\\\":\\\"所有回答結束時間\\\",\\\"姓名\\\":\\\"姓名\\\",\\\"學號\\\":\\\"學號\\\",\\\"已匯出所有回答\\\":\\\"已匯出所有回答\\\",\\\"簡易報告\\\":\\\"簡易報告\\\",\\\"作答者：\\\":\\\"作答者：\\\",\\\"項目\\\":\\\"項目\\\",\\\"個人表現\\\":\\\"個人表現\\\",\\\"全體平均表現\\\":\\\"全體平均表現\\\",\\\"分數\\\":\\\"分數\\\",\\\"平均每題花費時間\\\":\\\"平均每題花費時間\\\",\\\"總花費時間\\\":\\\"總花費時間\\\",\\\"詳細資訊\\\":\\\"詳細資訊\\\",\\\"做題結果\\\":\\\"做題結果\\\",\\\"我的答案\\\":\\\"我的答案\\\",\\\"本題的答案\\\":\\\"本題的答案\\\",\\\"我花的時間\\\":\\\"我花的時間\\\",\\\"平均花費時間\\\":\\\"平均花費時間\\\",\\\"平均正確率\\\":\\\"平均正確率\\\",\\\"查看\\\":\\\"查看\\\",\\\"整體表現\\\":\\\"整體表現\\\",\\\"答題時間關係圖\\\":\\\"答題時間關係圖\\\",\\\"共\\\":\\\"共\\\",\\\"人完成作答\\\":\\\"人完成作答\\\",\\\"參與測驗者名單\\\":\\\"參與測驗者名單\\\",\\\"序號\\\":\\\"序號\\\",\\\"代號\\\":\\\"代號\\\",\\\"總花費時間（秒）\\\":\\\"總花費時間（秒）\\\",\\\"全體表現分佈\\\":\\\"全體表現分佈\\\",\\\"答題秒數\\\":\\\"答題秒數\\\",\\\"第n題\\\":\\\"第 {n} 題\\\",\\\"總分\\\":\\\"總分\\\",\\\"正確率\\\":\\\"正確率\\\",\\\"題型\\\":\\\"題型\\\",\\\"單選題\\\":\\\"單選題\\\",\\\"複選題\\\":\\\"複選題\\\",\\\"無設定答案\\\":\\\"無設定答案\\\"}\");\n\n//# sourceURL=webpack:///./src/locales/zh.json?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_bryce_Desktop_result_viewer_repo_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-axios */ \"./node_modules/vue-axios/dist/vue-axios.min.js\");\n/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_axios__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var vue_notification__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-notification */ \"./node_modules/vue-notification/dist/index.js\");\n/* harmony import */ var vue_notification__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vue_notification__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var vue_cookies__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-cookies */ \"./node_modules/vue-cookies/vue-cookies.js\");\n/* harmony import */ var vue_cookies__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vue_cookies__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./router */ \"./src/router/index.js\");\n/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plugins/vuetify */ \"./src/plugins/vuetify.js\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./store */ \"./src/store/index.js\");\n/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./i18n */ \"./src/i18n.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue_cookies__WEBPACK_IMPORTED_MODULE_8___default.a);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].$cookies.config('7d');\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue_axios__WEBPACK_IMPORTED_MODULE_6___default.a, axios__WEBPACK_IMPORTED_MODULE_5___default.a);\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].use(vue_notification__WEBPACK_IMPORTED_MODULE_7___default.a);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  vuetify: _plugins_vuetify__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  i18n: _i18n__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_9__[\"default\"]);\n  }\n}).$mount('#app'));\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/plugins/vuetify.js":
/*!********************************!*\
  !*** ./src/plugins/vuetify.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuetify_lib_framework__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib/framework */ \"./node_modules/vuetify/lib/framework.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuetify_lib_framework__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuetify_lib_framework__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({}));\n\n//# sourceURL=webpack:///./src/plugins/vuetify.js?");

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_1__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar routes = [{\n  path: '/',\n  name: 'EditorResult',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ../views/EditorResult.vue */ \"./src/views/EditorResult.vue\"));\n  }\n}, {\n  path: '/UserResult/:answerGroupId',\n  name: 'UserResult',\n  component: function component() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../views/UserResult.vue */ \"./src/views/UserResult.vue\"));\n  }\n}, {\n  path: '/no-data',\n  name: 'NoData',\n  component: function component() {\n    return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ../views/NoData.vue */ \"./src/views/NoData.vue\"));\n  }\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  state: {\n    isLoading: false,\n    currentLang: ''\n  },\n  mutations: {\n    updateLoading: function updateLoading(state, isLoading) {\n      state.isLoading = isLoading;\n    },\n    updateCurrentLang: function updateCurrentLang(state, currentLang) {\n      state.currentLang = currentLang;\n    }\n  },\n  actions: {},\n  modules: {}\n}));\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.js */\"./src/main.js\");\n\n\n//# sourceURL=webpack:///multi_./src/main.js?");

/***/ })

/******/ });