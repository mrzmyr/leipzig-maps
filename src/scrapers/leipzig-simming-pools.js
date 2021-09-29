import scrapeIt from "scrape-it";
import fs from 'fs';
import { search } from "../../lib/nominatim.mjs";

const domain = `https://www.leipzig.de`;
const url_indoor_pool = `${domain}/freizeit-kultur-und-tourismus/sport/sportstaetten/schwimmhallen`;
const url_outdoor_pool = `${domain}/freizeit-kultur-und-tourismus/sport/sportstaetten/freibaeder`;

const __dirname = new URL('.', import.meta.url).pathname;

Promise.all([scrapeIt(url_indoor_pool, {
    list: {
      listItem: '.address-list-item',
      data: {
        title: {
          selector: '.link_intern',
          attr: 'title'
        },
        address: {
          selector: '.list.left',
          convert: address => address.split('\n').map(d => d.trim()).filter(d => !!d)
        },
        link: {
          attr: "href",
          selector: '.link_intern',
          convert: href => `${domain}/${href}`
        }
      }
    }
}), scrapeIt(url_outdoor_pool, {
  list: {
    listItem: '.address-list-item',
    data: {
      title: {
        selector: '.link_intern',
        attr: 'title'
      },
      address: {
        selector: '.list.left',
        convert: address => address.split('\n').map(d => d.trim()).filter(d => !!d)
      },
      link: {
        attr: "href",
        selector: '.link_intern',
        convert: href => `${domain}/${href}`
      }
    }
  }
})]).then(async ([indoor_pool, outdoor_pool]) => {
  let data = [
    ...indoor_pool.data.list.map(sh => ({ ...sh, type: 'indoor_pool' })),
    ...outdoor_pool.data.list.map(sh => ({ ...sh, type: 'outdoor_pool' })),
  ]
  
  let newList = [];
  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    let q = `${element.address.join(' ').replace(/ \(.*\)/, '').replace('an der Schwimmhalle Nord', '').replace('Vollbedingstraße', 'Volbedingstraße').replace('Kirschbergstraße 84', 'Schwimmhalle Mitte')}`;
    console.log(q)
    let resp = await search(q)
    let search_results = resp.filter(r => ['water_park', 'sports_centre'].includes(r.type));
    if(search_results.length > 0) {
      element = {
        ...element,
        address: resp[0].address,
        lat: resp[0].lat,
        lon: resp[0].lon
      }
    } else {
      console.log(element.title, element.address, 'could not be found')
      console.log(resp)
    }
    newList.push(element)
  }

  fs.writeFileSync(`${__dirname}/../data/leipzig-swimming-pools.json`, JSON.stringify(newList, null, 2), 'utf8')
})