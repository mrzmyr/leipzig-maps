import { useState } from 'react';
import { Polygon as P, Tooltip } from 'react-leaflet'

const defaultPathOptions = {
  stroke: false,
  fillOpacity: 0.6,
}

const Polygon = ({ geoframe, pathOptions, tooltip }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  
  return (
    <P
      pathOptions={{
        ...defaultPathOptions,
        ...pathOptions,
        fillOpacity: isHighlighted ? 0.6 : defaultPathOptions.fillOpacity
      }}
      positions={geoframe.geometry.coordinates[0]}
      eventHandlers={{
        mouseover: () => setIsHighlighted(true),
        mouseout: () => setIsHighlighted(false)
      }}
    >
      <Tooltip direction="top" sticky>
        {tooltip}
      </Tooltip>
    </P>
  )
}

export default Polygon;
