import { parseHTML } from 'linkedom';

const magicCodeDocsUrl =
  'https://www.skra.is/um-okkur/utgafur-og-skjol/taknmal-thjodskrar/';

// fetch the page's source code and feed it into parseHTML

await fetch(magicCodeDocsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `Failed to fetch thjodskraPlaces documentation page: ${response.statusText}`
      );
    }
    return response.text();
  })
  .then(parseHTML)
  .then(({ document }): string => {
    // Extract the table data from the page
    const groups = Array.from(document.querySelectorAll('h2, tbody > tr'))
      // Remove the headings that don't precede a table
      .filter((el, i, arr) => el.nodeName === 'TR' || arr[i + 1]?.nodeName === 'TR')
      // group the headings and table rows into pairs
      .map((el, i, arr) => {
        if (el.nodeName === 'TR') {
          return;
        }
        const title = el.textContent!.trim();
        const items: Record<string, string> = {};
        let nextEl = arr[++i];
        while (nextEl && nextEl.nodeName === 'TR') {
          const [code, place] = Array.from(nextEl.querySelectorAll('th,td'))
            .slice(0, 2)
            .map((td) => td.textContent!.trim().replace(/\s\s+/g, ' '));
          if (!code || !place) {
            throw new Error(
              [
                `Failed to parse thjodskraPlaces data tables.`,
                `Row ${i} of the "${title}" table is missing data:`,
                JSON.stringify([code, place]),
              ].join('\n')
            );
          }
          items[code] = place;
          nextEl = arr[i++];
        }
        return { title, items: Object.entries(items) };
      })
      // Remove empties
      .filter(<T>(val: T): val is NonNullable<T> => val != null)
      .filter(({ title }) => /staðartákntölur|landatákn/i.test(title));

    return `// NOTE: This file is auto-generated by the "fetch-data" script. DO NOT EDIT!

export const _thjodskraPlaces = {
  9000: 'Utan umdæma að svo stöddu',
  ${groups
    .flatMap(({ title, items }) => [
      ``,
      `// ${title}`,
      `// ---------------------------------------------------------------------------`,
      items.map(([code, place]) => `'${code}': ${JSON.stringify(place)},`).join('\n  '),
    ])
    .join('\n  ')}
};
`;
  })
  .then((moduleSource) => Bun.write('src/_/places-data.ts', moduleSource));