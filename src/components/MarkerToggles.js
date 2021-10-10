import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faSwimmingPool, faChild, faBaby, faHome, faSubway, faTrain, faDumbbell, faShoppingBasket, faTree, faBicycle, faCouch } from '@fortawesome/free-solid-svg-icons'

export const colors = {
  bus_stops: '#1a73e8',
  train_stops: '#1a73e8',
  tram_stops: '#1a73e8',
  swimming_pools: '#7986cb',
  fitness_stuidos: '#78909c',
  daycares: '#f06292',
  playgrounds: '#f06292',
  bike_lanes: '#5565dd',
  parks: '#34a853',
  supermarkets: '#f29900',
  markets: '#f29900',
  ebay_apartments: '#8c0e0d',
}

const MarkerToggles = ({
  showMarker,
  toggleMarkers,
  setShowMarker,
  loadings,
}) => {  
  return (
    <div style={{ padding: '0 20px' }}>
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        disabled={loadings.bus_stops}
        type="checkbox"
        id={'showBusStops'}
        label={<span>{loadings.bus_stops ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.bus_stops} icon={faBus} />} Bushaltestellen anzeigen</span>}
        checked={showMarker.bus_stops}
        onChange={e => toggleMarkers('bus_stops')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.train_stops}
        type="checkbox"
        id={'showTrainStops'}
        label={<span>{loadings.train_stops ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.train_stops} icon={faSubway} />} Zugbahnhöfe anzeigen</span>}
        checked={showMarker.train_stops}
        onChange={e => toggleMarkers('train_stops')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.tram_stops}
        type="checkbox"
        id={'showTramStops'}
        label={<span>{loadings.tram_stops ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.tram_stops} icon={faTrain} />} Tramstops anzeigen</span>}
        checked={showMarker.tram_stops}
        onChange={e => toggleMarkers('tram_stops')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.swimming_pools}
        type="checkbox"
        id={'showSwimmingPools'}
        label={<span>{loadings.swimming_pools ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.swimming_pools} icon={faSwimmingPool} />} Swimming Pools anzeigen</span>}
        checked={showMarker.swimming_pools}
        onChange={e => toggleMarkers('swimming_pools')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.fitness_stuidos}
        type="checkbox"
        id={'showFitnessStuidos'}
        label={<span>{loadings.fitness_stuidos ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.fitness_stuidos} icon={faDumbbell} />} Fitness Studios anzeigen</span>}
        checked={showMarker.fitness_stuidos}
        onChange={e => toggleMarkers('fitness_stuidos')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.daycares}
        type="checkbox"
        id={'showDaycares'}
        label={<span>{loadings.daycares ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.daycares} icon={faBaby} />} Kitas anzeigen</span>}
        checked={showMarker.daycares}
        onChange={e => toggleMarkers('daycares')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.playgrounds}
        type="checkbox"
        id={'showPlaygrounds'}
        label={<span>{loadings.playgrounds ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.playgrounds} icon={faChild} />} Spielplätze anzeigen</span>}
        checked={showMarker.playgrounds}
        onChange={e => toggleMarkers('playgrounds')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.bike_lanes}
        type="checkbox"
        id={'showBikeLanes'}
        label={<span>{loadings.bike_lanes ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.bike_lanes} icon={faBicycle} />} Radwege anzeigen</span>}
        checked={showMarker.bike_lanes}
        onChange={e => setShowMarker({ ...showMarker, bike_lanes: !showMarker.bike_lanes })}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.parks}
        type="checkbox"
        id={'showParks'}
        label={<span>{loadings.parks ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.parks} icon={faTree} />} Parks anzeigen</span>}
        checked={showMarker.parks}
        onChange={e => toggleMarkers('parks')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.supermarkets}
        type="checkbox"
        id={'showSupermarkets'}
        label={<span>{loadings.supermarkets ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.supermarkets} icon={faShoppingBasket} />} Supermärkte anzeigen</span>}
        checked={showMarker.supermarkets}
        onChange={e => toggleMarkers('supermarkets')}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }} 
        disabled={loadings.markets}
        type="checkbox"
        id={'showMarkets'}
        label={<span>{loadings.markets ? <Spinner animation="border" size="sm" /> : <FontAwesomeIcon color={colors.markets} icon={faHome} />} Wochenmärkte anzeigen</span>}
        checked={showMarker.markets}
        onChange={e => toggleMarkers('markets')}
      />
    </div>
  )
}

export default MarkerToggles;
