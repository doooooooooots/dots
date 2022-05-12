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

/***/ "./src/components/storage/datagrids/storage-many.js":
/*!**********************************************************!*\
  !*** ./src/components/storage/datagrids/storage-many.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dots_cool_datagrid_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dots.cool/datagrid-builder */ \"../../libs/datagrid-builder/src/index.ts\");\n/* harmony import */ var _dots_cool_schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dots.cool/schemas */ \"../../libs/schemas/src/index.ts\");\n/* harmony import */ var _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modals/storage-modal-move */ \"./src/components/storage/datagrids/modals/storage-modal-move.js\");\n/* harmony import */ var _forms_storage_form_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../forms/storage-form-create */ \"./src/components/storage/forms/storage-form-create.tsx\");\n\n\n\n\nvar context = (0,_dots_cool_schemas__WEBPACK_IMPORTED_MODULE_1__.createSchema)('storage', 'storages');\nvar StorageMany = (0,_dots_cool_datagrid_builder__WEBPACK_IMPORTED_MODULE_0__.createDetails)({\n    singular: context.singular,\n    plurial: context.plurial,\n    graphql: context.graphql,\n    variant: 'details',\n    defaultComponents: {\n    },\n    defaultComponentProps: {\n        // Filterbar\n        filterBar: {\n            actionText: 'Cr\\xe9er un nouveau Lol',\n            actionPage: {\n                path: 'create.storage',\n                title: 'Cr\\xe9er un nouveau storage',\n                Component: _forms_storage_form_create__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n            }\n        },\n        // Datagrid\n        datagrid: {},\n        // Dialog\n        dialog: {\n            components: {\n                PublishOneModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                PublishManyModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                MoveOneModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                MoveManyModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                DeleteOneModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                DeleteManyModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                UpdateOneModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n                UpdateManyModal: _modals_storage_modal_move__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n            },\n            componentProps: {}\n        },\n        topbar: {\n            actionText: 'Cr\\xe9er un nouveau Lol',\n            actionPage: {\n                path: 'create.storage',\n                title: 'Cr\\xe9er un nouveau storage',\n                Component: _forms_storage_form_create__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n            },\n            fullscreenPage: {\n                path: 'view.stock',\n                title: 'D\\xe9tails de ...',\n                Component: _forms_storage_form_create__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n            }\n        }\n    }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (StorageMany);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zdG9yYWdlL2RhdGFncmlkcy9zdG9yYWdlLW1hbnkuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMkQ7QUFDVjtBQUNhO0FBQ0Y7QUFFNUQsR0FBSyxDQUFDSSxPQUFPLEdBQUdILGdFQUFZLENBQUMsQ0FBUyxVQUFFLENBQVU7QUFFbEQsR0FBSyxDQUFDSSxXQUFXLEdBQUdMLDBFQUFhLENBQUMsQ0FBQztJQUNqQ00sUUFBUSxFQUFFRixPQUFPLENBQUNFLFFBQVE7SUFDMUJDLE9BQU8sRUFBRUgsT0FBTyxDQUFDRyxPQUFPO0lBQ3hCQyxPQUFPLEVBQUVKLE9BQU8sQ0FBQ0ksT0FBTztJQUN4QkMsT0FBTyxFQUFFLENBQVM7SUFDbEJDLGlCQUFpQixFQUFFLENBQUM7SUFRcEIsQ0FBQztJQUNEQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3RCLEVBQVk7UUFDWkMsU0FBUyxFQUFFLENBQUM7WUFDVkMsVUFBVSxFQUFFLENBQXNCO1lBQ2pDQyxVQUFTLEVBQUUsQ0FBQztnQkFDWEMsSUFBSSxFQUFFLENBQWdCO2dCQUN0QkMsS0FBSyxFQUFFLENBQTBCO2dCQUNoQ0MsU0FBUSxFQUFFZCxrRUFBaUI7WUFDOUIsQ0FBQztRQUNILENBQUM7UUFDRCxFQUFXO1FBQ1hlLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDWixFQUFTO1FBQ1RDLE1BQU0sRUFBRSxDQUFDO1lBQ1BDLFVBQVUsRUFBRSxDQUFDO2dCQUNYQyxlQUFlLEVBQUVuQixrRUFBb0I7Z0JBQ3JDb0IsZ0JBQWdCLEVBQUVwQixrRUFBb0I7Z0JBQ3RDcUIsWUFBWSxFQUFFckIsa0VBQW9CO2dCQUNsQ3NCLGFBQWEsRUFBRXRCLGtFQUFvQjtnQkFDbkN1QixjQUFjLEVBQUV2QixrRUFBb0I7Z0JBQ3BDd0IsZUFBZSxFQUFFeEIsa0VBQW9CO2dCQUNyQ3lCLGNBQWMsRUFBRXpCLGtFQUFvQjtnQkFDcEMwQixlQUFlLEVBQUUxQixrRUFBb0I7WUFDdkMsQ0FBQztZQUNEMkIsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBQ0RDLE1BQU0sRUFBRSxDQUFDO1lBQ1BqQixVQUFVLEVBQUUsQ0FBc0I7WUFDakNDLFVBQVMsRUFBRSxDQUFDO2dCQUNYQyxJQUFJLEVBQUUsQ0FBZ0I7Z0JBQ3RCQyxLQUFLLEVBQUUsQ0FBMEI7Z0JBQ2hDQyxTQUFRLEVBQUVkLGtFQUFpQjtZQUM5QixDQUFDO1lBQ0Q0QixjQUFjLEVBQUUsQ0FBQztnQkFDZmhCLElBQUksRUFBRSxDQUFZO2dCQUNsQkMsS0FBSyxFQUFFLENBQWdCO2dCQUN2QkMsU0FBUyxFQUFFZCxrRUFBaUI7WUFDOUIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUVELCtEQUFlRSxXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvc3RvcmFnZS9kYXRhZ3JpZHMvc3RvcmFnZS1tYW55LmpzPzFjYjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlRGV0YWlscyB9IGZyb20gJ0Bkb3RzLmNvb2wvZGF0YWdyaWQtYnVpbGRlcic7XG5pbXBvcnQgeyBjcmVhdGVTY2hlbWEgfSBmcm9tICdAZG90cy5jb29sL3NjaGVtYXMnO1xuaW1wb3J0IFN0b3JhZ2VNb3ZlTWFueU1vZGFsIGZyb20gJy4vbW9kYWxzL3N0b3JhZ2UtbW9kYWwtbW92ZSc7XG5pbXBvcnQgU3RvcmFnZUZvcm1DcmVhdGUgZnJvbSAnLi4vZm9ybXMvc3RvcmFnZS1mb3JtLWNyZWF0ZSc7XG5cbmNvbnN0IGNvbnRleHQgPSBjcmVhdGVTY2hlbWEoJ3N0b3JhZ2UnLCAnc3RvcmFnZXMnKTtcblxuY29uc3QgU3RvcmFnZU1hbnkgPSBjcmVhdGVEZXRhaWxzKHtcbiAgc2luZ3VsYXI6IGNvbnRleHQuc2luZ3VsYXIsXG4gIHBsdXJpYWw6IGNvbnRleHQucGx1cmlhbCxcbiAgZ3JhcGhxbDogY29udGV4dC5ncmFwaHFsLFxuICB2YXJpYW50OiAnZGV0YWlscycsXG4gIGRlZmF1bHRDb21wb25lbnRzOiB7XG4gICAgLy8gVmlld0JhcixcbiAgICAvLyBGaWx0ZXJCYXIsXG4gICAgLy8gRGF0YWdyaWQsXG4gICAgLy8gUGFnaW5hdGlvbixcbiAgICAvLyBUb29sYmFyLFxuICAgIC8vIERpYWxvZ0NvbnRlbnQsXG4gICAgLy8gQ2FyZHMsXG4gIH0sXG4gIGRlZmF1bHRDb21wb25lbnRQcm9wczoge1xuICAgIC8vIEZpbHRlcmJhclxuICAgIGZpbHRlckJhcjoge1xuICAgICAgYWN0aW9uVGV4dDogJ0Nyw6llciB1biBub3V2ZWF1IExvbCcsXG4gICAgICBhY3Rpb25QYWdlOiB7XG4gICAgICAgIHBhdGg6ICdjcmVhdGUuc3RvcmFnZScsXG4gICAgICAgIHRpdGxlOiAnQ3LDqWVyIHVuIG5vdXZlYXUgc3RvcmFnZScsXG4gICAgICAgIENvbXBvbmVudDogU3RvcmFnZUZvcm1DcmVhdGUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gRGF0YWdyaWRcbiAgICBkYXRhZ3JpZDoge30sXG4gICAgLy8gRGlhbG9nXG4gICAgZGlhbG9nOiB7XG4gICAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFB1Ymxpc2hPbmVNb2RhbDogU3RvcmFnZU1vdmVNYW55TW9kYWwsXG4gICAgICAgIFB1Ymxpc2hNYW55TW9kYWw6IFN0b3JhZ2VNb3ZlTWFueU1vZGFsLFxuICAgICAgICBNb3ZlT25lTW9kYWw6IFN0b3JhZ2VNb3ZlTWFueU1vZGFsLFxuICAgICAgICBNb3ZlTWFueU1vZGFsOiBTdG9yYWdlTW92ZU1hbnlNb2RhbCxcbiAgICAgICAgRGVsZXRlT25lTW9kYWw6IFN0b3JhZ2VNb3ZlTWFueU1vZGFsLFxuICAgICAgICBEZWxldGVNYW55TW9kYWw6IFN0b3JhZ2VNb3ZlTWFueU1vZGFsLFxuICAgICAgICBVcGRhdGVPbmVNb2RhbDogU3RvcmFnZU1vdmVNYW55TW9kYWwsXG4gICAgICAgIFVwZGF0ZU1hbnlNb2RhbDogU3RvcmFnZU1vdmVNYW55TW9kYWwsXG4gICAgICB9LFxuICAgICAgY29tcG9uZW50UHJvcHM6IHt9LFxuICAgIH0sXG4gICAgdG9wYmFyOiB7XG4gICAgICBhY3Rpb25UZXh0OiAnQ3LDqWVyIHVuIG5vdXZlYXUgTG9sJyxcbiAgICAgIGFjdGlvblBhZ2U6IHtcbiAgICAgICAgcGF0aDogJ2NyZWF0ZS5zdG9yYWdlJyxcbiAgICAgICAgdGl0bGU6ICdDcsOpZXIgdW4gbm91dmVhdSBzdG9yYWdlJyxcbiAgICAgICAgQ29tcG9uZW50OiBTdG9yYWdlRm9ybUNyZWF0ZSxcbiAgICAgIH0sXG4gICAgICBmdWxsc2NyZWVuUGFnZToge1xuICAgICAgICBwYXRoOiAndmlldy5zdG9jaycsXG4gICAgICAgIHRpdGxlOiAnRMOpdGFpbHMgZGUgLi4uJyxcbiAgICAgICAgQ29tcG9uZW50OiBTdG9yYWdlRm9ybUNyZWF0ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlTWFueTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVEZXRhaWxzIiwiY3JlYXRlU2NoZW1hIiwiU3RvcmFnZU1vdmVNYW55TW9kYWwiLCJTdG9yYWdlRm9ybUNyZWF0ZSIsImNvbnRleHQiLCJTdG9yYWdlTWFueSIsInNpbmd1bGFyIiwicGx1cmlhbCIsImdyYXBocWwiLCJ2YXJpYW50IiwiZGVmYXVsdENvbXBvbmVudHMiLCJkZWZhdWx0Q29tcG9uZW50UHJvcHMiLCJmaWx0ZXJCYXIiLCJhY3Rpb25UZXh0IiwiYWN0aW9uUGFnZSIsInBhdGgiLCJ0aXRsZSIsIkNvbXBvbmVudCIsImRhdGFncmlkIiwiZGlhbG9nIiwiY29tcG9uZW50cyIsIlB1Ymxpc2hPbmVNb2RhbCIsIlB1Ymxpc2hNYW55TW9kYWwiLCJNb3ZlT25lTW9kYWwiLCJNb3ZlTWFueU1vZGFsIiwiRGVsZXRlT25lTW9kYWwiLCJEZWxldGVNYW55TW9kYWwiLCJVcGRhdGVPbmVNb2RhbCIsIlVwZGF0ZU1hbnlNb2RhbCIsImNvbXBvbmVudFByb3BzIiwidG9wYmFyIiwiZnVsbHNjcmVlblBhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/storage/datagrids/storage-many.js\n");

/***/ })

});