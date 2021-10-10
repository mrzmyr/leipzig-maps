import { isMobile } from "react-device-detect";
import { renderToString } from 'react-dom/server'

import L from 'leaflet'
import { Tooltip, Marker, Popup } from 'react-leaflet'
import Button from 'react-bootstrap/Button';

const MapMarkers = ({ data, onClick = null, renderTooltip, isVisible, renderIcon, renderLink = null }) => {
  return data.map((item, index) => {

    var myIcon = L.divIcon({
      iconSize: [20, 20],
      html: renderToString(renderIcon(item))
    });
    
    const popup = (
      <Popup>
        <div style={{ fontSize: '1rem' }}>
          {renderTooltip(item)}
          <Button variant="link" onClick={e => {
            if(typeof(onClick) === 'function') onClick(item);
            if(renderLink !== null) window.open(renderLink(item))
          }}>Mehr Details</Button>
        </div>
      </Popup>
    )

    const tooltip = (
      <Tooltip sticky>
        <div style={{ fontSize: '1rem' }}>
          {renderTooltip(item)}<br />
        </div>
      </Tooltip>
    )
    
    let isMarkerVisible = typeof(isVisible) === 'function' ? isVisible(item) === true : true;
    
    if(!isMarkerVisible) return null;
    
    return (
      <Marker 
        key={index}
        position={[item.lat, item.lon]}
        icon={myIcon}
        // eventHandlers={{
        //   click: () => {
        //   }
        // }}
      >
        {popup}
        {!isMobile && tooltip}
      </Marker>
    )
  })
}

export default MapMarkers;