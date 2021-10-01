
import { renderToString } from 'react-dom/server'

import L from 'leaflet'
import { Tooltip, Marker } from 'react-leaflet'

const MapMarkers = ({ data, renderTooltip, renderIcon, renderLink = null }) => {
  return data.map((item, index) => {

    var myIcon = L.divIcon({
      iconSize: [20, 20],
      html: renderToString(renderIcon(item))
    });
    
    return (
      <Marker 
        key={index}
        position={[item.lat, item.lon]}
        icon={myIcon}
        eventHandlers={{
          click: () => renderLink !== null ? window.open(renderLink(item)) : {}
        }}
      >
        <Tooltip sticky>
          <div style={{ fontSize: '1rem' }}>
            {renderTooltip(item)}
          </div>
        </Tooltip>
      </Marker>
    )
  })
}

export default MapMarkers;