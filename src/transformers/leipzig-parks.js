import fs from 'fs';
import queryOverpass from '@derhuerst/query-overpass'
import data from '../data-raw/leipzig-parks.json'

const __dirname = new URL('.', import.meta.url).pathname;

let ids = data.elements.filter(e => e.type === 'way').map(e => e.nodes[0])

queryOverpass(`
  [out:json][timeout:25];
  node(id:${ids.join(',')});
  out body;
`).then(resolved_ids => {

  let newData = data.elements.map(d => {
    if(d.type === 'way') {
      let ob = resolved_ids.find(ri => ri.id === d.nodes[0]);
      return {
        ...d,
        lon: ob.lon,
        lat: ob.lat,
      }
    }

    if(!d.tags) console.log(d)

    return d;
  })

  fs.writeFileSync(`${__dirname}/../data/leipzig-parks.json`, JSON.stringify(newData, null, 2))
})


