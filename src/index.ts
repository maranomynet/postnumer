import { _thjodskraPlaces } from './_/places-data.js';
import { _postalCodeMap, _postalCodes } from './_/postnumer-data.js';

// ===========================================================================

export { postnumerMeta } from './_/postnumer-data.js';

// ===========================================================================

/**
 * Lookup table for Þjóðskrá's place and couuntry code values
 * for localities, counties, countries and continents.
 *
 * Based on data from
 * https://www.skra.is/um-okkur/utgafur-og-skjol/taknmal-thjodskrar/
 */
export const thjodskraPlaces: Readonly<Record<string | number, string>> =
  _thjodskraPlaces;

// ===========================================================================

type PostalPlace = Readonly<{
  postnumer: number;
  name: string;
  name_dative: string;
}>;

/**
 * An array containing every post-code ("póstnúmer") in Iceland, along with its
 * corresponding place name.
 *
 * @see https://github.com/maranomynet/postnumer/tree/v1#postalcodes
 *
 * Last updated on: ${date}
 */
export const postalCodes: ReadonlyArray<PostalPlace> = _postalCodes;

/**
 * Lookup table for the place names (localities) of every known post-code
 * ("póstnúmer") in Iceland.
 *
 * @see https://github.com/maranomynet/postnumer/tree/v1#postalcodemap
 *
 */
export const postalCodeMap: Readonly<Record<number, PostalPlace>> = _postalCodeMap;

/**
 * @deprecated  Use `postalCodes` instead  (Will be removed in v2.0)
 */
export const postnumer = postalCodeMap;
