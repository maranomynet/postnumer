import * as v from 'valibot';

// Source: https://posturinn.is/einstaklingar/ymsar-upplysingar/postnumer-og-thjonustustig
// ...fetches its data from this API endpoint:
const postnumerAPIUrl = 'https://api.mobiz.posturinn.is/api/v1/locations/servicelevel';

// NOTE: To scrape the data from the page, you need to use something like
// Pupeteer or PlayWright, click the "Sjá meira" button at the bottom of
// the page repeatedly until you've revealed every póstnúmer.
// Then you can use the following code:
//
// ´´´ts
// // Beware: these hashed class-names are not stable...
// const cardSelector = '.src__Box-sc-1sbtrzs-0.hMtKsT';
// Array.from(document.querySelectorAll(cardSelector))
// .map((elm) => {
//   const pnr = elm.querySelector('h3').textContent.trim();
//   const name = elm.querySelector('p')
//     .textContent
//     .replace(/Staður:\s/, '')
//     .trim();
//   return [pnr, { name, name_dative: dativize(name) }];
// })
// ```
//
// etc..

// ---------------------------------------------------------------------------

/**
 * Converts an Icelandic place name to its dative form.
 *
 * This is super dumb, but it works for the current póstnúmer places in
 * Iceland.
 */
/* prettier-ignore */
// eslint-disable-next-line complexity
const dativize = (place: string): string => {
  const placeLC = place.toLowerCase();
  if (placeLC === 'kjós') { return place; }
  if (placeLC.endsWith('s')) { return `${place  }i`; }
  if (placeLC.endsWith('ar')) { return `${place.slice(0, -2)  }um`; }
  if (placeLC.includes('fjörður')) { return place.replace('fjörður', 'firði'); }
  if (placeLC.endsWith('ur')) {
    if (placeLC.endsWith('dalur') || place.endsWith('staður')) { return place.slice(0, -2); }
    if (placeLC.endsWith('völlur')) { return `${place.slice(0, -6)  }velli`; }
    if (placeLC.endsWith('klaustur')) { return `${place.slice(0, -2)  }ri`; }
    if (placeLC.endsWith('ivogur')) { return `${place.slice(0, -6)  }avogi`; }
    return `${place.slice(0, -2)  }i`;
  }
  if (placeLC.endsWith('bær')) { return place.slice(0, -1); }
  if (placeLC.endsWith('a')) { return `${place.slice(0, -1)  }u`; }
  if (placeLC.endsWith('holt') || place.endsWith('vatn')) { return `${place  }i`; }
  if (placeLC.endsWith('hóll')) { return `${place.slice(0, -1)  }i`; }
  if (placeLC.endsWith('fljót')) { return `${place  }um`; }
  if (placeLC.endsWith('tangi') || place.endsWith('bakki')) { return `${place.slice(0, -1)  }a`; }
  if (placeLC.endsWith('staðir')) { return `${place.slice(0, -6)  }stöðum`; }
  if (placeLC.endsWith('öræfi')) { return 'Öræfum'; }
  return place;
};

// ---------------------------------------------------------------------------

const postnumerAPIData_partial = v.array(
  v.object({
    postcode: v.pipe(v.number(), v.minValue(100), v.maxValue(999)),
    city: v.pipe(
      v.string(),
      v.transform((name) => name.trim().replace(/\s\s+/g, ' '))
    ),
  })
);

await fetch(postnumerAPIUrl).then(async (response) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch postnumer data: ${response.statusText}`);
  }
  const data = await response.json();
  const postnumer = v
    .parse(postnumerAPIData_partial, data)
    .map(({ postcode, city }) => {
      return {
        postnumer: postcode,
        name: city,
        name_dative: dativize(city),
      };
    })
    .sort((a, b) => a.postnumer - b.postnumer);

  const date = new Date().toISOString().split('T')[0];

  Bun.write(
    'src/_/postnumer-data.ts',
    `// NOTE: This file is auto-generated by the "fetch-data" script. DO NOT EDIT!

/**
 * Metadata about the data in your installed version of the "postnumer" package
 */
export const postnumerMeta = {
  lastUpdated: ${JSON.stringify(date)},
  /** @deprecated Typo, use \`.lastUpdated\` instead (Will be removed in v2.0) */
  lastUpdtedOn: ${JSON.stringify(date)},
};

export const _postalCodes = [
  ${postnumer.map((obj) => JSON.stringify(obj)).join(',\n  ')},
];

export const _postalCodeMap = /*#__PURE__*/ Object.fromEntries(
  _postalCodes.map((obj) => [obj.postnumer, obj])
);
`
  );
});
