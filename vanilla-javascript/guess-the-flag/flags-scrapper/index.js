const { writeFile } = require('fs/promises');

const axios = require('axios');
const cheerio = require('cheerio');

const flagsWikipediaPageUrl = 'https://en.wikipedia.org/wiki/Lists_of_flags';

function getPageHTML(url) {
  return axios.get(url).then((response) => response.data);
}

async function getFlags(url) {
  const html = await getPageHTML(url);
  const $ = cheerio.load(html);

  const flagsByContinent = $(
    'table.nowraplinks:nth-child(1) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2) ul li a'
  );

  const flags = [];

  for (let i = 0; i < flagsByContinent.length; i++) {
    const anchor = flagsByContinent[i];
    const url = $(anchor).attr();
    let [, continentName] = url.title.split('of');

    const flagsUrl = `https://en.wikipedia.org${url.href}`;
    const flagsHTML = await getPageHTML(flagsUrl);

    const $$ = cheerio.load(flagsHTML);

    const tables = $$('table.wikitable');

    for (let j = 0; j < tables.length; j++) {
      const table = tables[j];
      const tableRows = $$(table).find('tr:not(tr:first-child)');

      for (let k = 0; k < tableRows.length; k++) {
        const row = tableRows[k];
        const flagUrl = $$($$(row).find('td:nth-child(1) a img')).attr('src');
        let flagName = $$($$(row).find('td:nth-child(3)')).text();
        if (flagName.includes('See also:')) {
          [flagName, _] = flagName.split('See also:');
        }
        if (flagName.includes('flags of')) {
          flagName = flagName.replace('flags of', '');
        }
        let [, countryName] = flagName.split(/Flags? of/);
        if (flagName.includes('flag')) {
          flagName = flagName.replace('flag', '');
        }

        if (continentName.includes('flags')) {
          continentName = continentName.replace('flags', '');
        }

        flags.push({
          flagName: countryName ? countryName.trim() : flagName,
          flagUrl,
          continent: continentName.trim(),
        });
      }
    }
  }

  return flags;
}

getFlags(flagsWikipediaPageUrl).then((result) => {
  writeFile('../flags.json', JSON.stringify(result, null, 2), 'utf-8');
});
