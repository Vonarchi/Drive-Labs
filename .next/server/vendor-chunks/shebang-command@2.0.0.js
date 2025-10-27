"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/shebang-command@2.0.0";
exports.ids = ["vendor-chunks/shebang-command@2.0.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst shebangRegex = __webpack_require__(/*! shebang-regex */ \"(rsc)/./node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js\");\nmodule.exports = (string = \"\")=>{\n    const match = string.match(shebangRegex);\n    if (!match) {\n        return null;\n    }\n    const [path, argument] = match[0].replace(/#! ?/, \"\").split(\" \");\n    const binary = path.split(\"/\").pop();\n    if (binary === \"env\") {\n        return argument;\n    }\n    return argument ? `${binary} ${argument}` : binary;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vc2hlYmFuZy1jb21tYW5kQDIuMC4wL25vZGVfbW9kdWxlcy9zaGViYW5nLWNvbW1hbmQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxNQUFNQSxlQUFlQyxtQkFBT0EsQ0FBQztBQUU3QkMsT0FBT0MsT0FBTyxHQUFHLENBQUNDLFNBQVMsRUFBRTtJQUM1QixNQUFNQyxRQUFRRCxPQUFPQyxLQUFLLENBQUNMO0lBRTNCLElBQUksQ0FBQ0ssT0FBTztRQUNYLE9BQU87SUFDUjtJQUVBLE1BQU0sQ0FBQ0MsTUFBTUMsU0FBUyxHQUFHRixLQUFLLENBQUMsRUFBRSxDQUFDRyxPQUFPLENBQUMsUUFBUSxJQUFJQyxLQUFLLENBQUM7SUFDNUQsTUFBTUMsU0FBU0osS0FBS0csS0FBSyxDQUFDLEtBQUtFLEdBQUc7SUFFbEMsSUFBSUQsV0FBVyxPQUFPO1FBQ3JCLE9BQU9IO0lBQ1I7SUFFQSxPQUFPQSxXQUFXLENBQUMsRUFBRUcsT0FBTyxDQUFDLEVBQUVILFNBQVMsQ0FBQyxHQUFHRztBQUM3QyIsInNvdXJjZXMiOlsid2VicGFjazovL2RyaXZlLWxhYnMtb3JjaGVzdHJhdG9yLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3NoZWJhbmctY29tbWFuZEAyLjAuMC9ub2RlX21vZHVsZXMvc2hlYmFuZy1jb21tYW5kL2luZGV4LmpzP2VhNTMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc2hlYmFuZ1JlZ2V4ID0gcmVxdWlyZSgnc2hlYmFuZy1yZWdleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzdHJpbmcgPSAnJykgPT4ge1xuXHRjb25zdCBtYXRjaCA9IHN0cmluZy5tYXRjaChzaGViYW5nUmVnZXgpO1xuXG5cdGlmICghbWF0Y2gpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdGNvbnN0IFtwYXRoLCBhcmd1bWVudF0gPSBtYXRjaFswXS5yZXBsYWNlKC8jISA/LywgJycpLnNwbGl0KCcgJyk7XG5cdGNvbnN0IGJpbmFyeSA9IHBhdGguc3BsaXQoJy8nKS5wb3AoKTtcblxuXHRpZiAoYmluYXJ5ID09PSAnZW52Jykge1xuXHRcdHJldHVybiBhcmd1bWVudDtcblx0fVxuXG5cdHJldHVybiBhcmd1bWVudCA/IGAke2JpbmFyeX0gJHthcmd1bWVudH1gIDogYmluYXJ5O1xufTtcbiJdLCJuYW1lcyI6WyJzaGViYW5nUmVnZXgiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInN0cmluZyIsIm1hdGNoIiwicGF0aCIsImFyZ3VtZW50IiwicmVwbGFjZSIsInNwbGl0IiwiYmluYXJ5IiwicG9wIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js\n");

/***/ })

};
;