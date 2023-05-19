/**
 * Lookup table for the place names (localities) of every known post-code
 * ("póstnúmer") in Iceland.
 *
 * Based on information found on the page:
 * https://posturinn.is/einstaklingar/ymsar-upplysingar/postnumer-og-thjonustustig/
 *
 * Last updated on: 2023-04-26
 */
export declare const postnumer: Record<string | number, { name: string; name_dative: string }>

/**
 * Lookup table for Þjóðskrá's place and couuntry code values
 * for localities, counties, countries and continents.
 *
 * Based on data from
 * https://www.skra.is/um-okkur/utgafur-og-skjol/taknmal-thjodskrar/
 *
 * Last updated: 2021-05-19
 * ([Snapshot](https://web.archive.org/web/20230514134137/https://www.skra.is/um-okkur/utgafur-og-skjol/taknmal-thjodskrar/))
*/
export declare const thjodskraPlaces: Record<string, string>