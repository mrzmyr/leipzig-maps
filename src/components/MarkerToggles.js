import { faBaby, faBicycle, faBus, faChild, faDumbbell, faHome, faLocationArrow, faShoppingBasket, faSubway, faSwimmingPool, faTrain, faTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'rc-switch/assets/index.css';
import SwitchLine from './SwitchLine';

export const colors = {
  bus_stops: '#1a73e8',
  train_stops: '#1a73e8',
  tram_stops: '#1a73e8',
  own_location: '#1a73e8',
  swimming_pools: '#7986cb',
  fitness_stuidos: '#78909c',
  daycares: '#f06292',
  playgrounds: '#f06292',
  bike_lanes: '#5565dd',
  parks: '#34a853',
  supermarkets: '#f29900',
  markets: '#f29900',
}

const MarkerToggles = ({
  showMarker,
  toggleMarkers,
  setShowMarker,
  loadings,
}) => {  
  return (
    <div>
      { 
        "geolocation" in navigator && 
        <SwitchLine
          loading={loadings.own_location}
          checked={showMarker.own_location}
          onChange={e => setShowMarker({ ...showMarker, own_location: !showMarker.own_location })}
          icon={<FontAwesomeIcon color={colors.own_location} icon={faLocationArrow} />}
          label="Eigenen Standort anzeigen"
        />
      }
      <SwitchLine
        loading={loadings.bus_stops}
        checked={showMarker.bus_stops}
        onChange={e => toggleMarkers('bus_stops')}
        icon={<FontAwesomeIcon color={colors.bus_stops} icon={faBus} />}
        label="Bushaltestellen anzeigen"
      />
      <SwitchLine
        loading={loadings.train_stops}
        checked={showMarker.train_stops}
        onChange={e => toggleMarkers('train_stops')}
        icon={<FontAwesomeIcon color={colors.train_stops} icon={faSubway} />}
        label="Zugbahnhöfe anzeigen"
      />
      <SwitchLine
        loading={loadings.tram_stops}
        checked={showMarker.tram_stops}
        onChange={e => toggleMarkers('tram_stops')}
        icon={<FontAwesomeIcon color={colors.tram_stops} icon={faTrain} />}
        label="Tramstops anzeigen"
      />
      <SwitchLine
        loading={loadings.swimming_pools}
        checked={showMarker.swimming_pools}
        onChange={e => toggleMarkers('swimming_pools')}
        icon={<FontAwesomeIcon color={colors.swimming_pools} icon={faSwimmingPool} />}
        label="Swimming Pools anzeigen"
      />
      <SwitchLine
        loading={loadings.fitness_stuidos}
        checked={showMarker.fitness_stuidos}
        onChange={e => toggleMarkers('fitness_stuidos')}
        icon={<FontAwesomeIcon color={colors.fitness_stuidos} icon={faDumbbell} />}
        label="Fitness Studios anzeigen"
      />
      <SwitchLine
        loading={loadings.daycares}
        checked={showMarker.daycares}
        onChange={e => toggleMarkers('daycares')}
        icon={<FontAwesomeIcon color={colors.daycares} icon={faBaby} />}
        label="Kitas anzeigen"
      />
      <SwitchLine
        loading={loadings.playgrounds}
        checked={showMarker.playgrounds}
        onChange={e => toggleMarkers('playgrounds')}
        icon={<FontAwesomeIcon color={colors.playgrounds} icon={faChild} />}
        label="Spielplätze anzeigen"
      />
      <SwitchLine
        loading={loadings.bike_lanes}
        checked={showMarker.bike_lanes}
        onChange={e => setShowMarker({ ...showMarker, bike_lanes: !showMarker.bike_lanes })}
        icon={<FontAwesomeIcon color={colors.bike_lanes} icon={faBicycle} />}
        label="Radwege anzeigen"
      />
      <SwitchLine
        loading={loadings.parks}
        checked={showMarker.parks}
        onChange={e => toggleMarkers('parks')}
        icon={<FontAwesomeIcon color={colors.parks} icon={faTree} />}
        label="Parks anzeigen"
      />
      <SwitchLine
        loading={loadings.supermarkets}
        checked={showMarker.supermarkets}
        onChange={e => toggleMarkers('supermarkets')}
        icon={<FontAwesomeIcon color={colors.supermarkets} icon={faShoppingBasket} />}
        label="Supermärkte anzeigen"
      />
      <SwitchLine
        loading={loadings.markets}
        checked={showMarker.markets}
        onChange={e => toggleMarkers('markets')}
        icon={<FontAwesomeIcon color={colors.markets} icon={faHome} />}
        label="Wochenmärkte anzeigen"
      />
    </div>
  )
}

export default MarkerToggles;
