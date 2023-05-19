/*
  WARNING: All of this is super dumb, but works.

  HOWTO update this data object:
  (Directions last updated on: 2023-04-26)

  1. Go to: https://posturinn.is/einstaklingar/ymsar-upplysingar/postnumer-og-thjonustustig/

  2. Scroll to the bottom of the page, clicking "Sjá meira" as often
    as needed, until you've revealed every póstnúmer.

  3. Click one of the póstnúmer boxes and figure out a CSS selector
    that will return every póstnúmer box/item on the page.

  4. Set `cardSelector` below to be that selector.

  5. Copy the following extractor code snippet, paste it into the
    browser console, and execute it.

    ```js
    // BEGIN: Extractor code

    const dativize = (Place) => {
      const place = Place.toLowerCase();
      if (place.endsWith('s')) { return Place + 'i'; }
      if (place.endsWith('ar')) { return Place.slice(0, -2) + 'um'; }
      if (place.includes('fjörður')) { return Place.replace('fjörður', 'firði'); }
      if (place.endsWith('ur')) {
        if (place.endsWith('dalur') || place.endsWith('staður')) { return Place.slice(0, -2); }
        if (place.endsWith('völlur')) { return Place.slice(0, -6) + 'velli'; }
        if (place.endsWith('klaustur')) { return Place.slice(0, -2) + 'ri'; }
        if (place.endsWith('ivogur')) { return Place.slice(0, -6) + 'avogi'; }
        return Place.slice(0, -2) + 'i';
      }
      if (place.endsWith('bær')) { return Place.slice(0, -1); }
      if (place.endsWith('a')) { return Place.slice(0, -1) + 'u'; }
      if (place.endsWith('holt') || place.endsWith('vatn')) { return Place + 'i'; }
      if (place.endsWith('hóll')) { return Place.slice(0, -1) + 'i'; }
      if (place.endsWith('fljót')) { return Place + 'um'; }
      if (place.endsWith('tangi') || place.endsWith('bakki')) { return Place.slice(0, -1) + 'a'; }
      if (place.endsWith('staðir')) { return Place.slice(0, -6) + 'stöðum'; }
      if (place.endsWith('öræfi')) { return 'Öræfum'; }
      return Place;
    };

    // Beware: these hashed class-names are not stable...
    const cardSelector = '.src__Box-sc-1sbtrzs-0.hMtKsT';

    Object.fromEntries(
      Array.from(document.querySelectorAll(cardSelector))
        .map((elm) => {
          const pnr = elm.querySelector('h3').textContent.trim();
          const name = elm.querySelector('p')
            .textContent
            .replace(/Staður:\s/, '')
            .trim();
          return [pnr, { name, name_dative: dativize(name) }];
        })
    );

    // END: Extractor code
    ```

  6. If the above code throws an error, try to figure out what went wrong
    and update the code to fix the problem. (Pósturinn might have re-wamped
    their websote once again, so this may happen frequently.)

  7. Right-click the logged object in the console, select "Copy Object" and...

     a. then paste it into this file, replacing the current `postnumer` export.

     b. ALSO paste the object into `./postnumer.cjs` as `exports.postnumer`.

     c. Open `./index.d.ts` and update its JSDoc comment `last updated` date.
*/

// ===========================================================================

export const postnumer = {
  '101': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '102': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '103': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '104': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '105': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '107': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '108': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '109': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '110': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '111': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '112': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '113': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '116': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '121': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '123': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '124': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '125': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '127': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '128': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '129': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '130': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '132': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '161': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '162': {
    name: 'Reykjavík',
    name_dative: 'Reykjavík',
  },
  '170': {
    name: 'Seltjarnarnes',
    name_dative: 'Seltjarnarnesi',
  },
  '172': {
    name: 'Seltjarnarnes',
    name_dative: 'Seltjarnarnesi',
  },
  '190': {
    name: 'Vogar',
    name_dative: 'Vogum',
  },
  '191': {
    name: 'Vogar',
    name_dative: 'Vogum',
  },
  '200': {
    name: 'Kópavogur',
    name_dative: 'Kópavogi',
  },
  '201': {
    name: 'Kópavogur',
    name_dative: 'Kópavogi',
  },
  '202': {
    name: 'Kópavogur',
    name_dative: 'Kópavogi',
  },
  '203': {
    name: 'Kópavogur',
    name_dative: 'Kópavogi',
  },
  '206': {
    name: 'Kópavogur',
    name_dative: 'Kópavogi',
  },
  '210': {
    name: 'Garðabær',
    name_dative: 'Garðabæ',
  },
  '212': {
    name: 'Garðabær',
    name_dative: 'Garðabæ',
  },
  '220': {
    name: 'Hafnarfjörður',
    name_dative: 'Hafnarfirði',
  },
  '221': {
    name: 'Hafnarfjörður',
    name_dative: 'Hafnarfirði',
  },
  '222': {
    name: 'Hafnarfjörður',
    name_dative: 'Hafnarfirði',
  },
  '225': {
    name: 'Garðabær',
    name_dative: 'Garðabæ',
  },
  '230': {
    name: 'Reykjanesbær',
    name_dative: 'Reykjanesbæ',
  },
  '232': {
    name: 'Reykjanesbær',
    name_dative: 'Reykjanesbæ',
  },
  '233': {
    name: 'Reykjanesbær',
    name_dative: 'Reykjanesbæ',
  },
  '235': {
    name: 'Keflavíkurflugvöllur',
    name_dative: 'Keflavíkurflugvelli',
  },
  '240': {
    name: 'Grindavík',
    name_dative: 'Grindavík',
  },
  '241': {
    name: 'Grindavík',
    name_dative: 'Grindavík',
  },
  '245': {
    name: 'Suðurnesjabær',
    name_dative: 'Suðurnesjabæ',
  },
  '246': {
    name: 'Suðurnesjabær',
    name_dative: 'Suðurnesjabæ',
  },
  '250': {
    name: 'Suðurnesjabær',
    name_dative: 'Suðurnesjabæ',
  },
  '251': {
    name: 'Suðurnesjabær',
    name_dative: 'Suðurnesjabæ',
  },
  '260': {
    name: 'Reykjanesbær',
    name_dative: 'Reykjanesbæ',
  },
  '262': {
    name: 'Reykjanesbær',
    name_dative: 'Reykjanesbæ',
  },
  '270': {
    name: 'Mosfellsbær',
    name_dative: 'Mosfellsbæ',
  },
  '271': {
    name: 'Mosfellsbær',
    name_dative: 'Mosfellsbæ',
  },
  '276': {
    name: 'Mosfellsbær',
    name_dative: 'Mosfellsbæ',
  },
  '300': {
    name: 'Akranes',
    name_dative: 'Akranesi',
  },
  '301': {
    name: 'Akranes',
    name_dative: 'Akranesi',
  },
  '302': {
    name: 'Akranes',
    name_dative: 'Akranesi',
  },
  '310': {
    name: 'Borgarnes',
    name_dative: 'Borgarnesi',
  },
  '311': {
    name: 'Borgarnes',
    name_dative: 'Borgarnesi',
  },
  '320': {
    name: 'Reykholt',
    name_dative: 'Reykholti',
  },
  '340': {
    name: 'Stykkishólmur',
    name_dative: 'Stykkishólmi',
  },
  '341': {
    name: 'Stykkishólmur',
    name_dative: 'Stykkishólmi',
  },
  '342': {
    name: 'Stykkishólmur',
    name_dative: 'Stykkishólmi',
  },
  '345': {
    name: 'Flatey',
    name_dative: 'Flatey',
  },
  '350': {
    name: 'Grundarfjörður',
    name_dative: 'Grundarfirði',
  },
  '351': {
    name: 'Grundarfjörður',
    name_dative: 'Grundarfirði',
  },
  '355': {
    name: 'Ólafsvík',
    name_dative: 'Ólafsvík',
  },
  '356': {
    name: 'Snæfellsbær',
    name_dative: 'Snæfellsbæ',
  },
  '360': {
    name: 'Hellissandur',
    name_dative: 'Hellissandi',
  },
  '370': {
    name: 'Búðardalur',
    name_dative: 'Búðardal',
  },
  '371': {
    name: 'Búðardalur',
    name_dative: 'Búðardal',
  },
  '380': {
    name: 'Reykhólahreppur',
    name_dative: 'Reykhólahreppi',
  },
  '381': {
    name: 'Reykhólahreppur',
    name_dative: 'Reykhólahreppi',
  },
  '400': {
    name: 'Ísafjörður',
    name_dative: 'Ísafirði',
  },
  '401': {
    name: 'Ísafjörður',
    name_dative: 'Ísafirði',
  },
  '410': {
    name: 'Hnífsdalur',
    name_dative: 'Hnífsdal',
  },
  '415': {
    name: 'Bolungarvík',
    name_dative: 'Bolungarvík',
  },
  '416': {
    name: 'Bolungarvík',
    name_dative: 'Bolungarvík',
  },
  '420': {
    name: 'Súðavík',
    name_dative: 'Súðavík',
  },
  '421': {
    name: 'Súðavík',
    name_dative: 'Súðavík',
  },
  '425': {
    name: 'Flateyri',
    name_dative: 'Flateyri',
  },
  '426': {
    name: 'Flateyri',
    name_dative: 'Flateyri',
  },
  '430': {
    name: 'Suðureyri',
    name_dative: 'Suðureyri',
  },
  '431': {
    name: 'Suðureyri',
    name_dative: 'Suðureyri',
  },
  '450': {
    name: 'Patreksfjörður',
    name_dative: 'Patreksfirði',
  },
  '451': {
    name: 'Patreksfjörður',
    name_dative: 'Patreksfirði',
  },
  '460': {
    name: 'Tálknafjörður',
    name_dative: 'Tálknafirði',
  },
  '461': {
    name: 'Tálknafjörður',
    name_dative: 'Tálknafirði',
  },
  '465': {
    name: 'Bíldudalur',
    name_dative: 'Bíldudal',
  },
  '466': {
    name: 'Bíldudalur',
    name_dative: 'Bíldudal',
  },
  '470': {
    name: 'Þingeyri',
    name_dative: 'Þingeyri',
  },
  '471': {
    name: 'Þingeyri',
    name_dative: 'Þingeyri',
  },
  '500': {
    name: 'Staður',
    name_dative: 'Stað',
  },
  '510': {
    name: 'Hólmavík',
    name_dative: 'Hólmavík',
  },
  '511': {
    name: 'Hólmavík',
    name_dative: 'Hólmavík',
  },
  '512': {
    name: 'Hólmavík',
    name_dative: 'Hólmavík',
  },
  '520': {
    name: 'Drangsnes',
    name_dative: 'Drangsnesi',
  },
  '524': {
    name: 'Árneshreppur',
    name_dative: 'Árneshreppi',
  },
  '530': {
    name: 'Hvammstangi',
    name_dative: 'Hvammstanga',
  },
  '531': {
    name: 'Hvammstangi',
    name_dative: 'Hvammstanga',
  },
  '540': {
    name: 'Blönduós',
    name_dative: 'Blönduósi',
  },
  '541': {
    name: 'Blönduós',
    name_dative: 'Blönduósi',
  },
  '545': {
    name: 'Skagaströnd',
    name_dative: 'Skagaströnd',
  },
  '546': {
    name: 'Skagaströnd',
    name_dative: 'Skagaströnd',
  },
  '550': {
    name: 'Sauðárkrókur',
    name_dative: 'Sauðárkróki',
  },
  '551': {
    name: 'Sauðárkrókur',
    name_dative: 'Sauðárkróki',
  },
  '560': {
    name: 'Varmahlíð',
    name_dative: 'Varmahlíð',
  },
  '561': {
    name: 'Varmahlíð',
    name_dative: 'Varmahlíð',
  },
  '565': {
    name: 'Hofsós',
    name_dative: 'Hofsósi',
  },
  '566': {
    name: 'Hofsós',
    name_dative: 'Hofsósi',
  },
  '570': {
    name: 'Fljót',
    name_dative: 'Fljótum',
  },
  '580': {
    name: 'Siglufjörður',
    name_dative: 'Siglufirði',
  },
  '581': {
    name: 'Siglufjörður',
    name_dative: 'Siglufirði',
  },
  '600': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '601': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '602': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '603': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '604': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '605': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '606': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '607': {
    name: 'Akureyri',
    name_dative: 'Akureyri',
  },
  '610': {
    name: 'Grenivík',
    name_dative: 'Grenivík',
  },
  '611': {
    name: 'Grímsey',
    name_dative: 'Grímsey',
  },
  '616': {
    name: 'Grenivík',
    name_dative: 'Grenivík',
  },
  '620': {
    name: 'Dalvík',
    name_dative: 'Dalvík',
  },
  '621': {
    name: 'Dalvík',
    name_dative: 'Dalvík',
  },
  '625': {
    name: 'Ólafsfjörður',
    name_dative: 'Ólafsfirði',
  },
  '626': {
    name: 'Ólafsfjörður',
    name_dative: 'Ólafsfirði',
  },
  '630': {
    name: 'Hrísey',
    name_dative: 'Hrísey',
  },
  '640': {
    name: 'Húsavík',
    name_dative: 'Húsavík',
  },
  '641': {
    name: 'Húsavík',
    name_dative: 'Húsavík',
  },
  '645': {
    name: 'Fosshóll',
    name_dative: 'Fosshóli',
  },
  '650': {
    name: 'Laugar',
    name_dative: 'Laugum',
  },
  '660': {
    name: 'Mývatn',
    name_dative: 'Mývatni',
  },
  '670': {
    name: 'Kópasker',
    name_dative: 'Kópasker',
  },
  '671': {
    name: 'Kópasker',
    name_dative: 'Kópasker',
  },
  '675': {
    name: 'Raufarhöfn',
    name_dative: 'Raufarhöfn',
  },
  '676': {
    name: 'Raufarhöfn',
    name_dative: 'Raufarhöfn',
  },
  '680': {
    name: 'Þórshöfn',
    name_dative: 'Þórshöfn',
  },
  '681': {
    name: 'Þórshöfn',
    name_dative: 'Þórshöfn',
  },
  '685': {
    name: 'Bakkafjörður',
    name_dative: 'Bakkafirði',
  },
  '686': {
    name: 'Bakkafjörður',
    name_dative: 'Bakkafirði',
  },
  '690': {
    name: 'Vopnafjörður',
    name_dative: 'Vopnafirði',
  },
  '691': {
    name: 'Vopnafjörður',
    name_dative: 'Vopnafirði',
  },
  '700': {
    name: 'Egilsstaðir',
    name_dative: 'Egilsstöðum',
  },
  '701': {
    name: 'Egilsstaðir',
    name_dative: 'Egilsstöðum',
  },
  '710': {
    name: 'Seyðisfjörður',
    name_dative: 'Seyðisfirði',
  },
  '711': {
    name: 'Seyðisfjörður',
    name_dative: 'Seyðisfirði',
  },
  '715': {
    name: 'Mjóifjörður',
    name_dative: 'Mjóifirði',
  },
  '720': {
    name: 'Borgarfjörður eystri',
    name_dative: 'Borgarfirði eystri',
  },
  '721': {
    name: 'Borgarfjörður eystri',
    name_dative: 'Borgarfirði eystri',
  },
  '730': {
    name: 'Reyðarfjörður',
    name_dative: 'Reyðarfirði',
  },
  '731': {
    name: 'Reyðarfjörður',
    name_dative: 'Reyðarfirði',
  },
  '735': {
    name: 'Eskifjörður',
    name_dative: 'Eskifirði',
  },
  '736': {
    name: 'Eskifjörður',
    name_dative: 'Eskifirði',
  },
  '740': {
    name: 'Neskaupstaður',
    name_dative: 'Neskaupstað',
  },
  '741': {
    name: 'Neskaupstaður',
    name_dative: 'Neskaupstað',
  },
  '750': {
    name: 'Fáskrúðsfjörður',
    name_dative: 'Fáskrúðsfirði',
  },
  '751': {
    name: 'Fáskrúðsfjörður',
    name_dative: 'Fáskrúðsfirði',
  },
  '755': {
    name: 'Stöðvarfjörður',
    name_dative: 'Stöðvarfirði',
  },
  '756': {
    name: 'Stöðvarfjörður',
    name_dative: 'Stöðvarfirði',
  },
  '760': {
    name: 'Breiðdalsvík',
    name_dative: 'Breiðdalsvík',
  },
  '761': {
    name: 'Breiðdalsvík',
    name_dative: 'Breiðdalsvík',
  },
  '765': {
    name: 'Djúpivogur',
    name_dative: 'Djúpavogi',
  },
  '766': {
    name: 'Djúpivogur',
    name_dative: 'Djúpavogi',
  },
  '780': {
    name: 'Höfn í Hornafirði',
    name_dative: 'Höfn í Hornafirði',
  },
  '781': {
    name: 'Höfn í Hornafirði',
    name_dative: 'Höfn í Hornafirði',
  },
  '785': {
    name: 'Öræfi',
    name_dative: 'Öræfum',
  },
  '800': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '801': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '802': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '803': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '804': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '805': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '806': {
    name: 'Selfoss',
    name_dative: 'Selfossi',
  },
  '810': {
    name: 'Hveragerði',
    name_dative: 'Hveragerði',
  },
  '815': {
    name: 'Þorlákshöfn',
    name_dative: 'Þorlákshöfn',
  },
  '816': {
    name: 'Ölfus',
    name_dative: 'Ölfusi',
  },
  '820': {
    name: 'Eyrarbakki',
    name_dative: 'Eyrarbakka',
  },
  '825': {
    name: 'Stokkseyri',
    name_dative: 'Stokkseyri',
  },
  '840': {
    name: 'Laugarvatn',
    name_dative: 'Laugarvatni',
  },
  '845': {
    name: 'Flúðir',
    name_dative: 'Flúðir',
  },
  '846': {
    name: 'Flúðir',
    name_dative: 'Flúðir',
  },
  '850': {
    name: 'Hella',
    name_dative: 'Hellu',
  },
  '851': {
    name: 'Hella',
    name_dative: 'Hellu',
  },
  '860': {
    name: 'Hvolsvöllur',
    name_dative: 'Hvolsvelli',
  },
  '861': {
    name: 'Hvolsvöllur',
    name_dative: 'Hvolsvelli',
  },
  '870': {
    name: 'Vík',
    name_dative: 'Vík',
  },
  '871': {
    name: 'Vík',
    name_dative: 'Vík',
  },
  '880': {
    name: 'Kirkjubæjarklaustur',
    name_dative: 'Kirkjubæjarklaustri',
  },
  '881': {
    name: 'Kirkjubæjarklaustur',
    name_dative: 'Kirkjubæjarklaustri',
  },
  '900': {
    name: 'Vestmannaeyjar',
    name_dative: 'Vestmannaeyjum',
  },
  '902': {
    name: 'Vestmannaeyjar',
    name_dative: 'Vestmannaeyjum',
  },
};
