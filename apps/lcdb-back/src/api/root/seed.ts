// TYPES
import type { Request, Response } from 'express';
import { KeystoneContext } from '@keystone-6/core/types';

// VENDORS
import { CATEGORIES } from '../../seeds/categories';
import { CONDITIONS } from '../../seeds/conditions';
import { PERSONS } from '../../seeds/persons';
import { RARITIES } from '../../seeds/rarities';
import { PLATEFORMS } from '../../seeds/plateforms';
import { STORAGES } from '../../seeds/storages';
import { currencies } from 'currencies.json';
import { continents, countries, languages } from 'countries-list';

import { isEmpty } from 'lodash';

type Country = {
  capital: string;
  continent?: string;
  currency: string | object;
  emoji: string;
  emojiU: string;
  languages: string[] | object;
  name: string;
  native: string;
  phone?: number;
  code?: string;
};

export default async function seedDatabase(req: Request, res: Response) {
  const context = (req as any).context as KeystoneContext;

  // CURRENCIES
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      const _currencies = [...currencies].map((currency) => {
        delete currency.rounding;
        return currency;
      });
      await context.prisma.currency.createMany({
        data: _currencies,
        skipDuplicates: true
      });
      console.log('✅', ' Currencies OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // LANGUAGES
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      const _languages = Object.entries(languages).map(([code, language]) => ({
        ...language,
        rtl: language ? true : false,
        code
      }));
      const response = await context.prisma.language.createMany({
        data: _languages,
        skipDuplicates: true
      });
      console.log('✅', ' Languages OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // COUNTRIES AND GROUPS
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      const languageCodes = Object.keys(languages);
      const currencyCodes = currencies.map((item) => item.code);

      const _countries = Object.entries(countries).reduce(
        (acc: any, [code, country]) => {
          const _country: any = { ...country };
          _country.code = code;
          _country.phone = parseInt(country.phone, 10);

          // CONNECT LANGUAGES
          _country.languages = {
            connect: country.languages.reduce((acc, _code) => {
              if (!languageCodes.includes(_code)) return acc;
              return [...acc, { code: _code }];
            }, [])
          };

          // CONNECT CURRENCY
          const currencies = country.currency.split(',');
          _country.currencies = {
            connect: currencies.reduce((acc, code) => {
              if (currencyCodes.includes(code)) acc.push({ code });
              return acc;
            }, [])
          };
          delete _country.currency;

          // CREATE COUNTRY GROUPS
          const groupCode = _country.continent;
          if (isEmpty(acc.groups[groupCode])) acc.groups[groupCode] = [];
          acc.groups[groupCode].push({ code });

          delete _country.continent;
          acc.countries.push(_country);

          return acc;
        },
        { countries: [], groups: {} }
      );

      // CREATE ALL COUNTRIES
      await Promise.all(
        _countries.countries.map(async (country: any) => {
          await context.prisma.country.create({
            data: country
          });
        })
      );

      // CREATE ALL GROUPS
      const groups = Object.entries(_countries.groups);
      await Promise.all(
        groups.map(async ([code, connect]) => {
          await context.prisma.countryGroup.create({
            data: {
              code,
              name: continents[code],
              countries: { connect }
            }
          });
        })
      );
      console.log('✅', ' Country & Groups OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // CATEGORIES
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      await context.prisma.category.createMany({
        data: CATEGORIES,
        skipDuplicates: true
      });
      console.log('✅', ' Categories OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // CONDITIONS
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      await context.prisma.condition.createMany({
        data: CONDITIONS,
        skipDuplicates: true
      });
      console.log('✅', ' Conditions OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // RARITIES
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      await context.prisma.rarity.createMany({
        data: RARITIES,
        skipDuplicates: true
      });
      console.log('✅', ' Rarities OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // PLATEFORMS
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      await context.prisma.plateform.createMany({
        data: PLATEFORMS,
        skipDuplicates: true
      });
      console.log('✅', ' Plateforms OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // PERSONS
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      await context.prisma.person.createMany({
        data: PERSONS,
        skipDuplicates: true
      });
      console.log('✅', ' Persons OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  // STORAGES
  if (false) {
    console.log('👉', ' Creating currencies');
    try {
      await context.prisma.storage.createMany({
        data: STORAGES,
        skipDuplicates: true
      });
      console.log('✅', ' Storages OK');
    } catch (err) {
      console.log('❌', err.message);
    }
  }

  res.status(200).json({ status: 200 });
}
