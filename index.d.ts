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
