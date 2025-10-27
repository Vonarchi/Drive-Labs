"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-unicode-supported@2.1.0";
exports.ids = ["vendor-chunks/is-unicode-supported@2.1.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ isUnicodeSupported)\n/* harmony export */ });\n/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:process */ \"node:process\");\n\nfunction isUnicodeSupported() {\n    const { env } = node_process__WEBPACK_IMPORTED_MODULE_0__;\n    const { TERM, TERM_PROGRAM } = env;\n    if (node_process__WEBPACK_IMPORTED_MODULE_0__.platform !== \"win32\") {\n        return TERM !== \"linux\"; // Linux console (kernel)\n    }\n    return Boolean(env.WT_SESSION) // Windows Terminal\n     || Boolean(env.TERMINUS_SUBLIME) // Terminus (<0.2.27)\n     || env.ConEmuTask === \"{cmd::Cmder}\" // ConEmu and cmder\n     || TERM_PROGRAM === \"Terminus-Sublime\" || TERM_PROGRAM === \"vscode\" || TERM === \"xterm-256color\" || TERM === \"alacritty\" || TERM === \"rxvt-unicode\" || TERM === \"rxvt-unicode-256color\" || env.TERMINAL_EMULATOR === \"JetBrains-JediTerm\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vaXMtdW5pY29kZS1zdXBwb3J0ZWRAMi4xLjAvbm9kZV9tb2R1bGVzL2lzLXVuaWNvZGUtc3VwcG9ydGVkL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW1DO0FBRXBCLFNBQVNDO0lBQ3ZCLE1BQU0sRUFBQ0MsR0FBRyxFQUFDLEdBQUdGLHlDQUFPQTtJQUNyQixNQUFNLEVBQUNHLElBQUksRUFBRUMsWUFBWSxFQUFDLEdBQUdGO0lBRTdCLElBQUlGLGtEQUFnQixLQUFLLFNBQVM7UUFDakMsT0FBT0csU0FBUyxTQUFTLHlCQUF5QjtJQUNuRDtJQUVBLE9BQU9HLFFBQVFKLElBQUlLLFVBQVUsRUFBRSxtQkFBbUI7UUFDOUNELFFBQVFKLElBQUlNLGdCQUFnQixFQUFFLHFCQUFxQjtRQUNuRE4sSUFBSU8sVUFBVSxLQUFLLGVBQWUsbUJBQW1CO1FBQ3JETCxpQkFBaUIsc0JBQ2pCQSxpQkFBaUIsWUFDakJELFNBQVMsb0JBQ1RBLFNBQVMsZUFDVEEsU0FBUyxrQkFDVEEsU0FBUywyQkFDVEQsSUFBSVEsaUJBQWlCLEtBQUs7QUFDL0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcml2ZS1sYWJzLW9yY2hlc3RyYXRvci8uL25vZGVfbW9kdWxlcy8ucG5wbS9pcy11bmljb2RlLXN1cHBvcnRlZEAyLjEuMC9ub2RlX21vZHVsZXMvaXMtdW5pY29kZS1zdXBwb3J0ZWQvaW5kZXguanM/NjhjMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1VuaWNvZGVTdXBwb3J0ZWQoKSB7XG5cdGNvbnN0IHtlbnZ9ID0gcHJvY2Vzcztcblx0Y29uc3Qge1RFUk0sIFRFUk1fUFJPR1JBTX0gPSBlbnY7XG5cblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicpIHtcblx0XHRyZXR1cm4gVEVSTSAhPT0gJ2xpbnV4JzsgLy8gTGludXggY29uc29sZSAoa2VybmVsKVxuXHR9XG5cblx0cmV0dXJuIEJvb2xlYW4oZW52LldUX1NFU1NJT04pIC8vIFdpbmRvd3MgVGVybWluYWxcblx0XHR8fCBCb29sZWFuKGVudi5URVJNSU5VU19TVUJMSU1FKSAvLyBUZXJtaW51cyAoPDAuMi4yNylcblx0XHR8fCBlbnYuQ29uRW11VGFzayA9PT0gJ3tjbWQ6OkNtZGVyfScgLy8gQ29uRW11IGFuZCBjbWRlclxuXHRcdHx8IFRFUk1fUFJPR1JBTSA9PT0gJ1Rlcm1pbnVzLVN1YmxpbWUnXG5cdFx0fHwgVEVSTV9QUk9HUkFNID09PSAndnNjb2RlJ1xuXHRcdHx8IFRFUk0gPT09ICd4dGVybS0yNTZjb2xvcidcblx0XHR8fCBURVJNID09PSAnYWxhY3JpdHR5J1xuXHRcdHx8IFRFUk0gPT09ICdyeHZ0LXVuaWNvZGUnXG5cdFx0fHwgVEVSTSA9PT0gJ3J4dnQtdW5pY29kZS0yNTZjb2xvcidcblx0XHR8fCBlbnYuVEVSTUlOQUxfRU1VTEFUT1IgPT09ICdKZXRCcmFpbnMtSmVkaVRlcm0nO1xufVxuIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJpc1VuaWNvZGVTdXBwb3J0ZWQiLCJlbnYiLCJURVJNIiwiVEVSTV9QUk9HUkFNIiwicGxhdGZvcm0iLCJCb29sZWFuIiwiV1RfU0VTU0lPTiIsIlRFUk1JTlVTX1NVQkxJTUUiLCJDb25FbXVUYXNrIiwiVEVSTUlOQUxfRU1VTEFUT1IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js\n");

/***/ })

};
;