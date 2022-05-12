import { Action } from './src/schemas/action';
import { Article } from './src/schemas/article';
import { ArticleReconciliation } from './src/schemas/article-reconciliation';
import { Batch } from './src/schemas/batch';
import { BatchProd } from './src/schemas/batch-prod';
import { Category } from './src/schemas/category';
import { Comment } from './src/schemas/comment';
import { Condition } from './src/schemas/condition';
import { ControlAction } from './src/schemas/control-action';
import { Country } from './src/schemas/country';
import { CountryGroup } from './src/schemas/country-group';
import { Currency } from './src/schemas/currency';
import { Expansion } from './src/schemas/expansion';
import { ExpansionLocal } from './src/schemas/expansion-local';
import { ExpansionReconciliation } from './src/schemas/expansion-reconciliation';
import { Game } from './src/schemas/game';
import { Language } from './src/schemas/language';
import { Link } from './src/schemas/link';
import { Lists } from '.keystone/types';
import { MediaObject } from './src/schemas/media-object';
import { Offer } from './src/schemas/offer';
import { Person } from './src/schemas/person';
import { Plateform } from './src/schemas/plateform';
import { Price } from './src/schemas/price';
import { PriceOffer } from './src/schemas/price-offer';
import { Pricing } from './src/schemas/pricing';
import { Product } from './src/schemas/product';
import { ProductLocal } from './src/schemas/product-local';
import { ProductModel } from './src/schemas/product-model';
import { ProductReconciliation } from './src/schemas/product-reconciliation';
import { StockUnitQuantity } from './src/schemas/stock-unit-quantity';
import { Rarity } from './src/schemas/rarity';
import { Rating } from './src/schemas/rating';
import { StockUnit } from './src/schemas/stock-unit';
import { Storage } from './src/schemas/storage';
import { User } from './src/schemas/user';

export const lists: Lists = {
  Action,
  Article,
  ArticleReconciliation,
  Batch,
  BatchProd,
  Category,
  Comment,
  Condition,
  ControlAction,
  Country,
  CountryGroup,
  Currency,
  Expansion,
  ExpansionLocal,
  ExpansionReconciliation,
  Game,
  Language,
  Link,
  MediaObject,
  Offer,
  Person,
  Plateform,
  Price,
  PriceOffer,
  Pricing,
  Product,
  ProductLocal,
  ProductModel,
  ProductReconciliation,
  StockUnitQuantity,
  Rarity,
  Rating,
  StockUnit,
  Storage,
  User
};
