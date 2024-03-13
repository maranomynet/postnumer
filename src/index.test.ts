import { describe, expect, test } from 'bun:test';

import {
  postalCodeMap,
  postalCodes,
  postnumer,
  postnumerMeta,
  thjodskraPlaces,
} from './index.js';
import * as moduleExports from './index.js';

// ===========================================================================
// Test Type Signature and Exports

if (false as boolean) {
  /* eslint-disable @typescript-eslint/no-unused-vars */

  // Make sure the module exports are as advertised
  const exports: Record<keyof typeof moduleExports, true> = {
    postnumerMeta: true,
    postnumer: true,
    postalCodes: true,
    postalCodeMap: true,
    thjodskraPlaces: true,
  };

  /* eslint-enable @typescript-eslint/no-unused-vars */
}

// ===========================================================================
// Test Individual Functions

// Set timezone to something ahead of UTC to make sure tests don't depend on local time
process.env.TZ = 'Asia/Yangon';

describe('package', () => {
  test('`postnumer` is a simple alias for `postalCodeMap`', () => {
    // eslint-disable-next-line deprecation/deprecation
    expect(postnumer).toStrictEqual(postalCodeMap);
  });

  test('`postnumerMeta` has lastUpdated', () => {
    expect(postnumerMeta.lastUpdated).toBeString();
    expect(postnumerMeta.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const lastUpdated = new Date(postnumerMeta.lastUpdated);
    expect(lastUpdated).toBeValidDate();
    expect(lastUpdated.getTime()).toBeLessThan(Date.now());
  });

  Object.entries({ postalCodeMap, postalCodes, thjodskraPlaces }).forEach(
    ([objectName, object]) => {
      test(`'${objectName}' object is not empty`, () => {
        expect(Object.keys(object).length).toBeGreaterThan(0);
      });
    }
  );
});
