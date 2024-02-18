# Icelandic Post-Codes ("Póstnúmer")

Icelandic post-codes (Póstnúmer) and locality names as a JavaScript object.
Also includes the dative form ("þágufall") of the locality name.

This module also contains a lookup table for Þjóðskrá's (Iceland's National
Registry) "magic codes" for localities, counties, countries and continents.

```sh
npm install postnumer
yarn add postnumer
bun add postnumer
```

<!-- prettier-ignore-start -->

- [Postal Codes](#postal-codes)
  - [`postalCodes`](#postalcodes)
  - [`postalCodeMap`](#postalcodemap)
- [National Registry Place Codes](#national-registry-place-codes)
  - [`thjodskraPlaces`](#thjodskraplaces)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Other Iceland-Themed Libraries](#other-iceland-themed-libraries)

<!-- prettier-ignore-end -->

---

## Postal Codes

The postal code information isf fetched from an official data-source linked to
from this page: <https://www.byggdastofnun.is/is/postthjonusta/postnumer>

See `postnumerMeta` for information on when your version of the data was last
updated.

```ts
import { postnumerMeta } from 'postnumer';

console.log(postnumerMeta.lastUpdated);
// "2024-02-18"
```

---

### `postalCodes`

**Type**: `Array<{ postcode: number, name: string, name_dative: string }>`

An array containing every post-code ("póstnúmer") in Iceland, along with its
corresponding place name.

Ideal for generating drop-downs, auto-completes, etc.

```ts
import { postalCodes } from 'postnumer';

const lastItem = postalCodes[postalCodesArr.length - 1];
lastItem.postcode; // 902
lastItem.name; // 'Vestmannaeyjar'
lastItem.name_dative; // 'Vestmannaeyjum'
```

---

### `postalCodeMap`

**Type**: `Record<number, { name: string, name_dative: string }>`

Lookup table for the place names (localities) of every known post-code
("póstnúmer") in Iceland.

```ts
import { postalCodeMap } from 'postnumer';

const info = postalCodeMap[200];
info.postcode; // 200
info.name; // 'Kópavogur'
info.name_dative; // 'Kópavogi'
```

---

## National Registry Place Codes

Iceland's National Registry ("Þjóðskrá") uses a set of "magic codes" to refer
to localities, counties, countries and continents.

This information is sourced from Þjóðskrá's homepage:
<https://www.skra.is/um-okkur/utgafur-og-skjol/taknmal-thjodskrar>

---

### `thjodskraPlaces`

**Type**: `Record<string|number, string>`

Lookup table for Þjóðskrá's place and couuntry code values for localities,
counties, countries and continents.

It's useful for translating Þjóðskrá's cryptic codes to human-readable names.

```ts
import { thjodskraPlaces } from 'postnumer';

const place1 = thjodskraPlaces['3606']; // 'Borgarnes'
const place2 = thjodskraPlaces['XT']; // 'Afríka, ótilgreint land'
```

NOTE: Þjóðskrá also has similar magic codes for geners, marital status,
religious affiliation, etc. This module considers those codes out of scope.

---

## Contributing

Because the (shameful) lack of public APIs, the data exported by this module
has to be manually updated. Find detailed step-by-step directions at the top
of [postnumer.mjs](./postnumer.mjs) and [places.mjs](./places.mjs).

Pull requests welcome, and please open an issue if you have ideas for new
features or improvements.

---

## Changelog

See
[CHANGELOG.md](https://github.com/maranomynet/postnumer/blob/dev/CHANGELOG.md)

---

## Other Iceland-Themed Libraries

- [`is-kennitala`](https://npmjs.com/package/is-kennitala) - Best-of-breed
  kennitala (Icelandic national ID) validation and utility library.
- [`fridagar`](https://npmjs.com/package/fridagar) - Icelandic public holidays
  and other commonly observed 'special' days.
