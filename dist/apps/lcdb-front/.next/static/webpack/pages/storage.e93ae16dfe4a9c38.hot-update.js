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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"../../node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_icons_material_OpenInFull__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material/OpenInFull */ \"../../node_modules/@mui/icons-material/OpenInFull.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ \"../../node_modules/@mui/material/index.js\");\n/* harmony import */ var _hoc_with_smart_history_use_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hoc/with-smart-history/use-history */ \"../../libs/datagrid-builder/src/hoc/with-smart-history/use-history/index.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"../../node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Topbar(props) {\n    _s();\n    var title = props.title, actionText = props.actionText, actionPage = props.actionPage, fullscreenPage = props.fullscreenPage;\n    var push = (0,_hoc_with_smart_history_use_history__WEBPACK_IMPORTED_MODULE_1__[\"default\"])().push;\n    var handleActionClick = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function() {\n        push(actionPage);\n    }, [\n        actionPage,\n        push\n    ]);\n    var handleFullscreenClick = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function() {\n        push(fullscreenPage);\n    }, [\n        fullscreenPage,\n        push\n    ]);\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Stack, {\n        direction: \"row\",\n        justifyContent: \"space-between\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Typography, {\n                variant: \"h4\",\n                children: title\n            }, void 0, false, {\n                fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Stack, {\n                direction: \"row\",\n                alignItems: \"center\",\n                spacing: 1,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Button, {\n                        onClick: handleActionClick,\n                        children: actionText\n                    }, void 0, false, {\n                        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Divider, {\n                        orientation: \"vertical\",\n                        flexItem: true\n                    }, void 0, false, {\n                        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.IconButton, {\n                            onClick: handleFullscreenClick,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_OpenInFull__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                                fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                                lineNumber: 34,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/aeuverte/Documents/Code/dots/libs/datagrid-builder/src/default-components-details/components/topbar.tsx\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this));\n}\n_s(Topbar, \"VNVreVSIhGsEQ+x+7CfGO5Y3kcs=\", false, function() {\n    return [\n        _hoc_with_smart_history_use_history__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n    ];\n});\n_c = Topbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Topbar);\nvar _c;\n$RefreshReg$(_c, \"Topbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vbGlicy9kYXRhZ3JpZC1idWlsZGVyL3NyYy9kZWZhdWx0LWNvbXBvbmVudHMtZGV0YWlscy9jb21wb25lbnRzL3RvcGJhci50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJEO0FBUXJDO0FBQzJDO0FBQzlCOztTQUUxQlMsTUFBTSxDQUFDQyxLQUFLLEVBQUUsQ0FBQzs7SUFDdEIsR0FBSyxDQUFHQyxLQUFLLEdBQTZDRCxLQUFLLENBQXZEQyxLQUFLLEVBQUVDLFVBQVUsR0FBaUNGLEtBQUssQ0FBaERFLFVBQVUsRUFBRUMsVUFBVSxHQUFxQkgsS0FBSyxDQUFwQ0csVUFBVSxFQUFFQyxjQUFjLEdBQUtKLEtBQUssQ0FBeEJJLGNBQWM7SUFFckQsR0FBSyxDQUFHQyxJQUFJLEdBQUtSLCtFQUFVLEdBQW5CUSxJQUFJO0lBRVosR0FBSyxDQUFDQyxpQkFBaUIsR0FBR1Isa0RBQVcsQ0FBQyxRQUN4QyxHQUQ4QyxDQUFDO1FBQzNDTyxJQUFJLENBQUNGLFVBQVU7SUFDakIsQ0FBQyxFQUFFLENBQUNBO1FBQUFBLFVBQVU7UUFBRUUsSUFBSTtJQUFBLENBQUM7SUFFckIsR0FBSyxDQUFDRSxxQkFBcUIsR0FBR1Qsa0RBQVcsQ0FBQyxRQUM1QyxHQURrRCxDQUFDO1FBQy9DTyxJQUFJLENBQUNELGNBQWM7SUFDckIsQ0FBQyxFQUFFLENBQUNBO1FBQUFBLGNBQWM7UUFBRUMsSUFBSTtJQUFBLENBQUM7SUFFekIsTUFBTSw2RUFDSFYsZ0RBQUs7UUFBQ2EsU0FBUyxFQUFDLENBQUs7UUFBQ0MsY0FBYyxFQUFDLENBQWU7O3dGQUNsRGIscURBQVU7Z0JBQUNjLE9BQU8sRUFBQyxDQUFJOzBCQUFFVCxLQUFLOzs7Ozs7d0ZBQzlCTixnREFBSztnQkFBQ2EsU0FBUyxFQUFDLENBQUs7Z0JBQUNHLFVBQVUsRUFBQyxDQUFRO2dCQUFDQyxPQUFPLEVBQUUsQ0FBQzs7Z0dBQ2xEcEIsaURBQU07d0JBQUNxQixPQUFPLEVBQUVQLGlCQUFpQjtrQ0FBR0osVUFBVTs7Ozs7O2dHQUM5Q1Qsa0RBQU87d0JBQUNxQixXQUFXLEVBQUMsQ0FBVTt3QkFBQ0MsUUFBUTs7Ozs7O2dHQUN2Q3hCLDhDQUFHOzhHQUNERyxxREFBVTs0QkFBQ21CLE9BQU8sRUFBRU4scUJBQXFCO2tIQUN2Q2pCLHNFQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNM0IsQ0FBQztHQTNCUVMsTUFBTTs7UUFHSUYsMkVBQVU7OztLQUhwQkUsTUFBTTtBQTZCZiwrREFBZUEsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uLi8uLi9saWJzL2RhdGFncmlkLWJ1aWxkZXIvc3JjL2RlZmF1bHQtY29tcG9uZW50cy1kZXRhaWxzL2NvbXBvbmVudHMvdG9wYmFyLnRzeD8yYjJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPcGVuSW5GdWxsSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL09wZW5JbkZ1bGwnO1xuaW1wb3J0IHtcbiAgQm94LFxuICBCdXR0b24sXG4gIERpdmlkZXIsXG4gIEljb25CdXR0b24sXG4gIFN0YWNrLFxuICBUeXBvZ3JhcGh5LFxufSBmcm9tICdAbXVpL21hdGVyaWFsJztcbmltcG9ydCB1c2VIaXN0b3J5IGZyb20gJy4uLy4uL2hvYy93aXRoLXNtYXJ0LWhpc3RvcnkvdXNlLWhpc3RvcnknO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIFRvcGJhcihwcm9wcykge1xuICBjb25zdCB7IHRpdGxlLCBhY3Rpb25UZXh0LCBhY3Rpb25QYWdlLCBmdWxsc2NyZWVuUGFnZSB9ID0gcHJvcHM7XG5cbiAgY29uc3QgeyBwdXNoIH0gPSB1c2VIaXN0b3J5KCk7XG5cbiAgY29uc3QgaGFuZGxlQWN0aW9uQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcHVzaChhY3Rpb25QYWdlKTtcbiAgfSwgW2FjdGlvblBhZ2UsIHB1c2hdKTtcblxuICBjb25zdCBoYW5kbGVGdWxsc2NyZWVuQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcHVzaChmdWxsc2NyZWVuUGFnZSk7XG4gIH0sIFtmdWxsc2NyZWVuUGFnZSwgcHVzaF0pO1xuXG4gIHJldHVybiAoXG4gICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg0XCI+e3RpdGxlfTwvVHlwb2dyYXBoeT5cbiAgICAgIDxTdGFjayBkaXJlY3Rpb249XCJyb3dcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCIgc3BhY2luZz17MX0+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlQWN0aW9uQ2xpY2t9PnthY3Rpb25UZXh0fTwvQnV0dG9uPlxuICAgICAgICA8RGl2aWRlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgZmxleEl0ZW0gLz5cbiAgICAgICAgPEJveD5cbiAgICAgICAgICA8SWNvbkJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVGdWxsc2NyZWVuQ2xpY2t9PlxuICAgICAgICAgICAgPE9wZW5JbkZ1bGxJY29uIC8+XG4gICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvU3RhY2s+XG4gICAgPC9TdGFjaz5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9wYmFyO1xuIl0sIm5hbWVzIjpbIk9wZW5JbkZ1bGxJY29uIiwiQm94IiwiQnV0dG9uIiwiRGl2aWRlciIsIkljb25CdXR0b24iLCJTdGFjayIsIlR5cG9ncmFwaHkiLCJ1c2VIaXN0b3J5IiwidXNlQ2FsbGJhY2siLCJUb3BiYXIiLCJwcm9wcyIsInRpdGxlIiwiYWN0aW9uVGV4dCIsImFjdGlvblBhZ2UiLCJmdWxsc2NyZWVuUGFnZSIsInB1c2giLCJoYW5kbGVBY3Rpb25DbGljayIsImhhbmRsZUZ1bGxzY3JlZW5DbGljayIsImRpcmVjdGlvbiIsImp1c3RpZnlDb250ZW50IiwidmFyaWFudCIsImFsaWduSXRlbXMiLCJzcGFjaW5nIiwib25DbGljayIsIm9yaWVudGF0aW9uIiwiZmxleEl0ZW0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../../libs/datagrid-builder/src/default-components-details/components/topbar.tsx\n");

/***/ })

});