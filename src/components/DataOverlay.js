import MapPolygon from './MapPolygon'

const DataOverlay = ({
  cache,
  dataOverlayEntries,
  selectedDataKey,
  selectedX,
  selectedY,
  scale,
}) => {
  if(
    !cache[selectedDataKey] ||
    !cache[selectedDataKey][selectedX] ||
    !cache[selectedDataKey][selectedX][selectedY]
  ) return null;

  const databasis = cache[selectedDataKey][selectedX][selectedY];
  const selectedYValues = Object.keys(cache[selectedDataKey]).map(key => 
    cache[selectedDataKey][key][selectedY] ? cache[selectedDataKey][key][selectedY].map(d => d.value) : 0
  ).flat(1)
  const databasisMax = Math.max(...selectedYValues)
  const databasisMin = dataOverlayEntries[selectedDataKey].min || 0;
  const databasisColorScale = scale.domain([databasisMin, databasisMax]);
  
  return (
    <>
      {cache.districts.features.map(f => {
          let item = databasis.find(d => d.district === f.properties.title)
          return (
            <MapPolygon
              key={f.properties.key} 
              geoframe={f} 
              tooltip={
                <div style={{ fontSize: '1rem' }}>
                  <div style={{ fontSize: '1.4rem' }}>{item.value} {dataOverlayEntries[selectedDataKey].unit}</div>
                  {item.district}<br />
                  <div style={{ fontSize: '0.8rem' }}>{dataOverlayEntries[selectedDataKey].title}</div>
                  {
                    dataOverlayEntries[selectedDataKey].title !== selectedY.replace(' insgesamt', '') &&
                    <div style={{ fontSize: '0.8rem' }}>{selectedY}</div>
                  }
                </div>
              }
              pathOptions={{
                fillColor: databasisColorScale(item.value).hex()
              }}
            />
          )
      })}
    </>
  )
}

export default DataOverlay;