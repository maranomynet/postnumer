import { z } from 'zod';

// NOTE: This Byggðastofnun data lacks "post box" codes, and has some errors (repeat values)
// so we prefer the "posturinn" data source.

// Source: https://www.byggdastofnun.is/is/postthjonusta/postnumer
// ...which links to https://gatt.lmi.is/geonetwork/srv/ice/catalog.search#/metadata/22e98d21-a86b-4b62-ad58-a6d17703b612
// ...which lists a "byggdastofnun:postnumer" data source with a "Hlaða niður" menu
// ...from which you select "application/json"
// ...and then you get reirected to the below API URL
const postnumerAPIUrl =
  'https://gis.lmi.is/geoserver/byggdastofnun/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=byggdastofnun:postnumer&outputFormat=application%2Fjson';

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
  if (place.endsWith('s')) { return `${place  }i`; }
  if (place.endsWith('ar')) { return `${place.slice(0, -2)  }um`; }
  if (place.includes('fjörður')) { return place.replace('fjörður', 'firði'); }
  if (place.endsWith('ur')) {
    if (place.endsWith('dalur') || place.endsWith('staður')) { return place.slice(0, -2); }
    if (place.endsWith('völlur')) { return `${place.slice(0, -6)  }velli`; }
    if (place.endsWith('klaustur')) { return `${place.slice(0, -2)  }ri`; }
    if (place.endsWith('ivogur')) { return `${place.slice(0, -6)  }avogi`; }
    return `${place.slice(0, -2)  }i`;
  }
  if (place.endsWith('bær')) { return place.slice(0, -1); }
  if (place.endsWith('a')) { return `${place.slice(0, -1)  }u`; }
  if (place.endsWith('holt') || place.endsWith('vatn')) { return `${place  }i`; }
  if (place.endsWith('hóll')) { return `${place.slice(0, -1)  }i`; }
  if (place.endsWith('fljót')) { return `${place  }um`; }
  if (place.endsWith('tangi') || place.endsWith('bakki')) { return `${place.slice(0, -1)  }a`; }
  if (place.endsWith('staðir')) { return `${place.slice(0, -6)  }stöðum`; }
  if (place.endsWith('öræfi')) { return 'Öræfum'; }
  return place;
};

// ---------------------------------------------------------------------------

const postnumerAPIData_partial = z.object({
  features: z.array(
    z.object({
      properties: z.object({
        postnumer: z.number().min(100).max(999),
        stadur: z.string().transform((name) => name.trim().replace(/\s\s+/g, ' ')),
      }),
    })
  ),
});

await fetch(postnumerAPIUrl).then(async (response) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch postnumer data: ${response.statusText}`);
  }
  const data = await response.json();
  const postnumer = Object.values(
    Object.fromEntries(
      postnumerAPIData_partial
        .parse(data)
        .features.map(({ properties }) => {
          const postnumer = properties.postnumer;
          const name = properties.stadur.split(',')[0]!.trim();
          return [
            postnumer,
            {
              postnumer,
              name,
              name_dative: dativize(name),
            },
          ] as const;
        })
        .sort(([a], [b]) => a - b)
    )
  );

  const date = new Date().toISOString().split('T')[0];

  Bun.write(
    'src/_/postnumer-data.ts',
    `// NOTE: This file is auto-generated by the "fetch-data" script. DO NOT EDIT!

/**
 * Metadata about the data in your installed version of the "postnumer" package
 */
export const postnumerMeta = {
  lastUpdtedOn: ${JSON.stringify(date)}
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
