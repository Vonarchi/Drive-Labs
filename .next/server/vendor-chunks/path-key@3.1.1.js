"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/path-key@3.1.1";
exports.ids = ["vendor-chunks/path-key@3.1.1"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js ***!
  \**************************************************************************/
/***/ ((module) => {

eval("\nconst pathKey = (options = {})=>{\n    const environment = options.env || process.env;\n    const platform = options.platform || process.platform;\n    if (platform !== \"win32\") {\n        return \"PATH\";\n    }\n    return Object.keys(environment).reverse().find((key)=>key.toUpperCase() === \"PATH\") || \"Path\";\n};\nmodule.exports = pathKey;\n// TODO: Remove this for the next major release\nmodule.exports[\"default\"] = pathKey;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vcGF0aC1rZXlAMy4xLjEvbm9kZV9tb2R1bGVzL3BhdGgta2V5L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBRUEsTUFBTUEsVUFBVSxDQUFDQyxVQUFVLENBQUMsQ0FBQztJQUM1QixNQUFNQyxjQUFjRCxRQUFRRSxHQUFHLElBQUlDLFFBQVFELEdBQUc7SUFDOUMsTUFBTUUsV0FBV0osUUFBUUksUUFBUSxJQUFJRCxRQUFRQyxRQUFRO0lBRXJELElBQUlBLGFBQWEsU0FBUztRQUN6QixPQUFPO0lBQ1I7SUFFQSxPQUFPQyxPQUFPQyxJQUFJLENBQUNMLGFBQWFNLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxDQUFBQSxNQUFPQSxJQUFJQyxXQUFXLE9BQU8sV0FBVztBQUN4RjtBQUVBQyxPQUFPQyxPQUFPLEdBQUdiO0FBQ2pCLCtDQUErQztBQUMvQ1kseUJBQXNCLEdBQUdaIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJpdmUtbGFicy1vcmNoZXN0cmF0b3IvLi9ub2RlX21vZHVsZXMvLnBucG0vcGF0aC1rZXlAMy4xLjEvbm9kZV9tb2R1bGVzL3BhdGgta2V5L2luZGV4LmpzP2Q2MzIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoS2V5ID0gKG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRjb25zdCBlbnZpcm9ubWVudCA9IG9wdGlvbnMuZW52IHx8IHByb2Nlc3MuZW52O1xuXHRjb25zdCBwbGF0Zm9ybSA9IG9wdGlvbnMucGxhdGZvcm0gfHwgcHJvY2Vzcy5wbGF0Zm9ybTtcblxuXHRpZiAocGxhdGZvcm0gIT09ICd3aW4zMicpIHtcblx0XHRyZXR1cm4gJ1BBVEgnO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdC5rZXlzKGVudmlyb25tZW50KS5yZXZlcnNlKCkuZmluZChrZXkgPT4ga2V5LnRvVXBwZXJDYXNlKCkgPT09ICdQQVRIJykgfHwgJ1BhdGgnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoS2V5O1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwYXRoS2V5O1xuIl0sIm5hbWVzIjpbInBhdGhLZXkiLCJvcHRpb25zIiwiZW52aXJvbm1lbnQiLCJlbnYiLCJwcm9jZXNzIiwicGxhdGZvcm0iLCJPYmplY3QiLCJrZXlzIiwicmV2ZXJzZSIsImZpbmQiLCJrZXkiLCJ0b1VwcGVyQ2FzZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js\n");

/***/ })

};
;