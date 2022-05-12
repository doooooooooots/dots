"use strict";
(() => {
var exports = {};
exports.id = 7638;
exports.ids = [7638];
exports.modules = {

/***/ 6217:
/***/ ((module) => {

module.exports = require("@keystone-6/auth");

/***/ }),

/***/ 3403:
/***/ ((module) => {

module.exports = require("@keystone-6/core");

/***/ }),

/***/ 9458:
/***/ ((module) => {

module.exports = require("@keystone-6/core/session");

/***/ }),

/***/ 1081:
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 3017:
/***/ ((module) => {

module.exports = require("oauth-sign");

/***/ }),

/***/ 7153:
/***/ ((module) => {

module.exports = require("papaparse");

/***/ }),

/***/ 6984:
/***/ ((module) => {

module.exports = require("xml-writer");

/***/ }),

/***/ 9343:
/***/ ((module) => {

module.exports = import("pako");;

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 4409:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* reexport safe */ _keystone__WEBPACK_IMPORTED_MODULE_0__.Z),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keystone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5735);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_keystone__WEBPACK_IMPORTED_MODULE_0__]);
_keystone__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(req, res) {
    return res.status(500);
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7098:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "px": () => (/* binding */ PORT),
/* harmony export */   "gw": () => (/* binding */ DATABASE_URL),
/* harmony export */   "$B": () => (/* binding */ SESSION_MAX_AGE),
/* harmony export */   "bJ": () => (/* binding */ SESSION_SECRET)
/* harmony export */ });
// 3000 is standard for node apps
// Once deployed, Heroku will supply this var to your app
const PORT = parseInt(process.env.PORT) || 3000;
// Postgres DB URL
// The default value here will work if you've installed Postgres on MacOS using brew
// One the app is deployed to Heroku, this var will be supplied by the Postgres addon
const DATABASE_URL = process.env.DATABASE_URL || '';
// Default to 30 days
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE) || 60 * 60 * 24 * 30;
// If the environment doesn't supply a value, default the secret to a secure random string
// This will cause all cookies to be invalidated with each app restart (annoying but better than having a hardcoded default)
// A secure value will be set in your Heroku deploy if you use the "Deploy to Heroku" button or follow the instructions in the README
const SESSION_SECRET = process.env.SESSION_SECRET || (__webpack_require__(6113).randomBytes)(32).toString('base64').replace(/[^a-zA-Z0-9]+/g, '');


/***/ }),

/***/ 5735:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1081);
/* harmony import */ var dotenv_config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _keystone_6_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3403);
/* harmony import */ var _keystone_6_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_keystone_6_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _keystone_6_core_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9458);
/* harmony import */ var _keystone_6_core_session__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_keystone_6_core_session__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _keystone_6_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6217);
/* harmony import */ var _keystone_6_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_keystone_6_auth__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8974);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7098);
/* harmony import */ var _src_api_root_seed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7534);
/* harmony import */ var _src_api_root_seed_stockfile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8546);
/* harmony import */ var _src_api_aggreagate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9233);
/* harmony import */ var _src_graphql_extend_graphql_schema__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9629);
/* harmony import */ var _src_api_root_tmp_change_pids__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5066);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_api_root_seed_stockfile__WEBPACK_IMPORTED_MODULE_7__]);
_src_api_root_seed_stockfile__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
 /// Attention utilisé parce que le .env n'était pas chargé dès le début du script










const { withAuth  } = (0,_keystone_6_auth__WEBPACK_IMPORTED_MODULE_3__.createAuth)({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: [
            'name',
            'email',
            'password'
        ]
    }
});
const session = (0,_keystone_6_core_session__WEBPACK_IMPORTED_MODULE_2__.statelessSessions)({
    maxAge: _config__WEBPACK_IMPORTED_MODULE_5__/* .SESSION_MAX_AGE */ .$B,
    secret: _config__WEBPACK_IMPORTED_MODULE_5__/* .SESSION_SECRET */ .bJ
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (withAuth((0,_keystone_6_core__WEBPACK_IMPORTED_MODULE_1__.config)({
    db: {
        provider: 'postgresql',
        useMigrations: true,
        url: _config__WEBPACK_IMPORTED_MODULE_5__/* .DATABASE_URL */ .gw
    },
    server: {
        port: _config__WEBPACK_IMPORTED_MODULE_5__/* .PORT */ .px,
        cors: {
            origin: true,
            credentials: true
        },
        extendExpressApp: (app, createContext)=>{
            app.use('/api', async (req, res, next)=>{
                req.context = await createContext(req, res);
                next();
            });
            app.get('/api/seed', _src_api_root_seed__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z);
            app.get('/api/seed-stockfile', _src_api_root_seed_stockfile__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z);
            app.get('/api/aggregate', _src_api_aggreagate__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z);
            app.get('/api/tmp-change-pids', _src_api_root_tmp_change_pids__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z);
        }
    },
    lists: _schema__WEBPACK_IMPORTED_MODULE_4__/* .lists */ .l,
    session,
    extendGraphqlSchema: _src_graphql_extend_graphql_schema__WEBPACK_IMPORTED_MODULE_8__/* .extendGraphqlSchema */ .r
})));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8974:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "l": () => (/* binding */ lists)
});

// EXTERNAL MODULE: external "@keystone-6/core"
var core_ = __webpack_require__(3403);
;// CONCATENATED MODULE: external "@keystone-6/core/fields"
const fields_namespaceObject = require("@keystone-6/core/fields");
;// CONCATENATED MODULE: ../../src/schemas/action.ts


const Action = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        description: (0,fields_namespaceObject.text)(),
        action_status: (0,fields_namespaceObject.text)(),
        result: (0,fields_namespaceObject.text)(),
        startTime: (0,fields_namespaceObject.timestamp)(),
        endTime: (0,fields_namespaceObject.timestamp)(),
        expectedStartTime: (0,fields_namespaceObject.timestamp)(),
        expectedEndTime: (0,fields_namespaceObject.timestamp)(),
        agent: (0,fields_namespaceObject.relationship)({
            ref: 'Person.actions',
            many: false
        }),
        comments: (0,fields_namespaceObject.relationship)({
            ref: 'Comment',
            many: true
        }),
        ratings: (0,fields_namespaceObject.relationship)({
            ref: 'Rating',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/fields/tracker-date.ts

const createdAt = {
    createdAt: (0,fields_namespaceObject.timestamp)({
        defaultValue: {
            kind: 'now'
        },
        db: {
            updatedAt: true
        }
    })
};
const updatedAt = {
    updatedAt: (0,fields_namespaceObject.timestamp)({
        defaultValue: {
            kind: 'now'
        },
        db: {
            updatedAt: true
        }
    })
};
const trackerDate = {
    ...updatedAt,
    ...createdAt
};

;// CONCATENATED MODULE: ../../src/schemas/fields/tracker-user.ts

const createdBy = {
    createdBy: (0,fields_namespaceObject.relationship)({
        ref: 'Person',
        many: false
    })
};
const updatedBy = {
    updatedBy: (0,fields_namespaceObject.relationship)({
        ref: 'Person',
        many: false
    })
};
const trackerPerson = {
    ...createdBy,
    ...updatedBy
};

;// CONCATENATED MODULE: ../../src/schemas/article.ts




const Article = (0,core_.list)({
    fields: {
        status: (0,fields_namespaceObject.text)(),
        product: (0,fields_namespaceObject.relationship)({
            ref: 'Product.articles',
            many: false
        }),
        condition: (0,fields_namespaceObject.relationship)({
            ref: 'Condition.articles',
            many: false
        }),
        language: (0,fields_namespaceObject.relationship)({
            ref: 'Language',
            many: false
        }),
        priceSuggested: (0,fields_namespaceObject.relationship)({
            ref: 'Price',
            many: true
        }),
        stockUnits: (0,fields_namespaceObject.relationship)({
            ref: 'StockUnit.article',
            many: true
        }),
        reconciliations: (0,fields_namespaceObject.relationship)({
            ref: 'ArticleReconciliation.articleId',
            many: true
        }),
        ...updatedAt,
        ...updatedBy,
        //--
        isSigned: (0,fields_namespaceObject.checkbox)(),
        isFirstEd: (0,fields_namespaceObject.checkbox)(),
        isAltered: (0,fields_namespaceObject.checkbox)(),
        isFoil: (0,fields_namespaceObject.checkbox)(),
        isReverseHolo: (0,fields_namespaceObject.checkbox)(),
        isPlayset: (0,fields_namespaceObject.checkbox)(),
        // TODO(Adrien): create aggregate logic
        aggregateCount: (0,fields_namespaceObject.virtual)({
            field: core_.graphql.field({
                type: core_.graphql.Int,
                args: {
                    something: core_.graphql.arg({
                        type: core_.graphql.Int
                    })
                },
                resolve (item, args, context, info) {
                    return 0;
                }
            })
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/article-reconciliation.ts


const ArticleReconciliation = (0,core_.list)({
    fields: {
        plateform: (0,fields_namespaceObject.relationship)({
            ref: 'Plateform.articles',
            many: false
        }),
        articleId: (0,fields_namespaceObject.relationship)({
            ref: 'Article.reconciliations',
            many: false
        }),
        localPid: (0,fields_namespaceObject.text)()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/batch.ts


const Batch = (0,core_.list)({
    fields: {
        condition: (0,fields_namespaceObject.text)(),
        expansion: (0,fields_namespaceObject.text)(),
        time: (0,fields_namespaceObject.integer)(),
        article_number: (0,fields_namespaceObject.integer)(),
        createdAt: (0,fields_namespaceObject.timestamp)(),
        updatedAt: (0,fields_namespaceObject.timestamp)(),
        operator: (0,fields_namespaceObject.relationship)({
            ref: 'Person',
            many: false
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/batch-prod.ts


const BatchProd = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        articles: (0,fields_namespaceObject.relationship)({
            ref: 'Article',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/category.ts


const Category = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        products: (0,fields_namespaceObject.relationship)({
            ref: 'Product.category',
            many: true
        }),
        idMkm: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/comment.ts


const Comment = (0,core_.list)({
    fields: {
        text: (0,fields_namespaceObject.text)()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/condition.ts


const Condition = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        value: (0,fields_namespaceObject.integer)({
            isIndexed: 'unique'
        }),
        code: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        articles: (0,fields_namespaceObject.relationship)({
            ref: 'Article.condition',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/control-action.ts


const ControlAction = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        description: (0,fields_namespaceObject.text)(),
        action_status: (0,fields_namespaceObject.text)(),
        result: (0,fields_namespaceObject.text)(),
        start_time: (0,fields_namespaceObject.timestamp)(),
        end_time: (0,fields_namespaceObject.timestamp)(),
        expected_start_time: (0,fields_namespaceObject.timestamp)(),
        expected_end_time: (0,fields_namespaceObject.timestamp)(),
        agent: (0,fields_namespaceObject.relationship)({
            ref: 'Person',
            many: false
        }),
        targetStorage: (0,fields_namespaceObject.relationship)({
            ref: 'Storage',
            many: false
        }),
        comments: (0,fields_namespaceObject.relationship)({
            ref: 'Comment',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/country.ts


const Country = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        native: (0,fields_namespaceObject.text)(),
        code: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        phone: (0,fields_namespaceObject.integer)(),
        capital: (0,fields_namespaceObject.text)(),
        currencies: (0,fields_namespaceObject.relationship)({
            ref: 'Currency.countries',
            many: true
        }),
        languages: (0,fields_namespaceObject.relationship)({
            ref: 'Language',
            many: true
        }),
        emoji: (0,fields_namespaceObject.text)(),
        emojiU: (0,fields_namespaceObject.text)()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/country-group.ts


const CountryGroup = (0,core_.list)({
    fields: {
        code: (0,fields_namespaceObject.text)(),
        name: (0,fields_namespaceObject.text)(),
        countries: (0,fields_namespaceObject.relationship)({
            ref: 'Country',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/currency.ts


const Currency = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        namePlural: (0,fields_namespaceObject.text)(),
        code: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        symbol: (0,fields_namespaceObject.text)(),
        symbolNative: (0,fields_namespaceObject.text)(),
        decimalDigits: (0,fields_namespaceObject.integer)(),
        countries: (0,fields_namespaceObject.relationship)({
            ref: 'Country.currencies',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/expansion.ts


const Expansion = (0,core_.list)({
    fields: {
        abbreviation: (0,fields_namespaceObject.text)(),
        slug: (0,fields_namespaceObject.text)(),
        icon: (0,fields_namespaceObject.text)(),
        dateRelease: (0,fields_namespaceObject.timestamp)(),
        isReleased: (0,fields_namespaceObject.checkbox)(),
        areProductsLoaded: (0,fields_namespaceObject.checkbox)({
            defaultValue: false
        }),
        game: (0,fields_namespaceObject.relationship)({
            ref: 'Game.expansions',
            many: false
        }),
        products: (0,fields_namespaceObject.relationship)({
            ref: 'Product.expansion',
            many: true
        }),
        storages: (0,fields_namespaceObject.relationship)({
            ref: 'Storage.expansions',
            many: true
        }),
        locals: (0,fields_namespaceObject.relationship)({
            ref: 'ExpansionLocal.expansion',
            many: true
        }),
        reconciliations: (0,fields_namespaceObject.relationship)({
            ref: 'ExpansionReconciliation.expansionId',
            many: true
        }),
        updatedAt: (0,fields_namespaceObject.timestamp)({
            db: {
                updatedAt: true
            }
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/expansion-local.ts


const ExpansionLocal = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        imageToken: (0,fields_namespaceObject.text)(),
        language: (0,fields_namespaceObject.relationship)({
            ref: 'Language',
            many: false
        }),
        expansion: (0,fields_namespaceObject.relationship)({
            ref: 'Expansion.locals',
            many: false
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/expansion-reconciliation.ts


const ExpansionReconciliation = (0,core_.list)({
    fields: {
        plateform: (0,fields_namespaceObject.relationship)({
            ref: 'Plateform.expansions',
            many: false
        }),
        expansionId: (0,fields_namespaceObject.relationship)({
            ref: 'Expansion.reconciliations',
            many: false
        }),
        localPid: (0,fields_namespaceObject.text)()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/game.ts


const Game = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        code: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        productModels: (0,fields_namespaceObject.relationship)({
            ref: 'ProductModel.game',
            many: true
        }),
        expansions: (0,fields_namespaceObject.relationship)({
            ref: 'Expansion.game',
            many: true
        }),
        idMkm: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/language.ts


const Language = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        code: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        native: (0,fields_namespaceObject.text)(),
        rtl: (0,fields_namespaceObject.checkbox)({
            defaultValue: false
        }),
        idMkm: (0,fields_namespaceObject.text)({
            isIndexed: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/link.ts


const Link = (0,core_.list)({
    fields: {
        targetId: (0,fields_namespaceObject.text)(),
        targetType: (0,fields_namespaceObject.text)(),
        targetField: (0,fields_namespaceObject.text)()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/media-object.ts


const MediaObject = (0,core_.list)({
    fields: {
        typeOf: (0,fields_namespaceObject.text)(),
        extension: (0,fields_namespaceObject.text)(),
        name: (0,fields_namespaceObject.text)(),
        description: (0,fields_namespaceObject.text)(),
        alt: (0,fields_namespaceObject.text)(),
        url: (0,fields_namespaceObject.text)(),
        backlinks: (0,fields_namespaceObject.relationship)({
            ref: 'Link',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/fields/tracker-create.ts


const trackerCreate = {
    ...createdAt,
    ...createdBy
};

;// CONCATENATED MODULE: ../../src/schemas/offer.ts



const Offer = (0,core_.list)({
    fields: {
        pid: (0,fields_namespaceObject.text)(),
        status: (0,fields_namespaceObject.text)(),
        prices: (0,fields_namespaceObject.relationship)({
            ref: 'PriceOffer.offer',
            many: true
        }),
        eligibleQuantity: (0,fields_namespaceObject.integer)(),
        stockUnit: (0,fields_namespaceObject.relationship)({
            ref: 'StockUnit.offers',
            many: false
        }),
        plateform: (0,fields_namespaceObject.relationship)({
            ref: 'Plateform.offers',
            many: false
        }),
        lastPrice: (0,fields_namespaceObject.virtual)({
            field: (lists)=>core_.graphql.field({
                    type: lists.PriceOffer.types.output,
                    async resolve (item, args, context) {
                        const { prices  } = await context.query.Offer.findOne({
                            where: {
                                id: item.id.toString()
                            },
                            query: `prices(
                    orderBy: { createdAt: desc }
                    take: 1
                  ) { id }`
                        });
                        if (prices.length > 0) {
                            return context.db.PriceOffer.findOne({
                                where: {
                                    id: prices[0].id
                                }
                            });
                        }
                    }
                })
            ,
            ui: {
                query: '{ value createdAt }'
            }
        }),
        ...trackerCreate
    }
});

;// CONCATENATED MODULE: ../../src/schemas/person.ts


const Person = (0,core_.list)({
    fields: {
        // TODO(Adrien): Add unique logic scoping each workspace
        pid: (0,fields_namespaceObject.text)({
            isIndexed: true
        }),
        familyName: (0,fields_namespaceObject.text)({
            validation: {
                isRequired: false
            }
        }),
        givenName: (0,fields_namespaceObject.text)({
            validation: {
                isRequired: false
            }
        }),
        email: (0,fields_namespaceObject.text)({
            validation: {
                isRequired: false
            }
        }),
        account: (0,fields_namespaceObject.relationship)({
            ref: 'User.profile',
            many: false
        }),
        ratings: (0,fields_namespaceObject.relationship)({
            ref: 'Rating.author',
            many: true
        }),
        actions: (0,fields_namespaceObject.relationship)({
            ref: 'Action.agent',
            many: true
        })
    },
    ui: {
        listView: {
            initialColumns: [
                'familyName',
                'givenName',
                'email'
            ]
        }
    }
});

;// CONCATENATED MODULE: ../../src/schemas/plateform.ts


const Plateform = (0,core_.list)({
    fields: {
        pid: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        name: (0,fields_namespaceObject.text)(),
        products: (0,fields_namespaceObject.relationship)({
            ref: 'ProductReconciliation.plateform',
            many: true
        }),
        articles: (0,fields_namespaceObject.relationship)({
            ref: 'ArticleReconciliation.plateform',
            many: true
        }),
        expansions: (0,fields_namespaceObject.relationship)({
            ref: 'ExpansionReconciliation.plateform',
            many: true
        }),
        offers: (0,fields_namespaceObject.relationship)({
            ref: 'Offer.plateform',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/price.ts



const Price = (0,core_.list)({
    fields: {
        value: (0,fields_namespaceObject.float)(),
        currency: (0,fields_namespaceObject.relationship)({
            ref: 'Currency',
            many: false
        }),
        ...trackerCreate
    }
});

;// CONCATENATED MODULE: ../../src/schemas/price-offer.ts



const PriceOffer = (0,core_.list)({
    fields: {
        value: (0,fields_namespaceObject.float)(),
        currency: (0,fields_namespaceObject.relationship)({
            ref: 'Currency',
            many: false
        }),
        offer: (0,fields_namespaceObject.relationship)({
            ref: 'Offer.prices',
            many: false
        }),
        ...trackerCreate
    }
});

;// CONCATENATED MODULE: ../../src/schemas/pricing.ts


const Pricing = (0,core_.list)({
    fields: {
        prices: (0,fields_namespaceObject.relationship)({
            ref: 'Price',
            many: true
        }),
        countries: (0,fields_namespaceObject.relationship)({
            ref: 'Country',
            many: true
        }),
        zones: (0,fields_namespaceObject.relationship)({
            ref: 'CountryGroup',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/fields/media-object.ts

const mediaObject = ()=>(0,fields_namespaceObject.relationship)({
        ref: 'MediaObject',
        many: false,
        hooks: {
            afterOperation: async ({ listKey , fieldKey , operation , item , context ,  })=>{
                if (operation === 'create') {
                    context.db.MediaObject.updateOne({
                        where: {
                            id: item.imageId
                        },
                        data: {
                            backlinks: {
                                create: {
                                    targetId: item.id,
                                    targetType: listKey,
                                    targetField: fieldKey
                                }
                            }
                        }
                    });
                }
            }
        }
    })
;

;// CONCATENATED MODULE: ../../src/schemas/product.ts



const Product = (0,core_.list)({
    fields: {
        status: (0,fields_namespaceObject.text)(),
        number: (0,fields_namespaceObject.text)(),
        website: (0,fields_namespaceObject.text)(),
        locals: (0,fields_namespaceObject.relationship)({
            ref: 'ProductLocal',
            many: true
        }),
        countSells: (0,fields_namespaceObject.integer)(),
        priceStrategy: (0,fields_namespaceObject.integer)(),
        image: mediaObject(),
        links: (0,fields_namespaceObject.relationship)({
            ref: 'Link',
            many: true
        }),
        articles: (0,fields_namespaceObject.relationship)({
            ref: 'Article.product',
            many: true
        }),
        expansion: (0,fields_namespaceObject.relationship)({
            ref: 'Expansion.products',
            many: false
        }),
        productModel: (0,fields_namespaceObject.relationship)({
            ref: 'ProductModel.products',
            many: false
        }),
        category: (0,fields_namespaceObject.relationship)({
            ref: 'Category.products',
            many: false
        }),
        rarity: (0,fields_namespaceObject.relationship)({
            ref: 'Rarity.products',
            many: false
        }),
        reconciliations: (0,fields_namespaceObject.relationship)({
            ref: 'ProductReconciliation.productId',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/product-local.ts



const ProductLocal = (0,core_.list)({
    fields: {
        language: (0,fields_namespaceObject.relationship)({
            ref: 'Language',
            many: false
        }),
        name: (0,fields_namespaceObject.text)(),
        image: mediaObject()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/product-model.ts


const ProductModel = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)(),
        products: (0,fields_namespaceObject.relationship)({
            ref: 'Product.productModel',
            many: true
        }),
        game: (0,fields_namespaceObject.relationship)({
            ref: 'Game.productModels',
            many: false
        }),
        idMkm: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/product-reconciliation.ts


const ProductReconciliation = (0,core_.list)({
    fields: {
        plateform: (0,fields_namespaceObject.relationship)({
            ref: 'Plateform.products',
            many: false
        }),
        productId: (0,fields_namespaceObject.relationship)({
            ref: 'Product.reconciliations',
            many: false
        }),
        localPid: (0,fields_namespaceObject.text)()
    }
});

;// CONCATENATED MODULE: ../../src/schemas/stock-unit-quantity.ts




const StockUnitQuantity = (0,core_.list)({
    fields: {
        value: (0,fields_namespaceObject.integer)(),
        stockUnit: (0,fields_namespaceObject.relationship)({
            ref: 'StockUnit.quantityVariations',
            many: false
        }),
        ...trackerCreate
    }
});

;// CONCATENATED MODULE: ../../src/schemas/rarity.ts


const Rarity = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        value: (0,fields_namespaceObject.integer)({
            isIndexed: 'unique'
        }),
        group: (0,fields_namespaceObject.integer)(),
        products: (0,fields_namespaceObject.relationship)({
            ref: 'Product.rarity',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/rating.ts


const Rating = (0,core_.list)({
    fields: {
        value: (0,fields_namespaceObject.integer)(),
        author: (0,fields_namespaceObject.relationship)({
            ref: 'Person.ratings',
            many: false
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/stock-unit.ts



const StockUnit = (0,core_.list)({
    fields: {
        quantity: (0,fields_namespaceObject.integer)({
            defaultValue: 0,
            access: {
                update: ()=>false
            }
        }),
        quantityVariations: (0,fields_namespaceObject.relationship)({
            ref: 'StockUnitQuantity.stockUnit',
            many: true,
            hooks: {
                afterOperation: async ({ item , context  })=>{
                    // Prevent operation after item has been deleted
                    if (!item) return;
                    const { quantityVariations  } = await context.query.StockUnit.findOne({
                        where: {
                            id: item.id.toString()
                        },
                        query: `quantityVariations(
                        orderBy: { createdAt: desc }
                        take: 1
                      ) { id value }`
                    });
                    if (quantityVariations.length > 0) {
                        await context.prisma.stockUnit.update({
                            where: {
                                id: item.id.toString()
                            },
                            data: {
                                quantity: quantityVariations[0].value
                            }
                        });
                    } else {
                        await context.prisma.stockUnit.update({
                            where: {
                                id: item.id.toString()
                            },
                            data: {
                                quantity: 0
                            }
                        });
                    }
                }
            }
        }),
        article: (0,fields_namespaceObject.relationship)({
            ref: 'Article.stockUnits',
            many: false
        }),
        storage: (0,fields_namespaceObject.relationship)({
            ref: 'Storage.stockUnits',
            many: false
        }),
        offers: (0,fields_namespaceObject.relationship)({
            ref: 'Offer.stockUnit',
            many: true
        })
    }
});

;// CONCATENATED MODULE: ../../src/schemas/storage.ts



const Storage = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)({
            isIndexed: 'unique'
        }),
        game: (0,fields_namespaceObject.relationship)({
            ref: 'Game',
            many: false
        }),
        stockUnits: (0,fields_namespaceObject.relationship)({
            ref: 'StockUnit.storage',
            many: true
        }),
        expansions: (0,fields_namespaceObject.relationship)({
            ref: 'Expansion.storages',
            many: true
        }),
        ...trackerCreate
    }
});

;// CONCATENATED MODULE: ../../src/schemas/user.ts


const User = (0,core_.list)({
    fields: {
        name: (0,fields_namespaceObject.text)({
            validation: {
                isRequired: true
            }
        }),
        email: (0,fields_namespaceObject.text)({
            validation: {
                isRequired: true
            },
            isIndexed: 'unique',
            isFilterable: true
        }),
        password: (0,fields_namespaceObject.password)({
            validation: {
                isRequired: true
            }
        }),
        profile: (0,fields_namespaceObject.relationship)({
            ref: 'Person.account',
            many: false
        })
    },
    ui: {
        listView: {
            initialColumns: [
                'email'
            ]
        }
    }
});

;// CONCATENATED MODULE: ../../schema.ts



































const lists = {
    Action: Action,
    Article: Article,
    ArticleReconciliation: ArticleReconciliation,
    Batch: Batch,
    BatchProd: BatchProd,
    Category: Category,
    Comment: Comment,
    Condition: Condition,
    ControlAction: ControlAction,
    Country: Country,
    CountryGroup: CountryGroup,
    Currency: Currency,
    Expansion: Expansion,
    ExpansionLocal: ExpansionLocal,
    ExpansionReconciliation: ExpansionReconciliation,
    Game: Game,
    Language: Language,
    Link: Link,
    MediaObject: MediaObject,
    Offer: Offer,
    Person: Person,
    Plateform: Plateform,
    Price: Price,
    PriceOffer: PriceOffer,
    Pricing: Pricing,
    Product: Product,
    ProductLocal: ProductLocal,
    ProductModel: ProductModel,
    ProductReconciliation: ProductReconciliation,
    StockUnitQuantity: StockUnitQuantity,
    Rarity: Rarity,
    Rating: Rating,
    StockUnit: StockUnit,
    Storage: Storage,
    User: User
};


/***/ }),

/***/ 9233:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ aggregate)
/* harmony export */ });
async function aggregate(req, res) {
    const context = req.context;
    try {
        const aggregates = await context.prisma.quantity.aggregate({
            _count: {
                _all: true
            },
            _max: {
                value: true
            },
            _min: {
                value: true
            },
            _sum: {
                value: true
            }
        });
        res.json(aggregates);
    } catch (err) {
        return res.json(err.message);
    }
};


/***/ }),

/***/ 2614:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = this && this.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};
exports.__esModule = true;
var crypto_1 = __importDefault(__webpack_require__(6113));
var oauth_sign_1 = __webpack_require__(3017);
var isAbsoluteURL = function(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
var combineURLs = function(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};
var generateNonce = function(size) {
    if (size === void 0) {
        size = 16;
    }
    const tpm = crypto_1['default'].randomBytes(0 | size * 0.75).toString('base64').replaceAll(/[^a-zA-Z0-9]+/g, 'Z');
    return tpm;
};
var calculateBodyHash = function(signatureMethod, data) {
    var buf = Buffer.isBuffer(data) ? data : typeof data === 'string' ? Buffer.from(data) : !data ? Buffer.from('') : Buffer.from(JSON.stringify(data));
    return crypto_1['default'].createHash(signatureMethod === 'HMAC-SHA1' ? 'sha1' : 'sha256').update(buf).digest('base64');
};
var addOAuthInterceptor = function(client, _a) {
    var _b = _a.algorithm, algorithm = _b === void 0 ? 'HMAC-SHA256' : _b, _c = _a.includeBodyHash, includeBodyHash = _c === void 0 ? 'auto' : _c, key1 = _a.key, realm = _a.realm, secret = _a.secret, _d = _a.token, token = _d === void 0 ? null : _d, _e = _a.tokenSecret, tokenSecret = _e === void 0 ? null : _e, _f = _a.callback, callback = _f === void 0 ? null : _f, _g = _a.verifier, verifier = _g === void 0 ? null : _g;
    client.interceptors.request.use(function(config) {
        var method = (config.method || 'GET').toUpperCase();
        var oauthParams = {
            oauth_consumer_key: key1,
            oauth_nonce: generateNonce(),
            oauth_signature_method: algorithm,
            oauth_timestamp: String(Math.floor(Date.now() * 0.001)),
            oauth_version: '1.0'
        };
        // if provided, oauth_token can be included in the oauth parameters
        // more information: https://datatracker.ietf.org/doc/html/rfc5849#section-3.1
        if (token) {
            oauthParams.oauth_token = token;
        }
        if (callback) {
            oauthParams.oauth_callback = callback;
        }
        if (verifier) {
            oauthParams.oauth_verifier = verifier;
        }
        var oauthUrl = new URL(!config.baseURL || isAbsoluteURL(config.url) ? config.url : combineURLs(config.baseURL, config.url));
        var paramsToSign = {};
        // Add one key/value pair to paramsToSign
        var addParamToSign = function(key, value) {
            var existingValue = paramsToSign[key];
            if (typeof existingValue === 'string') {
                paramsToSign[key] = [
                    existingValue,
                    value
                ];
            } else if (Array.isArray(existingValue)) {
                existingValue.push(value);
            } else {
                paramsToSign[key] = value;
            }
        };
        // Add multiple key/value pairs to paramsToSign
        var addParamsToSign = function(m) {
            new URLSearchParams(m).forEach(function(value, key) {
                return addParamToSign(key, value);
            });
        };
        addParamsToSign(oauthParams);
        if (config.params) {
            addParamsToSign(config.params);
        }
        // Query parameters are hashed as part of params rather than as part of the URL
        if (oauthUrl.search) {
            addParamsToSign(oauthUrl.searchParams);
            oauthUrl.search = '';
        }
        // Do not include hash in signature
        oauthUrl.hash = '';
        // Remove port if it is the default for that protocol
        if (oauthUrl.protocol === 'https:' && oauthUrl.port === '443' || oauthUrl.protocol === 'http:' && oauthUrl.port === '80') {
            oauthUrl.port = '';
        }
        // If they are submitting a form, then include form parameters in the
        // signature as parameters rather than the body hash
        if (config.headers['content-type'] === 'application/x-www-form-urlencoded') {
            addParamsToSign(config.data);
        } else if (includeBodyHash === true || config.data && includeBodyHash === 'auto' && [
            'POST',
            'PUT'
        ].includes(method)) {
            var bodyHash = calculateBodyHash(algorithm, config.data);
            oauthParams.oauth_body_hash = bodyHash;
            addParamToSign('oauth_body_hash', bodyHash);
        }
        oauthParams.oauth_signature = (0, oauth_sign_1.sign)(algorithm, method, oauthUrl.toString(), paramsToSign, secret, tokenSecret);
        // realm should not be included in the signature calculation
        // but is optional in the OAuth 1.0 Authorization header
        // so we need to add it after signing the request
        // more information: https://datatracker.ietf.org/doc/html/rfc5849#section-3.4.1.3.1
        if (realm) {
            oauthParams.realm = realm;
        }
        var authorization = [
            'OAuth',
            Object.entries(oauthParams).map(function(e) {
                return [
                    e[0],
                    '="',
                    (0, oauth_sign_1.rfc3986)(e[1]),
                    '"'
                ].join('');
            }).join(',')
        ].join(' ');
        return __assign(__assign({}, config), {
            headers: __assign(__assign({}, config.headers), {
                authorization: authorization
            })
        });
    });
};
exports["default"] = addOAuthInterceptor;


/***/ }),

/***/ 1894:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ fetch_mkm)
});

;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
// EXTERNAL MODULE: ../../src/api/mkm/axios-middleware-o-auth-interceptor.js
var axios_middleware_o_auth_interceptor = __webpack_require__(2614);
var axios_middleware_o_auth_interceptor_default = /*#__PURE__*/__webpack_require__.n(axios_middleware_o_auth_interceptor);
;// CONCATENATED MODULE: ../../src/api/mkm/axios-mkm.ts


const baseURL = 'https://api.cardmarket.com/ws/v2.0/output.json';
const axiosInstance = external_axios_default().create({
    baseURL,
    timeout: 60000
});
axiosInstance.interceptors.response.use((response)=>response
, (error)=>{
    console.error('❌ Axios Error - ', error);
    return error.response;
});
axiosInstance.interceptors.request.use((request)=>{
    const { headers , url  } = request;
    const { authorization  } = headers;
    const strToReplace = encodeURIComponent('{{%url%}}');
    headers.authorization = authorization.replace(strToReplace, encodeURIComponent(url.split('?')[0]));
    return request;
});
// Specify the OAuth options
const options = {
    algorithm: 'HMAC-SHA1',
    key: 'KSmgd06K8l6eTNfZ',
    secret: 'JNEZhVZJVVt6lUUplsEAMpxLaF9IOyd3',
    token: 'ejrSEzEokDM1VE9qkdaWZT2qbqBD8jDj',
    tokenSecret: 'pGYA2DG4ordtC92S5yufo8cWNBUEEba6',
    realm: `${baseURL}{{%url%}}`,
    includeBodyHash: false
};
// Add interceptor that signs requests
axios_middleware_o_auth_interceptor_default()(axiosInstance, options);
/* harmony default export */ const axios_mkm = (axiosInstance);

;// CONCATENATED MODULE: ../../src/api/mkm/fetch-mkm.ts

const fetchMkm = async (url, method = 'post', body = {}, config = {})=>{
    let response = null;
    if ([
        'post',
        'put'
    ].includes(method)) {
        config = {
            ...config,
            headers: {
                'Content-Type': 'text/xml; charset=UTF8'
            }
        };
    }
    try {
        response = await axios_mkm[method](url, body, config);
        return response;
    } catch (err) {
        return err;
    }
};
/* harmony default export */ const fetch_mkm = (fetchMkm);


/***/ }),

/***/ 7852:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MJ": () => (/* binding */ getStockFile)
/* harmony export */ });
/* unused harmony exports prepareToCreateOrUpdateMkm, prepareToDeleteOrUpdateMkm, createCardsInMKM, updateCardsInMKM, updateStockInMKM, increaseStockInMKM, decreaseStockInMKM, deleteCardsInMKM */
/* harmony import */ var _fetch_mkm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1894);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7153);
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var xml_writer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6984);
/* harmony import */ var xml_writer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(xml_writer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var pako__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9343);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pako__WEBPACK_IMPORTED_MODULE_4__]);
pako__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





// MKM https://api.cardmarket.com/ws/documentation/API_2.0:Stock_Management
const routes = {
    GET: {
        stock: (offset)=>`/stock/${offset}`
        ,
        stockFile: ({ idGame =1 , isSealed =false , idLanguage =1  })=>`/stock/file?idGame=${idGame}&isSealed=${isSealed}&idLanguage=${idLanguage}`
        ,
        inShoppingCart: '/stock/shoppingcart-articles',
        stockArticle: (idArticle)=>`/stock/article/${idArticle}`
        ,
        findStockArticle: (name, idGame)=>`/stock/articles/${name}/${idGame}`
    },
    POST: {
        create: '/stock'
    },
    PUT: {
        update: '/stock',
        increaseQuantity: '/stock/increase',
        decreaseQuantity: '/stock/decrease'
    },
    DELETE: {
        delete: '/stock'
    }
};
// *FUNC -- Create xml object
const createXMLArticlesRequest = (inputs)=>{
    const xw = new XMLWriter(true);
    xw.startDocument('1.0', 'UTF-8');
    xw.startElement('request');
    inputs.forEach((article)=>{
        xw.startElement('article');
        Object.entries(article).forEach(([key, value])=>{
            xw.writeElement(key, `${value}`);
        });
        xw.endElement();
    });
    xw.endDocument();
    return xw.toString();
};
// *FUNC - Format list to be sent in Mkm
const prepareToCreateOrUpdateMkm = ({ allIds , byId  })=>allIds.map((id)=>{
        const item = byId[id];
        return {
            idProduct: parseInt(item.pid, 10),
            idLanguage: parseInt(item.language_id, 10),
            count: item.count_mkm,
            price: item.price_suggested,
            condition: item.condition,
            isFirstEd: item.is_first_ed === 't' ? true : false,
            isFoil: false,
            isAltered: false,
            isPlayset: false,
            isReverseHolo: false,
            comments: item.comments
        };
    }).filter((item)=>item.price !== 999 && item.count
    )
;
// *FUNC - Format list to be delete in Mkm
const prepareToDeleteOrUpdateMkm = (stock)=>stock.map((item)=>{
        return {
            idArticle: item.id,
            count: item.count
        };
    })
;
/**
 * CREATE
 */ // *FUNC -- Create cards
const createCardsInMKM = (inputs)=>{
    if (isEmpty(inputs)) return false;
    const list = prepareToCreateOrUpdateMkm(inputs);
    const body = createXMLArticlesRequest(list);
    return fetchMkm(routes.POST.create, 'post', body, {
        headers: {
            'Content-Type': 'text/xml; charset=UTF8'
        }
    });
};
/**
 * UPDATE
 */ // *FUNC -- Update cards
const updateCardsInMKM = (inputs)=>{
    if (isEmpty(inputs)) return false;
    const list = prepareToCreateOrUpdateMkm(inputs);
    const body = createXMLArticlesRequest(list);
    return fetchMkm(routes.PUT.update, 'put', body, {
        headers: {
            'Content-Type': 'text/xml; charset=UTF8'
        }
    });
};
// *FUNC -- Update Stock
const updateStockInMKM = (inputs, action)=>{
    if (isEmpty(inputs)) return false;
    const list = prepareToCreateOrUpdateMkm(inputs);
    const body = createXMLArticlesRequest(list);
    return fetchMkm(routes.PUT[action], 'put', body, {
        headers: {
            'Content-Type': 'text/xml; charset=UTF8'
        }
    });
};
const increaseStockInMKM = (inputs)=>{
    updateStockInMKM(inputs, 'increaseQuantity');
};
const decreaseStockInMKM = (inputs)=>{
    updateStockInMKM(inputs, 'decreaseQuantity');
};
/**
 * DELETE
 */ // *FUNC -- Delete cards
const deleteCardsInMKM = async (inputs)=>{
    const body = createXMLArticlesRequest(inputs);
    await fetchMkm(routes.DELETE.delete, 'delete', {
        data: body
    });
    return true;
};
/**
 * STOCK
 */ const getStockFile = async (inputs = {})=>{
    const res = await (0,_fetch_mkm__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(routes.GET.stockFile(inputs), 'get');
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject)=>{
        // Get some base64 encoded binary data from the server. Imagine we got this:
        const b64Data = res.data.stock;
        // Decode base64 (convert ascii to binary)
        var strData = atob(b64Data);
        // Convert binary string to character-number array
        var charData = strData.split('').map(function(x) {
            return x.charCodeAt(0);
        });
        // Turn number array into byte-array
        // eslint-disable-next-line no-undef
        var binData = new Uint8Array(charData);
        let csv = pako__WEBPACK_IMPORTED_MODULE_4__["default"].ungzip(binData);
        // eslint-disable-next-line no-undef
        csv = new TextDecoder('utf-8').decode(csv);
        papaparse__WEBPACK_IMPORTED_MODULE_1___default().parse(csv, {
            download: false,
            header: true,
            complete: function(results) {
                resolve(results);
            },
            error: (error)=>{
                reject(error);
            }
        });
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8546:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ seedStockfile)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_get_language__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9148);
/* harmony import */ var _mkm_mkm_stock_management__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7852);
/* harmony import */ var _helpers_mkm_pids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5712);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_mkm_mkm_stock_management__WEBPACK_IMPORTED_MODULE_2__]);
_mkm_mkm_stock_management__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





// STORAGE
const extractStorageNameFromComment = (comment)=>{
    if (comment) {
        const _comment = comment.split('-');
        if (_comment.length > 1) {
            return _comment[0];
        }
    }
    return null;
};
const isExistingStorage = (storageName, storageList)=>{
    return storageName && storageList.includes(storageName);
};
// FORMAT
const formatData = (article)=>({
        productId: article['idProduct'],
        conditionCode: article['Condition'],
        languageId: article['Language'],
        isSigned: article['Signed?'] === 'X',
        isFirstEd: article['FirstEd?'] === 'X',
        isAltered: article['Altered?'] === 'X',
        price: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.ceil)(parseFloat(article['Price']), 2),
        quantity: (0,lodash__WEBPACK_IMPORTED_MODULE_0__.round)(parseInt(article['Amount'], 10), 0),
        currencyCode: article['Currency Code'],
        storageName: extractStorageNameFromComment(article['Comments'])
    })
;
// UTILS -- CREATE FUNCTION
const createArticle = (pid, data)=>({
        pid,
        status: 'published',
        product: {
            connect: {
                idMkm: data.productId
            }
        },
        condition: {
            connect: {
                code: data.conditionCode
            }
        },
        language: {
            connect: {
                code: (0,_helpers_get_language__WEBPACK_IMPORTED_MODULE_1__/* .getLanguageCode */ .ht)(data.languageId)
            }
        },
        isSigned: data.isSigned,
        isFirstEd: data.isFirstEd,
        isAltered: data.isAltered,
        isFoil: false,
        isReverseHolo: false,
        isPlayset: false,
        stockUnits: {}
    })
;
const createStockUnit = (pid, data)=>({
        pid,
        storage: undefined,
        storageName: null,
        quantity: {
            create: {
                value: data.quantity
            }
        },
        offers: {}
    })
;
const createOffer = (pid, data)=>({
        pid,
        status: 'published',
        createdBy: null,
        plateform: null,
        prices: {
            create: {
                value: data.price,
                currency: {
                    connect: {
                        code: data.currencyCode
                    }
                }
            }
        },
        eligibleQuantity: data.quantity
    })
;
// CONNECTS
const connectStorage = (storageName)=>{
    if (storageName) {
        return {
            connect: {
                name: storageName
            }
        };
    }
    return undefined;
};
/**
 * * Create articles from stockfile
 * ----
 * @param {*} req
 * @param {*} res
 */ async function seedStockfile(req, res) {
    const context = req.context;
    const gameId = 3;
    const errors = [];
    // eslint-disable-next-line no-undef
    const toCreateStorage = new Set();
    // GET STOCKFILE FROM MKM
    const { data: stockFile  } = await (0,_mkm_mkm_stock_management__WEBPACK_IMPORTED_MODULE_2__/* .getStockFile */ .MJ)({
        idGame: gameId,
        isSealed: false,
        idLanguage: 2
    });
    // GET ALL EXISTING STORAGES
    const storages = await context.prisma.storage.findMany();
    const existingStorageNames = storages.map((item)=>item.name
    );
    // EXTRACT ALL STORAGES TO CREATE
    stockFile.forEach((article)=>{
        const storageName = extractStorageNameFromComment(article['Comments']);
        if (storageName && !isExistingStorage(storageName, existingStorageNames)) {
            toCreateStorage.add(storageName);
        }
    });
    // CREATE ALL UNEXISTING STORAGES
    await Promise.all([
        ...toCreateStorage
    ].map(async (storage)=>await context.prisma.storage.createMany({
            data: {
                name: storage.name,
                game: {
                    connect: {
                        idMkm: `${gameId}`
                    }
                }
            },
            skipDuplicates: true
        })
    ));
    // LOOP -- Go through stockfile and create articles with related article items and offers
    const toCreate = stockFile.reduce((acc, _article)=>{
        _article = formatData(_article);
        const { productId , conditionCode , languageId , isFirstEd , storageName  } = _article;
        if (!productId) return acc;
        const articlePid = (0,_helpers_mkm_pids__WEBPACK_IMPORTED_MODULE_3__/* .makeArticlePid */ .l)(productId, conditionCode, languageId, isFirstEd);
        const stockUnitPid = '';
        const offerPid = '';
        // ARTICLE
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(acc[articlePid])) {
            acc[articlePid] = createArticle(articlePid, _article);
        }
        const currentArticle = acc[articlePid];
        const { stockUnits  } = currentArticle;
        // STOCK UNITS
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(stockUnits[stockUnitPid])) {
            const newStockUnit = createStockUnit(stockUnitPid, _article);
            newStockUnit.storage = connectStorage(storageName);
            delete newStockUnit.storageName;
            stockUnits[stockUnitPid] = newStockUnit;
        } else {
            const current = stockUnits[stockUnitPid];
            current.quantity = {
                create: {
                    value: _article.quantity + current.quantity.create.value
                }
            };
        }
        const currentStockUnit = stockUnits[stockUnitPid];
        const { offers  } = currentStockUnit;
        // OFFER
        if ((0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(offers.create)) {
            const newOffer = createOffer(offerPid, _article);
            newOffer.createdBy = {
                connect: {
                    id: 'cl1y3gok60151iaxw38ijpdzd'
                }
            };
            newOffer.plateform = {
                connect: {
                    pid: 'CM'
                }
            };
            offers.create = newOffer;
        } else {
            offers.create.prices.create.value = (0,lodash__WEBPACK_IMPORTED_MODULE_0__.ceil)((0,lodash__WEBPACK_IMPORTED_MODULE_0__.mean)([
                offers.create.prices.create.value,
                _article.price
            ]), 2);
            offers.create.eligibleQuantity = currentStockUnit.quantity.value;
        }
        return acc;
    }, {});
    // CREATE ALL ARTICLES
    try {
        const allArticles = Object.values(toCreate).map((article)=>({
                ...article,
                stockUnits: {
                    create: Object.values(article.stockUnits)[0]
                }
            })
        );
        for(let index = 0; index < allArticles.length; index = index + 50){
            const articles = allArticles.slice(index, index + 50);
            await Promise.all(articles.map(async (article)=>{
                await context.prisma.article.upsert({
                    where: {
                        pid: article.pid
                    },
                    create: article,
                    update: {}
                });
            }));
        }
    } catch (err) {
        return res.json({
            message: err.message
        });
    }
    res.status(200).json({
        status: 200
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7534:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ seedDatabase)
});

;// CONCATENATED MODULE: ../../src/seeds/categories.ts
const CATEGORIES = [
    {
        idMkm: '1',
        name: 'Magic Single'
    },
    {
        idMkm: '2',
        name: 'Magic Booster'
    },
    {
        idMkm: '3',
        name: 'WOW Single'
    },
    {
        idMkm: '4',
        name: 'WOW Booster'
    },
    {
        idMkm: '5',
        name: 'Yugioh Single'
    },
    {
        idMkm: '6',
        name: 'Yugioh Booster'
    },
    {
        idMkm: '7',
        name: 'Magic Display'
    },
    {
        idMkm: '8',
        name: 'MtG Set'
    },
    {
        idMkm: '9',
        name: 'Telperinqu\xe1r Single'
    },
    {
        idMkm: '10',
        name: 'Telperinqu\xe1r Booster'
    },
    {
        idMkm: '11',
        name: 'Telperinqu\xe1r Starter'
    },
    {
        idMkm: '12',
        name: 'Sleeves'
    },
    {
        idMkm: '13',
        name: 'Pocket Pages'
    },
    {
        idMkm: '14',
        name: 'Albums'
    },
    {
        idMkm: '15',
        name: 'DeckBoxes'
    },
    {
        idMkm: '16',
        name: 'Dice'
    },
    {
        idMkm: '17',
        name: 'Magic Fatpack'
    },
    {
        idMkm: '18',
        name: 'Magic Intropack'
    },
    {
        idMkm: '19',
        name: 'Magic Theme Deck Display'
    },
    {
        idMkm: '20',
        name: 'Magic Miscellaneous'
    },
    {
        idMkm: '21',
        name: 'Magic Lot'
    },
    {
        idMkm: '22',
        name: 'The Spoils Single'
    },
    {
        idMkm: '23',
        name: 'The Spoils Booster'
    },
    {
        idMkm: '24',
        name: 'Magic TournamentPack'
    },
    {
        idMkm: '25',
        name: 'WOW Raid Deck'
    },
    {
        idMkm: '26',
        name: 'WOW Treasure Pack'
    },
    {
        idMkm: '27',
        name: 'WOW Starter Deck'
    },
    {
        idMkm: '28',
        name: 'Yugioh Starter Deck'
    },
    {
        idMkm: '29',
        name: 'WOW Epic Collection'
    },
    {
        idMkm: '30',
        name: 'WOW Display'
    },
    {
        idMkm: '31',
        name: 'Yugioh Special Edition'
    },
    {
        idMkm: '32',
        name: 'Magic Starter Deck'
    },
    {
        idMkm: '33',
        name: 'WoW Set'
    },
    {
        idMkm: '34',
        name: 'Yugioh Collector Tins'
    },
    {
        idMkm: '35',
        name: 'Playmats'
    },
    {
        idMkm: '36',
        name: 'Yugioh Structure Deck'
    },
    {
        idMkm: '37',
        name: 'Yugioh Promo Products'
    },
    {
        idMkm: '38',
        name: 'Magic Event Tickets'
    },
    {
        idMkm: '39',
        name: 'WOW Collector Set'
    },
    {
        idMkm: '40',
        name: 'Storage'
    },
    {
        idMkm: '41',
        name: 'GamingStones'
    },
    {
        idMkm: '42',
        name: 'Yugioh Display'
    },
    {
        idMkm: '43',
        name: 'LifeCounter'
    },
    {
        idMkm: '44',
        name: 'PrintedMedia'
    },
    {
        idMkm: '45',
        name: 'Dividers'
    },
    {
        idMkm: '46',
        name: 'Memorabilia'
    },
    {
        idMkm: '47',
        name: 'Yugioh Lot'
    },
    {
        idMkm: '48',
        name: 'The Spoils Display'
    },
    {
        idMkm: '49',
        name: 'DiceBags'
    },
    {
        idMkm: '50',
        name: 'GameKits'
    },
    {
        idMkm: '51',
        name: 'Pok\xe9mon Single'
    },
    {
        idMkm: '52',
        name: 'Pok\xe9mon Booster'
    },
    {
        idMkm: '53',
        name: 'Pok\xe9mon Display'
    },
    {
        idMkm: '54',
        name: 'Pok\xe9mon Theme Deck'
    },
    {
        idMkm: '1013',
        name: 'Pok\xe9mon Trainer Kits'
    },
    {
        idMkm: '1014',
        name: 'Pok\xe9mon Tins'
    },
    {
        idMkm: '1015',
        name: 'Pok\xe9mon Box Set'
    },
    {
        idMkm: '1016',
        name: 'Pok\xe9mon Elite Trainer Boxes'
    },
    {
        idMkm: '1017',
        name: 'Pok\xe9mon Coins'
    },
    {
        idMkm: '1018',
        name: 'Force of Will Single'
    },
    {
        idMkm: '1019',
        name: 'Cardfight!! Vanguard Single'
    },
    {
        idMkm: '1020',
        name: 'Cardfight!! Vanguard Booster'
    },
    {
        idMkm: '1021',
        name: 'Force of Will Booster'
    },
    {
        idMkm: '1022',
        name: 'Final Fantasy Single'
    },
    {
        idMkm: '1023',
        name: 'Final Fantasy Booster'
    },
    {
        idMkm: '1024',
        name: 'Yugioh Event Tickets'
    },
    {
        idMkm: '1025',
        name: 'Card Scanners'
    },
    {
        idMkm: '1026',
        name: 'Force of Will Booster Box'
    },
    {
        idMkm: '1027',
        name: 'Cardfight!! Vanguard Booster Box'
    },
    {
        idMkm: '1028',
        name: 'Final Fantasy Booster Box'
    },
    {
        idMkm: '1029',
        name: 'Final Fantasy Starter Decks'
    },
    {
        idMkm: '1030',
        name: 'FF Set'
    },
    {
        idMkm: '1031',
        name: 'Cardfight!! Vanguard Trial Deck'
    },
    {
        idMkm: '1032',
        name: 'Cardfight!! Vanguard Start Decks'
    },
    {
        idMkm: '1033',
        name: 'Cardfight!! Vanguard Legend Decks'
    },
    {
        idMkm: '1035',
        name: 'CFV Set'
    },
    {
        idMkm: '1036',
        name: 'Force of Will Starter Decks'
    },
    {
        idMkm: '1037',
        name: 'Force of Will Vingolf Series'
    },
    {
        idMkm: '1038',
        name: 'FoW Set'
    },
    {
        idMkm: '1039',
        name: 'Dragoborne Single'
    },
    {
        idMkm: '1040',
        name: 'Weiss Schwarz Single'
    },
    {
        idMkm: '1041',
        name: 'My Little Pony Singles'
    },
    {
        idMkm: '1042',
        name: 'Dragoborne Booster'
    },
    {
        idMkm: '1043',
        name: 'Weiβ Schwarz Booster'
    },
    {
        idMkm: '1044',
        name: 'My Little Pony Booster'
    },
    {
        idMkm: '1045',
        name: 'Dragoborne Booster Boxes'
    },
    {
        idMkm: '1046',
        name: 'Dragoborne Trial Decks'
    },
    {
        idMkm: '1047',
        name: 'Dragoborne Demo Decks'
    },
    {
        idMkm: '1048',
        name: 'DGB Set'
    },
    {
        idMkm: '1049',
        name: 'Dragon Ball Super Singles'
    },
    {
        idMkm: '1050',
        name: 'Dragon Ball Super Boosters'
    },
    {
        idMkm: '1051',
        name: 'DBS Set'
    },
    {
        idMkm: '1052',
        name: 'Dragon Ball Super Booster Boxes'
    },
    {
        idMkm: '1053',
        name: 'Dragon Ball Super Starter Decks'
    },
    {
        idMkm: '1054',
        name: 'Dragon Ball Super Special Packs'
    },
    {
        idMkm: '1055',
        name: 'Dragon Ball Super Draft Boxes'
    },
    {
        idMkm: '1056',
        name: 'Magic Online Singles'
    },
    {
        idMkm: '1060',
        name: 'Weiβ Schwarz Booster Boxes'
    },
    {
        idMkm: '1061',
        name: 'Dragon Ball Super Expansion Sets'
    },
    {
        idMkm: '1062',
        name: 'My Little Pony Booster Boxes'
    },
    {
        idMkm: '1063',
        name: 'My Little Pony Theme Decks'
    },
    {
        idMkm: '1064',
        name: 'Pok\xe9mon Lots'
    },
    {
        idMkm: '1065',
        name: 'My Little Pony Collector Boxes'
    },
    {
        idMkm: '1066',
        name: 'My Little Pony Tins'
    },
    {
        idMkm: '1067',
        name: 'MLP Set'
    },
    {
        idMkm: '1068',
        name: 'My Little Pony Figures'
    },
    {
        idMkm: '1069',
        name: 'Weiβ Schwarz Trial Decks'
    },
    {
        idMkm: '1070',
        name: 'Weiβ Schwarz Meister Sets'
    },
    {
        idMkm: '1071',
        name: 'WS Set'
    },
    {
        idMkm: '1072',
        name: 'Star Wars: Destiny Singles'
    },
    {
        idMkm: '1073',
        name: 'Star Wars: Destiny Dice'
    },
    {
        idMkm: '1074',
        name: 'Star Wars: Destiny Boosters'
    },
    {
        idMkm: '1075',
        name: 'Star Wars: Destiny Booster Boxes'
    },
    {
        idMkm: '1076',
        name: 'Star Wars: Destiny Starter Sets'
    },
    {
        idMkm: '1077',
        name: 'Star Wars: Destiny Draft Sets'
    },
    {
        idMkm: '1078',
        name: 'Star Wars: Destiny Dice Binder'
    },
    {
        idMkm: '1079',
        name: 'SWD Set'
    },
    {
        idMkm: '1080',
        name: 'Wei\xdf Schwarz Supply Set'
    },
    {
        idMkm: '1081',
        name: 'Apparel'
    },
    {
        idMkm: '1083',
        name: 'Pok\xe9mon Blisters'
    }
];

;// CONCATENATED MODULE: ../../src/seeds/conditions.ts
const CONDITIONS = [
    {
        code: 'MT',
        value: 1,
        name: 'Mint'
    },
    {
        code: 'NM',
        value: 2,
        name: 'Near mint'
    },
    {
        code: 'EX',
        value: 3,
        name: 'Excellent'
    },
    {
        code: 'GD',
        value: 4,
        name: 'Good'
    },
    {
        code: 'LP',
        value: 5,
        name: 'Light played'
    },
    {
        code: 'PL',
        value: 6,
        name: 'Played'
    },
    {
        code: 'PO',
        value: 7,
        name: 'Poor'
    }
];

;// CONCATENATED MODULE: ../../src/seeds/persons.ts
const PERSONS = [
    {
        pid: '__BOT_PRICE__',
        familyName: 'Bot',
        givenName: 'Price'
    }
];

;// CONCATENATED MODULE: ../../src/seeds/rarities.ts
const RARITIES = [
    {
        value: 1,
        name: 'Common',
        group: 7
    },
    {
        value: 2,
        name: 'Secret Rare',
        group: 3
    },
    {
        value: 3,
        name: 'Ultra Rare',
        group: 4
    },
    {
        value: 4,
        name: 'Super Rare',
        group: 5
    },
    {
        value: 5,
        name: 'Rare',
        group: 6
    },
    {
        value: 6,
        name: 'Ultimate Rare',
        group: 2
    },
    {
        value: 7,
        name: 'Uncommon'
    },
    {
        value: 8,
        name: 'Special Rare'
    },
    {
        value: 9,
        name: 'Holo Rare'
    },
    {
        value: 10,
        name: 'Gold Rare',
        group: 2
    },
    {
        value: 11,
        name: 'Promo'
    },
    {
        value: 12,
        name: 'Ghost Rare',
        group: 1
    },
    {
        value: 13,
        name: 'Starfoil Rare',
        group: 1
    },
    {
        value: 14,
        name: 'Starter Rare'
    },
    {
        value: 15,
        name: 'Platinum Rare',
        group: 1
    },
    {
        value: 16,
        name: 'Gold Secret Rare',
        group: 1
    },
    {
        value: 17,
        name: 'Feature Rare'
    },
    {
        value: 18,
        name: 'Expansion Rare'
    },
    {
        value: 19,
        name: 'Token',
        group: 8
    },
    {
        value: 20,
        name: 'Unknown2'
    },
    {
        value: 21,
        name: 'Online Code Card'
    },
    {
        value: 22,
        name: 'Collectors Rare',
        group: 1
    },
    {
        value: 23,
        name: 'Mosaic Rare',
        group: 1
    },
    {
        value: 24,
        name: 'Special',
        group: 9
    },
    {
        value: 25,
        name: 'Shatterfoil',
        group: 1
    },
    {
        value: 26,
        name: 'Oversized',
        group: 9
    },
    {
        value: 27,
        name: 'Starlight Rare',
        group: 1
    },
    {
        value: 28,
        name: 'Amazing Rare'
    },
    {
        value: 29,
        name: 'Land'
    },
    {
        value: 30,
        name: 'Mythic'
    },
    {
        value: 31,
        name: 'Code Card'
    },
    {
        value: 32,
        name: 'Tip Card'
    },
    {
        value: 33,
        name: 'Time Shifted'
    },
    {
        value: 34,
        name: 'Masterpiece'
    },
    {
        value: 35,
        name: 'Unknown',
        group: 9
    },
    {
        value: 36,
        name: 'Fixed'
    },
    {
        value: 37,
        name: 'Double Rare'
    },
    {
        value: 38,
        name: 'Triple Rare'
    },
    {
        value: 40,
        name: 'Magic Stone'
    },
    {
        value: 41,
        name: 'Loot'
    },
    {
        value: 42,
        name: 'Epic'
    },
    {
        value: 43,
        name: 'Normal'
    },
    {
        value: 44,
        name: 'Trial Deck'
    },
    {
        value: 45,
        name: 'Climax Rare'
    },
    {
        value: 46,
        name: 'Climax Common'
    },
    {
        value: 47,
        name: 'Marvel Rare'
    },
    {
        value: 48,
        name: 'Hero'
    },
    {
        value: 49,
        name: 'Legend'
    },
    {
        value: 50,
        name: 'Starter'
    },
    {
        value: 51,
        name: 'Special Parallel'
    },
    {
        value: 52,
        name: 'Legion Rare'
    },
    {
        value: 53,
        name: 'Generation Rare'
    },
    {
        value: 54,
        name: 'Super Generation Rare'
    },
    {
        value: 55,
        name: 'Wedding Special Parallel'
    },
    {
        value: 56,
        name: 'Rummy Labyrinth Rare'
    },
    {
        value: 57,
        name: 'Z Rare'
    },
    {
        value: 58,
        name: 'Vilest Delete Rare'
    },
    {
        value: 59,
        name: 'Special Vanguard Rare'
    },
    {
        value: 60,
        name: 'Origin Rare'
    },
    {
        value: 61,
        name: 'Image Ride Rare'
    },
    {
        value: 62,
        name: 'Vanguard Rare'
    },
    {
        value: 63,
        name: 'Holo Rare Common'
    },
    {
        value: 64,
        name: 'Delete Rare'
    },
    {
        value: 65,
        name: 'Super Special Parallel'
    },
    {
        value: 66,
        name: 'Legend Idol Rare'
    },
    {
        value: 67,
        name: 'Twin Vanguard Rare'
    },
    {
        value: 68,
        name: 'Super Special Rare'
    },
    {
        value: 69,
        name: 'Original Costume Rare'
    },
    {
        value: 70,
        name: 'Holo'
    },
    {
        value: 71,
        name: 'Over RR'
    },
    {
        value: 72,
        name: 'Oversize'
    },
    {
        value: 73,
        name: 'Legendary'
    },
    {
        value: 74,
        name: 'Extra Rare'
    },
    {
        value: 75,
        name: 'Parallel Foil'
    },
    {
        value: 76,
        name: 'Gun Gale Rare'
    },
    {
        value: 77,
        name: 'High Rare'
    },
    {
        value: 78,
        name: 'Special Member'
    },
    {
        value: 79,
        name: 'Band Rare'
    },
    {
        value: 80,
        name: 'JoJo Rare'
    },
    {
        value: 81,
        name: 'Fujimi Bunko Rare'
    },
    {
        value: 82,
        name: 'Kaguya Rare'
    },
    {
        value: 83,
        name: 'Foil'
    },
    {
        value: 84,
        name: 'Royal Rare'
    },
    {
        value: 85,
        name: 'Staple Resource'
    },
    {
        value: 86,
        name: 'Faction'
    },
    {
        value: 87,
        name: 'Uber'
    },
    {
        value: 88,
        name: 'Premium Gold Rare',
        group: 1
    }
];

;// CONCATENATED MODULE: ../../src/seeds/plateforms.ts
const PLATEFORMS = [
    {
        pid: 'CM',
        name: 'Card-Market'
    }
];

;// CONCATENATED MODULE: ../../src/seeds/storages.ts
const STORAGES = [
    {
        name: '__UNKNOWN__'
    }
];

;// CONCATENATED MODULE: external "currencies.json"
const external_currencies_json_namespaceObject = require("currencies.json");
;// CONCATENATED MODULE: external "countries-list"
const external_countries_list_namespaceObject = require("countries-list");
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(6517);
;// CONCATENATED MODULE: ../../src/api/root/seed.ts
// VENDORS









async function seedDatabase(req, res) {
    const context = req.context;
    // CURRENCIES
    if (false) {}
    // LANGUAGES
    if (false) {}
    // COUNTRIES AND GROUPS
    if (false) {}
    // CATEGORIES
    if (false) {}
    // CONDITIONS
    if (false) {}
    // RARITIES
    if (false) {}
    // PLATEFORMS
    if (false) {}
    // PERSONS
    if (false) {}
    // STORAGES
    if (false) {}
    res.status(200).json({
        status: 200
    });
};


/***/ }),

/***/ 5066:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ tmpChangePids)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

async function tmpChangePids(req, res) {
    const context = req.context;
    try {
        const input = {
            data: {
                create: {
                    isFirstEd: true,
                    isReverseHolo: false,
                    condition: {
                        connect: {
                            code: 'NM'
                        }
                    },
                    language: {
                        connect: {
                            code: 'fr'
                        }
                    },
                    product: {
                        connect: {
                            id: 'cl1y5gud0701070mwgjdrvvi0e'
                        }
                    },
                    stockUnits: {
                        create: {
                            quantity: {
                                create: {
                                    value: 4
                                }
                            },
                            storage: {
                                connect: {
                                    id: 'cl20q8a1u35120myol8umxa4t'
                                }
                            }
                        }
                    }
                },
                update: {
                    stockUnits: {
                        create: {
                            quantity: {
                                create: {
                                    value: 4
                                }
                            },
                            storage: {
                                connect: {
                                    id: 'cl20q8a1u35120myol8umxa4t'
                                }
                            }
                        }
                    }
                }
            },
            where: {
                product: {
                    is: {
                        id: {
                            equals: 'cl1yrmw5010863950m0auanp1uwk'
                        }
                    }
                },
                condition: {
                    is: {
                        code: {
                            equals: 'GD'
                        }
                    }
                },
                language: {
                    is: {
                        code: {
                            equals: 'fr'
                        }
                    }
                },
                isFirstEd: true,
                isReverseHolo: false
            }
        };
        const { data: { create , update  } , where  } = input;
        const articles = await context.prisma.article.findMany({
            where: where
        });
        let output;
        if (!(0,lodash__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(articles)) {
            const articleId = articles[0].id;
            output = await context.prisma.article.update({
                data: {
                    ...update
                },
                where: {
                    id: articleId
                }
            });
        } else {
            output = await context.prisma.article.create({
                data: {
                    ...create
                }
            });
        }
        return res.json(output);
        // *ARTICLES
        // const articles = await context.prisma.article.findMany({
        //   include: {
        //     condition: true,
        //     language: true,
        //     product: {
        //       include: {
        //         reconciliations: {
        //           include: {
        //             plateform: true
        //           }
        //         }
        //       }
        //     }
        //   }
        // });
        // const output = articles.map((item) => {
        //   const {
        //     product: { reconciliations },
        //     condition: { code: conditionCode },
        //     language: { code: languageCode },
        //     isFirstEd
        //   } = item;
        //   const mkmReconciliation = reconciliations.find((item) => item.plateform.pid === 'CM');
        //   return {
        //     ...item,
        //     pid: makeArticlePid(mkmReconciliation.localPid, conditionCode, languageCode, isFirstEd)
        //   };
        // });
        // const updateArticles = async (article: any) =>
        //   await context.prisma.article.update({
        //     where: { id: article.id },
        //     data: {
        //       reconciliations: {
        //         create: {
        //           localPid: article.pid,
        //           plateform: { connect: { pid: 'CM' } }
        //         }
        //       }
        //     }
        //   });
        // await sendByChunk(updateArticles, output, 100);
        // *EXPANSION
        // const expansions = await context.prisma.expansion.findMany({});
        // const updateExpansion = async (expansion: any) =>
        //   await context.prisma.expansion.update({
        //     where: { id: expansion.id },
        //     data: {
        //       reconciliations: {
        //         create: {
        //           localPid: expansion.idMkm,
        //           plateform: { connect: { pid: 'CM' } }
        //         }
        //       }
        //     }
        //   });
        // await sendByChunk(updateExpansion, expansions, 100);
        // *RECONCILIATIONS
        // const reconciliations = await context.prisma.productReconciliation.findMany({});
        // const updateReconciliation = async (rec: any) =>
        //   await context.prisma.productReconciliation.update({
        //     where: { id: rec.id },
        //     data: {
        //       localPid: rec.localId
        //     }
        //   });
        // await sendByChunk(updateReconciliation, reconciliations, 100);
        // *PRODUCTS
        // const products = await context.prisma.product.findMany({
        //   include: {
        //     reconciliations: {
        //       include: {
        //         plateform: true
        //       }
        //     }
        //   }
        // });
        // const updateProduct = async (product: any) =>
        //   await context.prisma.product.update({
        //     where: { id: product.id },
        //     data: {
        //       reconciliations: {
        //         update: {
        //           localId: product.idMkm,
        //           plateform: { connect: { pid: 'CM' } }
        //         }
        //       }
        //     }
        //   });
        // *ARTICLES
        // const articles = await context.prisma.article.findMany({
        //   include: {
        //     product: {
        //       include: {
        //         reconciliations: {
        //           include: {
        //             plateform: {
        //               select: {
        //                 pid: true
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // });
        // const updateArticle = async (article: any) =>
        //   await context.prisma.article.update({
        //     where: { id: article.id },
        //     data: {
        //       reconciliations: {
        //         create: {
        //           localPid: article.product.reconciliations.find((item) => item.plateform.pid === 'CM').localPid,
        //           plateform: { connect: { pid: 'CM' } }
        //         }
        //       }
        //     }
        //   });
        // await sendByChunk(updateArticle, articles, 80);
        return res.json({
            status: 200,
            message: 'articles OK'
        });
    } catch (err) {
        return res.json({
            status: 400,
            message: err.message
        });
    }
    res.json({
        status: 400
    });
};


/***/ }),

/***/ 9629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "r": () => (/* binding */ extendGraphqlSchema)
});

// EXTERNAL MODULE: external "@keystone-6/core"
var core_ = __webpack_require__(3403);
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(6517);
;// CONCATENATED MODULE: ../../src/graphql/resolvers/upsert-article.ts


const IntFieldUpdateOperationsInput = core_.graphql.inputObject({
    name: 'IntQuantityUpdateOperationsInput',
    fields: {
        set: core_.graphql.arg({
            type: core_.graphql.Int
        }),
        increment: core_.graphql.arg({
            type: core_.graphql.Int
        }),
        decrement: core_.graphql.arg({
            type: core_.graphql.Int
        })
    }
});
const upsertArticleInput = {
    extend: (base)=>core_.graphql.inputObject({
            name: 'UpsertStockUnitInput',
            fields: {
                createOrConnect: core_.graphql.arg({
                    type: core_.graphql.nonNull(base.inputObject('StockUnitCreateInput'))
                }),
                update: core_.graphql.arg({
                    type: core_.graphql.nonNull(IntFieldUpdateOperationsInput)
                })
            }
        })
};
const upsertArticle = {
    extend: (base)=>core_.graphql.field({
            type: base.object('Article'),
            args: {
                data: core_.graphql.arg({
                    type: core_.graphql.nonNull(upsertArticleInput.extend(base))
                }),
                where: core_.graphql.arg({
                    type: core_.graphql.nonNull(base.inputObject('ArticleWhereInput'))
                })
            },
            async resolve (source, { data , where  }, context) {
                const { create , connect , update  } = data;
                const stockUnit = await context.query.StockUnit.findMany({
                    where: where,
                    query: 'id quantity'
                });
                // Stock unit already exist -> merge
                if (!(0,external_lodash_.isEmpty)(stockUnit)) {
                    const _stockUnit = stockUnit[0];
                    let quantity = parseInt(_stockUnit.quantity, 10);
                    if ('increment' in update) {
                        quantity += update.increment;
                    }
                    if ('decrement' in update) {
                        quantity -= update.decrement;
                    }
                    if ('set' in update) {
                        quantity = update.set;
                    }
                    return await context.prisma.StockUnit.updateOne({
                        where: {
                            id: _stockUnit.id
                        },
                        data: {
                            quantity: {
                                create: {
                                    value: quantity
                                }
                            }
                        }
                    });
                }
                // Stock unit does not exist -> Check article
                const articles = await context.query.Article.findMany({
                    where: where
                });
                // Article doesn't exist. We create both article and stock unit in a single request.
                if (!(0,external_lodash_.isEmpty)(articles)) {
                    const articleId = articles[0].id;
                    output = await context.prisma.StockUnit.update({
                        data: {
                            ...update
                        },
                        where: {
                            id: articleId
                        }
                    });
                    return;
                } else {
                    output = await context.prisma.StockUnit.create({
                        data: {
                            ...create
                        }
                    });
                }
                return output;
            }
        })
};
/* harmony default export */ const upsert_article = (upsertArticle);

;// CONCATENATED MODULE: ../../src/graphql/extend-graphql-schema.ts


const extendGraphqlSchema = core_.graphql.extend((base)=>{
    return {
        mutation: {
            upsertArticle: upsert_article.extend(base)
        },
        query: {
        }
    };
});


/***/ }),

/***/ 9148:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ht": () => (/* binding */ getLanguageCode)
/* harmony export */ });
/* unused harmony exports ABBREVIATION_LANGUAGES, LANGUAGES, getLanguageId, getLanguageOrder */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

const ABBREVIATION_LANGUAGES = [
    'unknown',
    'gb',
    'fr',
    'de',
    'es',
    'it',
    'cn',
    'jp',
    'pt',
    'ru',
    'kp',
    'tw',
    'lu',
    'pl',
    'cz',
    'hu',
    'eu' // Europe
];
const LANGUAGES = [
    {
        idMkm: '1',
        name: 'English',
        code: 'en'
    },
    {
        idMkm: '2',
        name: 'French',
        code: 'fr'
    },
    {
        idMkm: '3',
        name: 'German',
        code: 'de'
    },
    {
        idMkm: '4',
        name: 'Spanish',
        code: 'es'
    },
    {
        idMkm: '5',
        name: 'Italian',
        code: 'it'
    }
];
function getLanguageCode(id) {
    if (!id) return 'tt';
    let input = parseInt(id, 10);
    if (isNaN(input)) {
        input = id.toLowerCase();
        if (input === 'gb') return 'en';
        return input === 'd' ? 'de' : input;
    }
    const inputId = parseInt(id, 10);
    const outputCode = ABBREVIATION_LANGUAGES[inputId];
    if (outputCode === 'gb') return 'en';
    return outputCode !== null && outputCode !== void 0 ? outputCode : inputId;
}
function getLanguageId(code) {
    if (!code) return 'tt';
    if (!isString(code)) return code;
    const inputCode = code.toLowerCase();
    const outputId = LANGUAGES.indexOf(inputCode);
    return outputId === -1 ? inputCode : outputId;
}
const getLanguageOrder = (lang)=>{
    switch(lang){
        case '2':
            return 1;
        case '1':
            return 2;
        default:
            return 3;
    }
};


/***/ }),

/***/ 5712:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "l": () => (/* binding */ makeArticlePid)
});

;// CONCATENATED MODULE: ../../src/utils/cryb-53.ts
// fastest and simple string hash function (10^9 hashes => zero collision)
// keys 20 length => 1050 hash/ms
// keys 50 length => 750 hash/ms
// keys 500 length => 80 hash/ms
const cyrb53 = (key, seed = 0)=>{
    const A = 2654435761;
    const B = 1597334677;
    const C = 2246822507;
    const D = 3266489909;
    const E = 4294967296;
    const F = 2097151;
    let h1 = 3735928559 ^ seed;
    let h2 = 1103547991 ^ seed;
    for(let index = 0, char; index < key.length; index++){
        char = key.charCodeAt(index);
        h1 = Math.imul(h1 ^ char, A);
        h2 = Math.imul(h2 ^ char, B);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, C) ^ Math.imul(h2 ^ h2 >>> 13, D);
    h2 = Math.imul(h2 ^ h2 >>> 16, C) ^ Math.imul(h1 ^ h1 >>> 13, D);
    return E * (F & h2) + (h1 >>> 0);
};
/* harmony default export */ const cryb_53 = (cyrb53);

;// CONCATENATED MODULE: ../../src/helpers/mkm/pids.ts

const makeArticlePid = (productPid, conditionCode, langueId, isFirstEd, isReverseHolo = false)=>{
    const pid = `${productPid}-${conditionCode}-${langueId}-${isFirstEd ? 'T' : 'F'}-${isReverseHolo ? 'T' : 'F'}`;
    return `${cryb_53(pid)}`;
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4409));
module.exports = __webpack_exports__;

})();