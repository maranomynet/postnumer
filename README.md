# Icelandic Post-Codes ("Póstnúmer")

Icelandic post-codes (Póstnúmer) and locality names as a JavaScript object.
Also includes the dative form ("þágufall") of the locality name.

This module also contains a lookup table for Þjóðskrá's (Iceland's National
Registry) "magic codes" for localities, counties, countries and continents.

<!-- prettier-ignore-start -->

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Other Iceland-Themed Libraries](#other-iceland-themed-libraries)

<!-- prettier-ignore-end -->

## Installation

```sh
yarn add postnumer
```

…or…

```sh
npm install postnumer
```

## Usage

```js
import { postnumer, thjodskraPlaces } from 'postnumer';

const locality = postnumer[200];
locality.name; // 'Kópavogur'
locality.name_dative; // 'Kópavogi'

const place1 = thjodskraPlaces['3606'] // 'Borgarnes'
const place2 = thjodskraPlaces['XT']; // 'Afríka, ótilgreint land'
```

## Contributing

Because the (shameful) lack of public APIs, the data exported by this module
has to be manually updated. Find detailed step-by-step directions at the top
of [postnumer.mjs](./postnumer.mjs) and [places.mjs](./places.mjs).

Pull requests welcome, and please open an issue if you have ideas for new
features or improvements.

## Changelog

See
[CHANGELOG.md](https://github.com/maranomynet/postnumer/blob/dev/CHANGELOG.md)

## Other Iceland-Themed Libraries

- [`is-kennitala`](https://npmjs.com/packages/is-kennitala) - Best-of-breed kennitala (Icelandic national ID) validation and utility library.
- [`fridagar`][https://npmjs.com/packages/fridagar] - Icelandic public holidays and other commonly observed 'special' days.