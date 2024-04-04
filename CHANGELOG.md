# Change Log for `postnumer`

## Upcoming...

- ... <!-- Add new lines here. -->

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
