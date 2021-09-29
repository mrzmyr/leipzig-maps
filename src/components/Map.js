import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'
import chroma from 'chroma-js';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BTooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBus, faSwimmingPool, faSwimmer, faChild, faBaby, faHome, faSubway, faTrain, faDumbbell, faShoppingBasket, faTree } from '@fortawesome/free-solid-svg-icons'

import districts from '../data/leipzig-districts.json'

import data_entries from '../data'
import bus_stops from '../data/leipzig-bus-stops.json'
import train_stops from '../data/leipzig-train-stops.json'
import tram_stops from '../data/leipzig-tram-stops.json'
import swimming_pools from '../data/leipzig-swimming-pools.json'
import fitness_stuidos from '../data/leipzig-fitness-studios.json'
import daycares from '../data/leipzig-daycares.json'
import playgrounds from '../data/leipzig-playgrounds.json'
import markets from '../data/leipzig-markets.json'
import parks from '../data/leipzig-parks.json'
import supermarkets from '../data/leipzig-supermarkets.json'

import PolygonProxy from './Polygon'
import CreditsModal from './CreditsModal'
import Markers from './Markers'

const center = [51.340199, 12.430103];

function Hooks() {  
  useMapEvent('click', (e) => {
    console.log(e.latlng)
  })
  return null
}

const Map = () => {
  let [selectedDataKey, setSelectedDataKey] = useState(Object.keys(data_entries)[0]);
  
  let selectedData = data_entries[selectedDataKey].data;
  
  let xKeys = Object.keys(selectedData)
  let yKeys = Object.keys(selectedData[xKeys[0]])
  
  let [selectedX, setSelectedX] = useState(xKeys[0]);
  let [selectedY, setSelectedY] = useState(yKeys[0]);

  const [showOffcanvas, setShowOffcanvas] = useState(true);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
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

  useEffect(() => {
    let selectedData = data_entries[selectedDataKey].data;
    let xKeys = Object.keys(selectedData)
    let yKeys = Object.keys(selectedData[xKeys[0]])
    setSelectedX(xKeys[xKeys.length - 1]);
    setSelectedY(yKeys[0]);
  }, [selectedDataKey])

  if(!selectedData[selectedX] || !selectedData[selectedX][selectedY]) return null;

  const databasis = selectedData[selectedX][selectedY];

  const max = Math.max(...databasis.map(d => d.value))

  // scale
  const colorScale = chroma.scale(['yellow', 'navy']).mode('lch').domain([0,max]);
  const _100 = [];
  for (let i = 0; i < 100; i++) _100.push(i)
  
  return (
    <>
    <MapContainer 
      style={{ height: '100vh' }} 
      center={center} 
      zoom={12}
    >
      {!showMarker.bike_lanes && <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/bright/{z}/{x}/{y}@2x.png?key=LtQePu1HTsFQi3NRcYZ5"
      />}
      {showMarker.bike_lanes && <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />}
      <Hooks />
      
      {showMarker.swimming_pools && 
        <Markers
          data={swimming_pools}
          renderTooltip={item => <div>{item.title}<br />(click for details)</div>}
          renderIcon={item => 
              item.type === 'indoor_pool' ? 
              <FontAwesomeIcon icon={faSwimmingPool} /> : 
              <FontAwesomeIcon icon={faSwimmer} />
          }
          renderLink={item => item.link}
        />
      }
      {showMarker.bus_stops && 
        <Markers
          data={bus_stops.elements}
          renderTooltip={item =>
            <div>{item.tags.name} ({item.tags.network})<br />(click for details)</div>
          }
          renderIcon={item => <FontAwesomeIcon icon={faBus} />}
          renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
        />
      }
      {showMarker.tram_stops && 
        <Markers
          data={tram_stops.elements}
          renderTooltip={item => 
            <div>{item.tags.name} ({item.tags.network})<br />(click for details)</div>
          }
          renderIcon={item => <FontAwesomeIcon icon={faSubway} />}
          renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
        />
      }
      {showMarker.train_stops && 
        <Markers
          data={train_stops.elements}
          renderTooltip={item => {
            return (
              <div>
                {item.tags.name}<br />
                {item.tags.operator}<br />
                (click for details)
              </div>
            )
          }}
          renderIcon={item => <FontAwesomeIcon icon={faTrain} />}
          renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
        />
      }
      {showMarker.fitness_stuidos && 
        <Markers
          data={fitness_stuidos.elements}
          renderTooltip={item => <div>{item.tags.name}<br />(click for details)</div>}
          renderIcon={item => <FontAwesomeIcon icon={faDumbbell} />}
          renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
        />
      }
      {showMarker.daycares && 
        <Markers
          data={daycares}
          renderTooltip={item => <div>{item.name}<br />{item.address ? item.address.full : null}</div>}
          renderIcon={item => <FontAwesomeIcon icon={faBaby} />}
          renderLink={item => item.address ? `https://www.openstreetmap.org/search?query=${item.address.full}` : '#'}
        />
      }
      {showMarker.markets && 
        <Markers
          data={markets}
          renderTooltip={item => <div>{item.title}<br />{item.opening_hours}<br />{item.location}</div>}
          renderIcon={item => <FontAwesomeIcon icon={faHome} />}
          renderLink={item => `https://www.openstreetmap.org/search?query=${item.location}`}
        />
      }
      {showMarker.playgrounds && 
        <Markers
          data={playgrounds}
          renderTooltip={item => <div>{item.name}<br />{item.location}</div>}
          renderIcon={item => <FontAwesomeIcon icon={faChild} />}
          renderLink={item => `https://www.openstreetmap.org/search?query=${item.lat},${item.lon}`}
        />
      }
      {showMarker.supermarkets && 
        <Markers
          data={supermarkets.elements}
          renderTooltip={item => <div>{item.tags.name}<br />{item.tags.organic ? `organic: ${item.tags.organic}`: ''}</div>}
          renderIcon={item => <FontAwesomeIcon icon={faShoppingBasket} color={item.tags.organic ? 'green' : 'black'} />}
          renderLink={item => `https://www.openstreetmap.org/search?query=${item.lat},${item.lon}`}
        />
      }
      {showMarker.parks && 
        <Markers
          data={parks.filter(p => p.tags?.name)}
          renderTooltip={item => item.tags.name}
          renderIcon={item => <FontAwesomeIcon icon={faTree} color={'green'} />}
          renderLink={item => `https://www.openstreetmap.org/search?query=${item.lat},${item.lon}`}
        />
      }

      {showMarker.data_overlay && districts.features.map(f => {
        let item = databasis.find(d => d.district === f.properties.title)
        return (
          <PolygonProxy
            key={f.properties.key} 
            geoframe={f} 
            tooltip={
              <div style={{ fontSize: '1rem' }}>
                {item.district} ({selectedX})<br />
                {selectedY} {item.value}<br />
              </div>
            }
            pathOptions={{
              fillColor: colorScale(item.value).hex()
            }}
          />
        )
      })}
    </MapContainer>
      {
        !showOffcanvas && 
        <div style={{ position: 'absolute', zIndex: 999, right: 10, top: 10, padding: 10, borderRadius: 10, background: 'white', cursor: 'pointer' }} onClick={() => setShowOffcanvas(true)}>
          <FontAwesomeIcon icon={faCog} />
        </div>
      }
      <Offcanvas 
        show={showOffcanvas} 
        onHide={() => setShowOffcanvas(false)} 
        backdrop={false} 
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ padding: '0 20px' }}>
          <Form.Check 
            type="checkbox"
            id={'showDataOverlay'}
            label={'Show Data Overlay'}
            checked={showMarker.data_overlay}
            onChange={e => setShowMarker({ ...showMarker, data_overlay: !showMarker.data_overlay })}
          />
          </div>
          {showMarker.data_overlay && <div style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
              {_100.map(i => 
                <span key={i} style={{ 
                  display: 'inline-block', 
                  backgroundColor: colorScale(i/100 * max).hex(), 
                  width: '1%', height: 10 
                }}>
              </span>)}
              <code style={{ display: 'inline-block', marginBottom: 10 }}>0 - {max} ({selectedData[selectedX][selectedY].filter(d => d.value !== null).length} entries)<br /></code>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Data:&nbsp;<span style={{ opacity: 0.5 }}>{data_entries[selectedDataKey].title} ({Object.keys(data_entries).length})</span></Accordion.Header>
              <Accordion.Body>
              {Object.keys(data_entries).map((key) => 
                  <Form.Check 
                    key={key}
                    type="radio"
                    id={key}
                    label={
                      <OverlayTrigger  
                        key={key}
                        placement="left"
                        overlay={
                          <BTooltip id={`tooltip-${key}`}>
                            {Object.keys(data_entries[key].data[Object.keys(data_entries[key].data)[0]]).join('\n\n')}
                          </BTooltip>
                        }
                      >
                        <span style={{ textTransform: 'capitalize' }}>
                          {data_entries[key].title}
                        </span>
                      </OverlayTrigger>
                    }
                    checked={selectedDataKey === key}
                    onChange={e => setSelectedDataKey(key)}
                  />
              )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Year:&nbsp;<span style={{ opacity: 0.5 }}>{selectedX} ({xKeys.length})</span></Accordion.Header>
              <Accordion.Body>
              {Object.keys(selectedData).reverse().map(x => 
                <Form.Check 
                  key={x}
                  type="radio"
                  id={x}
                  label={x}
                  checked={selectedX === x}
                  onChange={e => setSelectedX(x)}
                />
              )}
              </Accordion.Body>
            </Accordion.Item>
            {yKeys.length > 1 && <Accordion.Item eventKey="2">
              <Accordion.Header>Category:&nbsp;<span style={{ opacity: 0.5 }}>{selectedY} ({yKeys.length})</span></Accordion.Header>
              <Accordion.Body>
              {Object.keys(selectedData[selectedX]).sort().map(y => 
                <Form.Check 
                  key={y}
                  type="radio"
                  id={y}
                  label={y}
                  checked={selectedY === y}
                  onChange={e => setSelectedY(y)}
                />
              )}
              </Accordion.Body>
            </Accordion.Item>}
          </Accordion>
          </div>
          }
          <div style={{ padding: '0 20px' }}>
            <Form.Check 
              type="checkbox"
              id={'showBusStops'}
              label={'Show Bus Stops'}
              checked={showMarker.bus_stops}
              onChange={e => setShowMarker({ ...showMarker, bus_stops: !showMarker.bus_stops })}
            />
            <Form.Check 
              type="checkbox"
              id={'showTrainStops'}
              label={'Show Train Stops'}
              checked={showMarker.train_stops}
              onChange={e => setShowMarker({ ...showMarker, train_stops: !showMarker.train_stops })}
            />
            <Form.Check 
              type="checkbox"
              id={'showTramStops'}
              label={'Show Tram Stops'}
              checked={showMarker.tram_stops}
              onChange={e => setShowMarker({ ...showMarker, tram_stops: !showMarker.tram_stops })}
            />
            <Form.Check 
              type="checkbox"
              id={'showSwimmingPools'}
              label={'Show Swimming Pools'}
              checked={showMarker.swimming_pools}
              onChange={e => setShowMarker({ ...showMarker, swimming_pools: !showMarker.swimming_pools })}
            />
            <Form.Check 
              type="checkbox"
              id={'showFitnessStuidos'}
              label={'Show Fitness Studios'}
              checked={showMarker.fitness_stuidos}
              onChange={e => setShowMarker({ ...showMarker, fitness_stuidos: !showMarker.fitness_stuidos })}
            />
            <Form.Check 
              type="checkbox"
              id={'showDaycares'}
              label={'Show Daycares'}
              checked={showMarker.daycares}
              onChange={e => setShowMarker({ ...showMarker, daycares: !showMarker.daycares })}
            />
            <Form.Check 
              type="checkbox"
              id={'showPlaygrounds'}
              label={'Show Playgrounds'}
              checked={showMarker.playgrounds}
              onChange={e => setShowMarker({ ...showMarker, playgrounds: !showMarker.playgrounds })}
            />
            <Form.Check 
              type="checkbox"
              id={'showBikeLanes'}
              label={'Show Bike Lanes'}
              checked={showMarker.bike_lanes}
              onChange={e => setShowMarker({ ...showMarker, bike_lanes: !showMarker.bike_lanes })}
            />
            <Form.Check 
              type="checkbox"
              id={'showParks'}
              label={'Show Parks'}
              checked={showMarker.parks}
              onChange={e => setShowMarker({ ...showMarker, parks: !showMarker.parks })}
            />
            <Form.Check 
              type="checkbox"
              id={'showSupermarkets'}
              label={'Show Supermarkets'}
              checked={showMarker.supermarkets}
              onChange={e => setShowMarker({ ...showMarker, supermarkets: !showMarker.supermarkets })}
            />
            <Form.Check 
              type="checkbox"
              id={'showMarkets'}
              label={'Show Markets'}
              checked={showMarker.markets}
              onChange={e => setShowMarker({ ...showMarker, markets: !showMarker.markets })}
            />
          </div>
          <hr />
          <div style={{ fontSize: 12 }}>
            <Button variant="link" size="sm" onClick={() => setShowCreditsModal(true)}>Credit / Sources</Button><br />
            <CreditsModal 
              show={showCreditsModal}
              onHide={() => setShowCreditsModal(false)}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Map;