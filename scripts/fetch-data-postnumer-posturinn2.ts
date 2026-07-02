import { Window } from 'happy-dom';
import * as v from 'valibot';

import { dativize } from './postnumer-utils.js';

// Source: https://posturinn.is/einstaklingar/ymsar-upplysingar/postnumer-og-thjonustustig
// ...fetches its data from this API endpoint:
const postnumerAPIUrl = 'https://api.mobiz.posturinn.is/api/v1/locations/servicelevel';
// As of early summer 2026 the city values now represent the "Servicing post office"
// not the town/locality the postcode represents.
// Thus we must harvest the town/locality names from this page
const postnumerSvaediPage =
  'https://posturinn.is/einstaklingar/ymsar-upplysingar/verdskra/svaedaskipting-postnumera/';
// Expand the ranges represented there (i.e. "101-116") and then remove the
// resulting postcodes that aren't found in the API data above.
// FML! LOL!

// NOTE: To properly scrape the data from the page, we'c need to use something
// like happyDÓM, but laziness makes dumb RegExp faffing more appealing.
// Going with that until it doesn't work anymore.

// ---------------------------------------------------------------------------

const range = (start: number, end: number): Array<number> => {
  const min = Math.min(start, end);
  return Array.from({ length: Math.abs(start - end) + 1 }, (_, i) => min + i);
};

const postnumers = await fetch(postnumerAPIUrl)
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch postnumer API data: ${response.statusText}`);
    }
    const data = await response.json();
    return v
      .parse(
        v.array(
          v.object({
            postcode: v.pipe(v.number(), v.minValue(100), v.maxValue(999)),
          })
        ),
        data
      )
      .map(({ postcode }) => postcode);
  })
  .then((postnumers) => new Set(postnumers));

await fetch(postnumerSvaediPage).then(async (response) => {
  if (!response.ok) {
    throw new Error(`Failed to fetch postnumer svæði page: ${response.statusText}`);
  }
  const html = await response.text();

  const { document } = new Window({ settings: { disableCSSFileLoading: true } });

  document.documentElement.innerHTML = html;

  const pageDataString =
    (document.querySelector('div[data-page]') as HTMLDivElement | null)?.dataset.page ||
    '';

  let pageDataHTML: string | undefined;
  try {
    const pageDataRaw = JSON.parse(pageDataString);
    // console.info(pageDataRaw);
    // console.info(pageDataRaw.Values.ContentSections);

    const contentSections = v.parse(
      v.object({
        Values: v.object({
          ContentSections: v.array(
            v.object({
              Type: v.string(),
              Values: v.object({
                Content: v.string(),
              }),
            })
          ),
        }),
      }),
      pageDataRaw
    ).Values.ContentSections;

    pageDataHTML = contentSections
      .filter((section) => section.Type === 'richText')
      .map((section) => section.Values.Content)
      .filter((content) => /<table[\s>]/i.test(content))[0];
  } catch (error) {
    throw new Error(`Failed to parse page data JSON: ${error}`);
  }

  // console.info(pageDataHTML);

  if (!pageDataHTML) {
    throw new Error(
      `Failed to find any richText content sections in postnumer svæði page`
    );
  }

  document.body.innerHTML = pageDataHTML;

  const tdTexts = Array.from(document.querySelectorAll('td'))
    // Remove any <td> elements that have child elements
    // (i.e. only keep the ones that contain text only)
    .filter((td) => !td.querySelector('*'))
    .map((td) =>
      td.textContent
        .trim()
        .replace(/\s+/gs, ' ')
        .replace(/ ?, ?/g, ',')
        .replace(/,(\D)/g, ' $1')
        .replace(/ ?[-–—] ?/g, '-')
    )
    .filter((str) => !!str && /\d{3}/.test(str));

  if (tdTexts.length === 0) {
    throw new Error(`Failed to find text-only <td> elements in postnumer svæði page`);
  }

  // console.info(tdTexts);

  const postnumer = tdTexts
    .flatMap((text) => {
      const tuples: Array<[postnumer: number, locality: string]> = [];

      let remainingText = text.replace(
        /(\d{3}) \(([^)]+?)\),?/g,
        (_, postnumer: string, locality: string) => {
          tuples.push([parseInt(postnumer), locality]);
          return '';
        }
      );

      remainingText = remainingText.replace(
        /(\d{3}(?:[-,]\d{3})*) (.+)/g,
        (_, postnumers: string, locality: string) => {
          tuples.push(
            ...postnumers
              .split(',')
              .flatMap((pn) => {
                if (pn.includes('-')) {
                  const [start, end] = pn.split('-').map((n) => parseInt(n)) as [
                    number,
                    number
                  ];
                  return range(start, end);
                }
                return parseInt(pn);
              })
              .map((pn: number) => [pn, locality] as [number, string])
          );
          return '';
        }
      );

      if (remainingText.trim()) {
        console.warn(`Unmatched text in table cell:`, {
          remainingText,
          originalText: text,
        });
      }

      return tuples;
    })
    .filter(([postnumer]) => postnumers.has(postnumer))
    .map(([postnumer, locality]) => ({
      postnumer,
      name: locality,
      name_dative: dativize(locality),
    }))
    .sort((a, b) => a.postnumer - b.postnumer);

  // console.info(postnumer);

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
