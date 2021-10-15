import { faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chroma from 'chroma-js';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { isMobile } from "react-device-detect";
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import ColorScale from './ColorScale';
import DataOverlay from './DataOverlay';
import DataOverlayOptions from './DataOverlayOptions';
import Markers from './Markers';
import MarkerToggles from './MarkerToggles';
import OffcanvasFooter from './OffcanvasFooter';
import OwnLocationMarker from './OwnLocationMarker';
import SwitchLine from "./SwitchLine";

const dataOverlayEntries = {
  'aerzte': { 
    title: 'Ärzte', 
    scale: chroma.scale('PuRd'),
    unit: 'Ärzte', 
  },
  'arbeitslose-insgesamt': { 
    title: 'Arbeitslose', 
    scale: chroma.scale('OrRd'),
    unit: 'Arbeitslose', 
  },
  'bedarfsgemeinschaften': { 
    title: 'Bedarfsgemeinschaften',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'einwohner-insgesamt': { 
    title: 'Population',
    scale: chroma.scale('BuPu'),
    unit: 'Menschen',
  },
  'einwohnerdichte': { 
    title: 'Bevölkerungsdichte', 
    scale: chroma.scale('BuPu'),
    unit: 'Menschen',
  },
  'gesamtflaeche': { 
    title: 'Gesamtfläche', 
    scale: chroma.scale('Greys'),
    unit: 'km²'
  },
  'haushaltseinkommen': { 
    title: 'Einkommen', 
    scale: chroma.scale('PuBu'),
    min: 1000,
    unit: '€'
  },
  'jugendquote': {
    title: 'Alter', 
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'kraftfahrzeuge-insgesamt': { 
    title: 'Kraftfahrzeuge', 
    scale: chroma.scale('Purples'),
    unit: 'Fahrzeuge'
  },
  'migranten': { 
    title: 'Zugewanderte', 
    scale: chroma.scale('GnBu'),
    unit: 'Zugewanderte',
  },
  'straftaten-insgesamt': { 
    title: 'Straftaten', 
    scale: chroma.scale('YlOrRd'),
    unit: 'Straftaten',
  },
  'unternehmen-insgesamt': { 
    title: 'Unternehmen', 
    scale: chroma.scale('Blues'),
    unit: 'Unternehmen',
  },
  'wohnungen': { 
    title: 'Wohnungen',
    scale: chroma.scale('RdPu')
  },
}

const center = [51.340199, 12.430103];

function Hooks() {  
  useMapEvent('click', (e) => {
    console.log(e.latlng)
  })
  return null
}

const Map = () => {

  const [cache, setCache] = useState({})

  const [showOffcanvas, setShowOffcanvas] = useState(true);

  const [loadings, setLoadings] = useState({
    districts: true
  });

  const [showMarker, setShowMarker] = useState({
    bike_lanes: false,
    bus_stops: false,
    train_stops: false,
    tram_stops: false,
    swimming_pools: false,
    playgrounds: false,
    daycares: false,
    data_overlay: false,
    markets: false,
  });

  const [selectedDataKey, setSelectedDataKey] = useState(null);
  const [selectedX, setSelectedX] = useState(null);
  const [selectedY, setSelectedY] = useState(null);

  const toggleDataOverlay = () => {
    setShowMarker({ ...showMarker, data_overlay: !showMarker.data_overlay })
  }
  
  const selectDataOverlayCategory = (key) => {
    setSelectedDataKey(key)
    
    if(!cache[key]) {
      setLoadings({ ...loadings, [key]: true })
      fetch(`${process.env.PUBLIC_URL}/data/leipzig-${key}.json`)
        .then(response => response.json())
        .then(response => {
          setLoadings(loadings => ({ ...loadings, [key]: false }))
          setCache(cache => ({ ...cache, [key]: response.data }))
          setShowMarker(showMarker => ({ ...showMarker, [key]: !showMarker[key] }))
        });
    } else {
      setShowMarker({ ...showMarker, [key]: !showMarker[key] })
    }    
  }
  
  const toggleMarkers = (key) => {
    if(!cache[key]) {
      setLoadings({ ...loadings, [key]: true })
      fetch(`${process.env.PUBLIC_URL}/data/leipzig-${key.replace('_', '-')}.json`)
        .then(response => response.json())
        .then(data => {
          setCache({ ...cache, [key]: data })
          setShowMarker({ ...showMarker, [key]: !showMarker[key] })
          setLoadings({ ...loadings, [key]: false })
        });
    } else {
      setShowMarker({ ...showMarker, [key]: !showMarker[key] })
    }
  }

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/leipzig-districts.json`)
    .then(res => res.json())
    .then(data => {
      setCache(cache => ({ ...cache, districts: data }))
      setLoadings(loadings => ({ ...loadings, districts: false }))
    })
    selectDataOverlayCategory(Object.keys(dataOverlayEntries)[0])
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(cache[selectedDataKey]) {
      let selectedData = cache[selectedDataKey];
      let xKeys = Object.keys(selectedData)
      let yKeys = Object.keys(selectedData[xKeys[0]])
      setSelectedX(xKeys[xKeys.length - 1]);
      setSelectedY(yKeys[0]);
    }
  }, [cache, selectedDataKey])

  let databasis = null;
  let databasisMax = null;
  let databasisMin = null;
  let databasisMaxYears = null;

  if(
    cache[selectedDataKey] &&
    cache[selectedDataKey][selectedX] &&
    cache[selectedDataKey][selectedX][selectedY]
  ) {
    databasis = cache[selectedDataKey][selectedX][selectedY];
    const selectedYValues = Object.keys(cache[selectedDataKey]).map(key => 
      cache[selectedDataKey][key][selectedY] ? cache[selectedDataKey][key][selectedY].map(d => d.value) : 0
    ).flat(1)
    databasisMax = Math.max(...selectedYValues)
    databasisMaxYears = []
    Object.keys(cache[selectedDataKey]).forEach(key => {
      if(
        cache[selectedDataKey][key][selectedY] && 
        cache[selectedDataKey][key][selectedY].map(d => d.value).includes(databasisMax)
      ) {
        databasisMaxYears.push(key)
      }
    })

    databasisMin = dataOverlayEntries[selectedDataKey].min || 0;
  }

  // const dataOverlayScale = chroma.scale('Spectral');
  const dataOverlayScale = dataOverlayEntries[selectedDataKey] ? dataOverlayEntries[selectedDataKey].scale : null;
  
  return (
    <>
    <MapContainer 
      style={{ height: '100vh' }}
      center={center} 
      zoom={12}
      tap={false}
    >
      {!showMarker.bike_lanes && <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=LtQePu1HTsFQi3NRcYZ5"
      />}
      {showMarker.bike_lanes && <TileLayer
        attribution='<a href="https://www.cyclosm.org" target="_blank">&copy; cyclosm</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />}
      <Hooks />
      <Markers showMarker={showMarker} cache={cache} />
      {
        showMarker.data_overlay && 
        !loadings.districts && 
        <DataOverlay 
          dataOverlayEntries={dataOverlayEntries}
          scale={dataOverlayScale}
          cache={cache}
          selectedDataKey={selectedDataKey}
          selectedX={selectedX}
          selectedY={selectedY}
        />
      }
      {
        showMarker.own_location && 
        <OwnLocationMarker />
      }
    </MapContainer>
      {
        !showOffcanvas && 
        <div style={{ 
          position: 'absolute', 
          zIndex: 999, 
          right: 20, 
          bottom: 20, 
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        }}>
          <Button 
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 60,
            }}
            size="lg" 
            onClick={() => setShowOffcanvas(true)}
          ><FontAwesomeIcon size="lg" icon={faCog} /></Button>
        </div>
      }
      {
        showMarker.data_overlay && 
        <div style={{ position: 'absolute', fontFamily: 'monospace', zIndex: 999, left: 10, bottom: 10, padding: 10, borderRadius: 10, background: 'white', cursor: 'pointer' }} onClick={() => setShowOffcanvas(true)}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-colorscale`}>
                Der maximal Wert wurde in {databasisMaxYears && databasisMaxYears.join(', ')} erreicht.
              </Tooltip>
            }
          >
              <div>{selectedY}&nbsp;({selectedX})</div>
          </OverlayTrigger>
              <ColorScale scale={dataOverlayScale} data={databasis} min={databasisMin} max={databasisMax} />
        </div>
      }
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)} 
        backdrop={false} 
        placement={isMobile ? 'bottom' : 'end'}
        style={{
          height: isMobile ? '40vh' : '100vh',
          border: 0,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 20px 0px',
        }}
      >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Einstellungen</Offcanvas.Title>
      </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            padding: 0,
          }}
        >
          {loadings.districts && <div style={{ textAlign: 'center', padding: 10 }}><Spinner animation="border" size="sm" /></div>}
          {!loadings.districts &&
          <>
            <SwitchLine
              loading={loadings.data_overlay}
              checked={showMarker.data_overlay}
              onChange={e => toggleDataOverlay()}
              icon={<FontAwesomeIcon icon={faChartPie} />}
              label="Details zu Ortsteilen anzeigen"
            />
          {
            showMarker.data_overlay &&  
            <>
              <DataOverlayOptions
                dataEntries={dataOverlayEntries}
                cache={cache}
                selectedDataKey={selectedDataKey}
                selectedX={selectedX}
                selectedY={selectedY}
                setSelectedX={setSelectedX}
                setSelectedY={setSelectedY}
                selectDataOverlayCategory={selectDataOverlayCategory}
                loadings={loadings}
              />
            </>
          }
          <MarkerToggles 
            showMarker={showMarker}
            toggleMarkers={toggleMarkers}
            setShowMarker={setShowMarker}
            loadings={loadings}
          />
          <div style={{ height: 1, background: '#eee', marginTop: 10, marginBottom: 10 }} />
          </>
          }
          
          <OffcanvasFooter />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Map;