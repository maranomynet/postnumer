# Change Log for `postnumer`

## Upcoming...

- ... <!-- Add new lines here. -->
- fix: Syntax fix preventing "511 Hólmavík" being added

## 1.3.0

_2026-07-03_

- feat: Switch to use Byggðastofnun/LMÍ as a source for `postalCodes` data —
  as Íslandspóstur has removed data from their website and don't seem
  concerned with exposing any authoritative info on the postal codes they're
  working with.  
  The switch results in the following changes to the data:
  - Some place names are more correct/specific. This is good.
  - Several postal codes disappear but these seem to be more "esorteric"
    postal codes that Íslandspóstur may mostly be using internally — i.e. a
    range of of postal codes 121-132 for Reykjavík and then a small selection
    of more rural postal codes ending in "2".
  - The data includes a spelling error and a single missing real postal code
    (511) both are patched manually by the script.

## 1.2.3 – 1.2.4

_2024-10-09_

- fix: Correct the dative form for "Kjós", "Öræfi" and "Fljót"
- fix: Update `postalCodes` and `postalCodeMap` place names

## 1.2.2

_2024-04-04_

- docs: Fix mistake in `@deprecated` message
- data: Verify postal codes and place names as still current

## 1.2.1

_2024-03-13_

- fix: Typo in `postnumerMeta.lastUpdated` property name
- data: Verify postal codes and place names as still current

## 1.2.0

_2024-02-18_

- feat: Add `postalCodes`, an array of post code info objects.
- feat: Add `postalCodeMap` export, deprecating `postnumer`.

## 1.1.5

_2024-02-18_

- fix: Add missing `thjodskraPlaces` magic code `9000` ("Utan umdæma")
- build: Perform data updates programmatically

## 1.1.1 – 1.1.4

_2024-02-02_

- fix: Update post codes and place-names with latest data
- fix: Remove trailing/leading spaces from locality names
- docs: Improve/correct README

## 1.1.0

_2023-05-19_

- feat: Add `thjodskraPlaces` lookup table for Þjóðskrá's magic codes for
  localities, counties, countries and continents
- docs: Add JSDoc for the `postnumer` object

## 1.0.0 – 1.0.1

_2023-04-26_

- Initial commit with fresh post-code + locality data
