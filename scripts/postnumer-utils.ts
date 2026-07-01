/**
 * Converts an Icelandic place name to its dative form.
 *
 * This is super dumb, but it works for the current póstnúmer places in
 * Iceland.
 *
 * TODO: Consider using https://www.npmjs.com/package/beygla instead
 */
/* prettier-ignore */
// eslint-disable-next-line complexity
export const dativize = (place: string): string => {
  const placeLC = place.toLowerCase();
  if (placeLC === 'kjós') { return place; }
  if (placeLC.endsWith('s')) { return `${place}i`; }
  if (placeLC.endsWith('ar')) { return `${place.slice(0, -2)}um`; }
  if (placeLC.includes('fjörður')) { return place.replace('fjörður', 'firði'); }
  if (placeLC.endsWith('ur')) {
    if (placeLC.endsWith('dalur') || place.endsWith('staður')) { return place.slice(0, -2); }
    if (placeLC.endsWith('völlur')) { return `${place.slice(0, -6)}velli`; }
    if (placeLC.endsWith('klaustur')) { return `${place.slice(0, -2)}ri`; }
    if (placeLC.endsWith('ivogur')) { return `${place.slice(0, -6)}avogi`; }
    return `${place.slice(0, -2)}i`;
  }
  if (placeLC.endsWith('bær')) { return place.slice(0, -1); }
  if (placeLC.endsWith('a')) { return `${place.slice(0, -1)}u`; }
  if (placeLC.endsWith('holt') || place.endsWith('vatn')) { return `${place}i`; }
  if (placeLC.endsWith('hóll')) { return `${place.slice(0, -1)}i`; }
  if (placeLC.endsWith('fljót')) { return `${place}um`; }
  if (placeLC.endsWith('tangi') || place.endsWith('bakki')) { return `${place.slice(0, -1)}a`; }
  if (placeLC.endsWith('staðir')) { return `${place.slice(0, -6)}stöðum`; }
  if (placeLC.endsWith('öræfi')) { return 'Öræfum'; }
  return place;
};
