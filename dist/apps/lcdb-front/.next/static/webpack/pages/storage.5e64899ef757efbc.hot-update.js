"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/storage",{

/***/ "./src/components/storage/forms/storage-form-create.tsx":
/*!**************************************************************!*\
  !*** ./src/components/storage/forms/storage-form-create.tsx ***!
  \**************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _dots_cool_form_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dots.cool/form-builder */ \"../../libs/form-builder/src/index.ts\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ \"../../node_modules/@mui/material/index.js\");\n\n\n\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\nfunction _objectWithoutProperties(source, excluded) {\n    if (source == null) return {};\n    var target = _objectWithoutPropertiesLoose(source, excluded);\n    var key, i;\n    if (Object.getOwnPropertySymbols) {\n        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n        for(i = 0; i < sourceSymbolKeys.length; i++){\n            key = sourceSymbolKeys[i];\n            if (excluded.indexOf(key) >= 0) continue;\n            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n            target[key] = source[key];\n        }\n    }\n    return target;\n}\nfunction _objectWithoutPropertiesLoose(source, excluded) {\n    if (source == null) return {};\n    var target = {};\n    var sourceKeys = Object.keys(source);\n    var key, i;\n    for(i = 0; i < sourceKeys.length; i++){\n        key = sourceKeys[i];\n        if (excluded.indexOf(key) >= 0) continue;\n        target[key] = source[key];\n    }\n    return target;\n}\nvar formatData = function(data) {\n    return {\n        data: {\n            name: data.name\n        }\n    };\n};\nfunction StorageForm(props) {\n    var onSubmitSuccessCallback = props.onSubmitSuccessCallback, other = _objectWithoutProperties(props, [\n        \"onSubmitSuccessCallback\"\n    ]);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Container, {\n        maxWidth: \"md\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dots_cool_form_builder__WEBPACK_IMPORTED_MODULE_1__.Form, _objectSpread({}, other, {\n            formatData: formatData,\n            onSubmitSuccessCallback: onSubmitSuccessCallback,\n            spacing: 1,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dots_cool_form_builder__WEBPACK_IMPORTED_MODULE_1__.Select, {\n                    label: \"Game\",\n                    options: [\n                        'YGO',\n                        'PKM'\n                    ],\n                    name: \"game\"\n                }, void 0, false, {\n                    fileName: \"/Users/aeuverte/Documents/Code/dots/apps/lcdb-front/src/components/storage/forms/storage-form-create.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_dots_cool_form_builder__WEBPACK_IMPORTED_MODULE_1__.Input, {\n                    label: \"Nom\",\n                    name: \"name\",\n                    type: \"text\"\n                }, void 0, false, {\n                    fileName: \"/Users/aeuverte/Documents/Code/dots/apps/lcdb-front/src/components/storage/forms/storage-form-create.tsx\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    variant: \"contained\",\n                    type: \"submit\",\n                    children: \"Submit\"\n                }, void 0, false, {\n                    fileName: \"/Users/aeuverte/Documents/Code/dots/apps/lcdb-front/src/components/storage/forms/storage-form-create.tsx\",\n                    lineNumber: 24,\n                    columnNumber: 9\n                }, this)\n            ]\n        }), void 0, true, {\n            fileName: \"/Users/aeuverte/Documents/Code/dots/apps/lcdb-front/src/components/storage/forms/storage-form-create.tsx\",\n            lineNumber: 16,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/aeuverte/Documents/Code/dots/apps/lcdb-front/src/components/storage/forms/storage-form-create.tsx\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this));\n}\n_c = StorageForm;\n// Add memory + generate context\nvar StorageFormCreate = (0,_dots_cool_form_builder__WEBPACK_IMPORTED_MODULE_1__.withSmartForm)(StorageForm, {\n    singular: 'storage',\n    plurial: 'storages'\n});\n_c1 = StorageFormCreate;\n/* harmony default export */ __webpack_exports__[\"default\"] = (StorageFormCreate);\nvar _c, _c1;\n$RefreshReg$(_c, \"StorageForm\");\n$RefreshReg$(_c1, \"StorageFormCreate\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zdG9yYWdlL2Zvcm1zL3N0b3JhZ2UtZm9ybS1jcmVhdGUudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE0RTtBQUMzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFakQsR0FBSyxDQUFDTSxVQUFVLEdBQUcsUUFBUSxDQUFQQyxJQUFJLEVBQUssQ0FBQztJQUM1QixNQUFNLENBQUMsQ0FBQztRQUNOQSxJQUFJLEVBQUUsQ0FBQztZQUNMQyxJQUFJLEVBQUVELElBQUksQ0FBQ0MsSUFBSTtRQUNqQixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7U0FFUUMsV0FBVyxDQUFDQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixHQUFLLENBQUdDLHVCQUF1QixHQUFlRCxLQUFLLENBQTNDQyx1QkFBdUIsRUFBS0MsS0FBSyw0QkFBS0YsS0FBSztRQUEzQ0MsQ0FBdUI7O0lBQy9CLE1BQU0sNkVBQ0hOLG9EQUFTO1FBQUNRLFFBQVEsRUFBQyxDQUFJOzhGQUNyQmIseURBQUksb0JBQ0NZLEtBQUs7WUFDVE4sVUFBVSxFQUFFQSxVQUFVO1lBQ3RCSyx1QkFBdUIsRUFBRUEsdUJBQXVCO1lBQ2hERyxPQUFPLEVBQUUsQ0FBQzs7NEZBRVRaLDJEQUFNO29CQUFDYSxLQUFLLEVBQUMsQ0FBTTtvQkFBQ0MsT0FBTyxFQUFFLENBQUM7d0JBQUEsQ0FBSzt3QkFBRSxDQUFLO29CQUFBLENBQUM7b0JBQUVSLElBQUksRUFBQyxDQUFNOzs7Ozs7NEZBQ3hEUCwwREFBSztvQkFBQ2MsS0FBSyxFQUFDLENBQUs7b0JBQUNQLElBQUksRUFBQyxDQUFNO29CQUFDUyxJQUFJLEVBQUMsQ0FBTTs7Ozs7OzRGQUN6Q2IsaURBQU07b0JBQUNjLE9BQU8sRUFBQyxDQUFXO29CQUFDRCxJQUFJLEVBQUMsQ0FBUTs4QkFBQyxDQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJUixDQUFDO0tBbEJRUixXQUFXO0FBb0JwQixFQUFnQztBQUNoQyxHQUFLLENBQUNVLGlCQUFpQixHQUFHaEIsc0VBQWEsQ0FBQ00sV0FBVyxFQUFFLENBQUM7SUFDcERXLFFBQVEsRUFBRSxDQUFTO0lBQ25CQyxPQUFPLEVBQUUsQ0FBVTtBQUNyQixDQUFDOztBQUVELCtEQUFlRixpQkFBaUIsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9zdG9yYWdlL2Zvcm1zL3N0b3JhZ2UtZm9ybS1jcmVhdGUudHN4PzU4YzkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybSwgSW5wdXQsIFNlbGVjdCwgd2l0aFNtYXJ0Rm9ybSB9IGZyb20gJ0Bkb3RzLmNvb2wvZm9ybS1idWlsZGVyJztcbmltcG9ydCB7IEJ1dHRvbiwgQ29udGFpbmVyIH0gZnJvbSAnQG11aS9tYXRlcmlhbCc7XG5cbmNvbnN0IGZvcm1hdERhdGEgPSAoZGF0YSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGRhdGE6IHtcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICB9LFxuICB9O1xufTtcblxuZnVuY3Rpb24gU3RvcmFnZUZvcm0ocHJvcHMpIHtcbiAgY29uc3QgeyBvblN1Ym1pdFN1Y2Nlc3NDYWxsYmFjaywgLi4ub3RoZXIgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxDb250YWluZXIgbWF4V2lkdGg9XCJtZFwiPlxuICAgICAgPEZvcm1cbiAgICAgICAgey4uLm90aGVyfVxuICAgICAgICBmb3JtYXREYXRhPXtmb3JtYXREYXRhfVxuICAgICAgICBvblN1Ym1pdFN1Y2Nlc3NDYWxsYmFjaz17b25TdWJtaXRTdWNjZXNzQ2FsbGJhY2t9XG4gICAgICAgIHNwYWNpbmc9ezF9XG4gICAgICA+XG4gICAgICAgIDxTZWxlY3QgbGFiZWw9XCJHYW1lXCIgb3B0aW9ucz17WydZR08nLCAnUEtNJ119IG5hbWU9XCJnYW1lXCIgLz5cbiAgICAgICAgPElucHV0IGxhYmVsPVwiTm9tXCIgbmFtZT1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxCdXR0b24gdmFyaWFudD1cImNvbnRhaW5lZFwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICBTdWJtaXRcbiAgICAgICAgPC9CdXR0b24+XG4gICAgICA8L0Zvcm0+XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59XG5cbi8vIEFkZCBtZW1vcnkgKyBnZW5lcmF0ZSBjb250ZXh0XG5jb25zdCBTdG9yYWdlRm9ybUNyZWF0ZSA9IHdpdGhTbWFydEZvcm0oU3RvcmFnZUZvcm0sIHtcbiAgc2luZ3VsYXI6ICdzdG9yYWdlJyxcbiAgcGx1cmlhbDogJ3N0b3JhZ2VzJyxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlRm9ybUNyZWF0ZTtcbiJdLCJuYW1lcyI6WyJGb3JtIiwiSW5wdXQiLCJTZWxlY3QiLCJ3aXRoU21hcnRGb3JtIiwiQnV0dG9uIiwiQ29udGFpbmVyIiwiZm9ybWF0RGF0YSIsImRhdGEiLCJuYW1lIiwiU3RvcmFnZUZvcm0iLCJwcm9wcyIsIm9uU3VibWl0U3VjY2Vzc0NhbGxiYWNrIiwib3RoZXIiLCJtYXhXaWR0aCIsInNwYWNpbmciLCJsYWJlbCIsIm9wdGlvbnMiLCJ0eXBlIiwidmFyaWFudCIsIlN0b3JhZ2VGb3JtQ3JlYXRlIiwic2luZ3VsYXIiLCJwbHVyaWFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/storage/forms/storage-form-create.tsx\n");

/***/ })

});