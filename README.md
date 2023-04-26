# Icelandic Post-Codes ("Póstnúmer")

Icelandic post-codes (Póstnúmer) and locality names as a JavaScript object.
Also includes the dative form ("þágufall") of the locality name.

The data exported by this module is manually updated. Find detailed step-by-step
directions at the top of [index.mjs](./index.mjs). Pull requests welcome.

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
import { postnumer } from 'postnumer';

const locality = postnumer[200];
locality.name; // 'Kópavogur'
locality.name_dative; // 'Kópavogi'
```

