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

/***/ "../../libs/datagrid-builder/src/default-components-details/components/topbar.tsx":
/*!****************************************************************************************!*\
  !*** ../../libs/datagrid-builder/src/default-components-details/components/topbar.tsx ***!
  \****************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_icons_material_OpenInFull__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material/OpenInFull */ \"../../node_modules/@mui/icons-material/OpenInFull.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ \"../../node_modules/@mui/material/index.js\");\n/* harmony import */ var _hoc_with_smart_history_use_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hoc/with-smart-history/use-history */ \"../../libs/datagrid-builder/src/hoc/with-smart-history/use-history/index.ts\");\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Topbar(props) {\n    _s();\n    var title = props.title, actionText = props.actionText, actionPage = props.actionPage, fullscreenPage = props.fullscreenPage;\n    var push = (0,_hoc_with_smart_history_use_history__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().push;\n    var handleActionClick = useCallback(function() {\n        push(actionPage);\n    }, []);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Stack, {\n        direction: \"row\",\n        justifyContent: \"space-between\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {\n                variant: \"h4\",\n                children: title\n            }, void 0, false, {\n                fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Stack, {\n                direction: \"row\",\n                alignItems: \"center\",\n                spacing: 1,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                        onClick: onActionClick,\n                        children: actionText\n                    }, void 0, false, {\n                        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                        lineNumber: 25,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Divider, {\n                        orientation: \"vertical\",\n                        flexItem: true\n                    }, void 0, false, {\n                        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.IconButton, {\n                            onClick: onFullClick,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_OpenInFull__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                                lineNumber: 29,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                            lineNumber: 28,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this));\n}\n_s(Topbar, \"o0lVw1ggwvjKHV0h3CsZzD39L0U=\", false, function() {\n    return [\n        _hoc_with_smart_history_use_history__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    ];\n});\n_c = Topbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Topbar);\nvar _c;\n$RefreshReg$(_c, \"Topbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vbGlicy9kYXRhZ3JpZC1idWlsZGVyL3NyYy9kZWZhdWx0LWNvbXBvbmVudHMtZGV0YWlscy9jb21wb25lbnRzL3RvcGJhci50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEyRDtBQVFyQztBQUMyQzs7U0FFeERRLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFLENBQUM7O0lBQ3RCLEdBQUssQ0FBR0MsS0FBSyxHQUE2Q0QsS0FBSyxDQUF2REMsS0FBSyxFQUFFQyxVQUFVLEdBQWlDRixLQUFLLENBQWhERSxVQUFVLEVBQUVDLFVBQVUsR0FBcUJILEtBQUssQ0FBcENHLFVBQVUsRUFBRUMsY0FBYyxHQUFLSixLQUFLLENBQXhCSSxjQUFjO0lBRXJELEdBQUssQ0FBR0MsSUFBSSxHQUFLUCwrRUFBVSxHQUFuQk8sSUFBSTtJQUVaLEdBQUssQ0FBQ0MsaUJBQWlCLEdBQUdDLFdBQVcsQ0FBQyxRQUN4QyxHQUQ4QyxDQUFDO1FBQzNDRixJQUFJLENBQUNGLFVBQVU7SUFDakIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVMLE1BQU0sNkVBQ0hQLGdEQUFLO1FBQUNZLFNBQVMsRUFBQyxDQUFLO1FBQUNDLGNBQWMsRUFBQyxDQUFlOzt3RkFDbERaLHFEQUFVO2dCQUFDYSxPQUFPLEVBQUMsQ0FBSTswQkFBRVQsS0FBSzs7Ozs7O3dGQUM5QkwsZ0RBQUs7Z0JBQUNZLFNBQVMsRUFBQyxDQUFLO2dCQUFDRyxVQUFVLEVBQUMsQ0FBUTtnQkFBQ0MsT0FBTyxFQUFFLENBQUM7O2dHQUNsRG5CLGlEQUFNO3dCQUFDb0IsT0FBTyxFQUFFQyxhQUFhO2tDQUFHWixVQUFVOzs7Ozs7Z0dBQzFDUixrREFBTzt3QkFBQ3FCLFdBQVcsRUFBQyxDQUFVO3dCQUFDQyxRQUFROzs7Ozs7Z0dBQ3ZDeEIsOENBQUc7OEdBQ0RHLHFEQUFVOzRCQUFDa0IsT0FBTyxFQUFFSSxXQUFXO2tIQUM3QjFCLHNFQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNM0IsQ0FBQztHQXZCUVEsTUFBTTs7UUFHSUQsMkVBQVU7OztLQUhwQkMsTUFBTTtBQXlCZiwrREFBZUEsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uLi8uLi9saWJzL2RhdGFncmlkLWJ1aWxkZXIvc3JjL2RlZmF1bHQtY29tcG9uZW50cy1kZXRhaWxzL2NvbXBvbmVudHMvdG9wYmFyLnRzeD8yYjJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcGVuSW5GdWxsSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL09wZW5JbkZ1bGwnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIERpdmlkZXIsXG4gIEljb25CdXR0b24sXG4gIFN0YWNrLFxuICBUeXBvZ3JhcGh5LFxufSBmcm9tICdAbXVpL21hdGVyaWFsJztcbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2hvYy93aXRoLXNtYXJ0LWhpc3RvcnkvdXNlLWhpc3RvcnknO1xuXG5mdW5jdGlvbiBUb3BiYXIocHJvcHMpIHtcbiAgY29uc3QgeyB0aXRsZSwgYWN0aW9uVGV4dCwgYWN0aW9uUGFnZSwgZnVsbHNjcmVlblBhZ2UgfSA9IHByb3BzO1xuXG4gIGNvbnN0IHsgcHVzaCB9ID0gdXNlSGlzdG9yeSgpO1xuXG4gIGNvbnN0IGhhbmRsZUFjdGlvbkNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHB1c2goYWN0aW9uUGFnZSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxTdGFjayBkaXJlY3Rpb249XCJyb3dcIiBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNFwiPnt0aXRsZX08L1R5cG9ncmFwaHk+XG4gICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIgYWxpZ25JdGVtcz1cImNlbnRlclwiIHNwYWNpbmc9ezF9PlxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQWN0aW9uQ2xpY2t9PnthY3Rpb25UZXh0fTwvQnV0dG9uPlxuICAgICAgICA8RGl2aWRlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgZmxleEl0ZW0gLz5cbiAgICAgICAgPEJveD5cbiAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXtvbkZ1bGxDbGlja30+XG4gICAgICAgICAgICA8T3BlbkluRnVsbEljb24gLz5cbiAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgIDwvQm94PlxuICAgICAgPC9TdGFjaz5cbiAgICA8L1N0YWNrPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBUb3BiYXI7XG4iXSwibmFtZXMiOlsiT3BlbkluRnVsbEljb24iLCJCb3giLCJCdXR0b24iLCJEaXZpZGVyIiwiSWNvbkJ1dHRvbiIsIlN0YWNrIiwiVHlwb2dyYXBoeSIsInVzZUhpc3RvcnkiLCJUb3BiYXIiLCJwcm9wcyIsInRpdGxlIiwiYWN0aW9uVGV4dCIsImFjdGlvblBhZ2UiLCJmdWxsc2NyZWVuUGFnZSIsInB1c2giLCJoYW5kbGVBY3Rpb25DbGljayIsInVzZUNhbGxiYWNrIiwiZGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJ2YXJpYW50IiwiYWxpZ25JdGVtcyIsInNwYWNpbmciLCJvbkNsaWNrIiwib25BY3Rpb25DbGljayIsIm9yaWVudGF0aW9uIiwiZmxleEl0ZW0iLCJvbkZ1bGxDbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../../libs/datagrid-builder/src/default-components-details/components/topbar.tsx\n");

/***/ })

});