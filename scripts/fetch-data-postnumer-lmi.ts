import * as v from 'valibot';

import { dativize } from './postnumer-utils.js';

// NOTE: This Byggðastofnun data lacks "post box" codes, and has some errors (repeat values)
// so we prefer the "posturinn" data source.

// Source: https://www.byggdastofnun.is/is/postthjonusta/postnumer
// ...which links to https://gatt.lmi.is/geonetwork/srv/ice/catalog.search#/metadata/22e98d21-a86b-4b62-ad58-a6d17703b612
// ...which lists a "byggdastofnun:postnumer" data source with a "Hlaða niður" menu
// ...from which you select "application/json"
// ...and then you get reirected to the below API URL
const postnumerAPIUrl =
  'https://gis.lmi.is/geoserver/byggdastofnun/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=byggdastofnun:postnumer&outputFormat=application%2Fjson';

// Source: https://posturinn.is/einstaklingar/ymsar-upplysingar/postnumer-og-thjonustustig
// ...fetches its data from this API endpoint:
const posturinnPostnumerAPIUrl =
  'https://api.mobiz.posturinn.is/api/v1/locations/servicelevel';
// As of early summer 2026 the city values now represent the "Servicing post office"
// not the town/locality the postcode represents.
// We can still use it to find "pósthólf" codes, but the town/locality names must
// be derived/guessed from the nearest Byggðastofnun póstnúmer above.

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

const postnumerAPIData_partial = v.object({
  features: v.array(
    v.object({
      properties: v.object({
        postnumer: v.pipe(v.number(), v.minValue(100), v.maxValue(999)),
        stadur: v.pipe(
          v.string(),
          v.transform((name) => name.trim().replace(/\s\s+/g, ' ')),
        ),
        tengidalkur_hagstofan: v.pipe(
          v.string(),
          v.transform((name) =>
            name
              .trim()
              .replace(/\s\s+/g, ' ')
              .replace(/^\d{3} /, ''),
          ),
        ),
      }),
    }),
  ),
});

const postholfNumbers = await fetch(posturinnPostnumerAPIUrl).then(async (response) => {
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pósturinn's postnumer API data: ${response.statusText}`,
    );
  }
  const data = await response.json();
  return v
    .parse(
      v.array(
        v.object({
          postcode: v.pipe(v.number(), v.minValue(100), v.maxValue(999)),
          postoffice: v.pipe(
            v.string(),
            v.transform((name) => name.trim().replace(/\s\s+/g, ' ')),
          ),
        }),
      ),
      data,
    )
    .filter(({ postoffice }) => /pósthólf/i.test(postoffice))
    .map(({ postcode }) => postcode);
});

const createTuple = (postnumer: number, name: string, postbox?: true) =>
  [
    postnumer,
    { postnumer, name, name_dative: dativize(name), ...(postbox && { postholf: true }) },
  ] as const;

type PostHolfObj = NonNullable<ReturnType<typeof createTuple>[1]>;

await fetch(postnumerAPIUrl).then(async (response) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch LMÍ's postnumer data: ${response.statusText}`);
  }
  const data = await response.json();
  let _lastNonPostholfObj: ReturnType<typeof createTuple>[1] | undefined;
  const postnumer = Object.values(
    Object.fromEntries(
      v
        .parse(postnumerAPIData_partial, data)
        .features.map(({ properties }) => {
          const { postnumer } = properties;

          // let name = properties.stadur.split(',')[0]!.trim();
          let name = properties.tengidalkur_hagstofan.split(',')[0]!.trim();

          // Spelling mistake fix
          name = name.replace(/kaupsstaður/, 'kaupstaður');

          return createTuple(postnumer, name);
        })
        // Add missing postnumer "511 Hólmavík" (not in Byggðastofnun data)
        // It appears on their map as "531 Hvammstangi" which is incorrect.
        .concat([createTuple(511, 'Hólmavík')])
        .concat(postholfNumbers.map((postnumer) => createTuple(postnumer, '', true)))
        .sort(([a], [b]) => a - b)
        .map((tuple, i, arr) => {
          const [pnr, obj] = tuple;
          if (i === 0 || !obj.postholf) {
            return tuple;
          }
          // If this is a "pósthólf" code, try to find the nearest non-pósthólf code
          // and use its name instead of the empty string.
          let lastObj = arr[i - 1]![1];
          if (lastObj.name === 'Kjalarnes') {
            // Special case: "Kjalarnes" comes between "Reykjavík" and its pósthólf codes.
            lastObj = arr[i - 2]![1];
          }
          if (lastObj.postholf) {
            if (!_lastNonPostholfObj) {
              throw new Error(
                `Failed to find a non-pósthólf code for pósthólf ${pnr} at index ${i}`,
              );
            }
            lastObj = _lastNonPostholfObj;
          }
          _lastNonPostholfObj = lastObj;
          const { name, name_dative } = _lastNonPostholfObj;
          return [pnr, { ...obj, name, name_dative }];
        }),
    ),
  );

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
`,
  );
});
