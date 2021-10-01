import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faSwimmingPool, faSwimmer, faChild, faBaby, faHome, faSubway, faTrain, faDumbbell, faShoppingBasket, faTree } from '@fortawesome/free-solid-svg-icons'

import MapMarkers from './MapMarkers'

import { colors } from './MarkerToggles'

const Markers = ({ showMarker, cache }) => <>
  {showMarker.bus_stops && 
    <MapMarkers
      data={cache.bus_stops.elements}
      renderTooltip={item =>
        <div>{item.tags.name} ({item.tags.network})<br />(click for details)</div>
      }
      renderIcon={item => <FontAwesomeIcon color={colors.bus_stops} icon={faBus} />}
      renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
    />
  }

  {showMarker.swimming_pools && 
    <MapMarkers
      data={cache.swimming_pools}
      renderTooltip={item => <div>{item.title}<br />(click for details)</div>}
      renderIcon={item => 
          item.type === 'indoor_pool' ? 
          <FontAwesomeIcon color={colors.swimming_pools} icon={faSwimmingPool} /> : 
          <FontAwesomeIcon color={colors.swimming_pools} icon={faSwimmer} />
      }
      renderLink={item => item.link}
    />
  }
  {showMarker.tram_stops && 
    <MapMarkers
      data={cache.tram_stops.elements}
      renderTooltip={item => 
        <div>{item.tags.name} ({item.tags.network})<br />(click for details)</div>
      }
      renderIcon={item => <FontAwesomeIcon color={colors.tram_stops} icon={faTrain} />}
      renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
    />
  }
  {showMarker.train_stops && 
    <MapMarkers
      data={cache.train_stops.elements}
      renderTooltip={item => {
        return (
          <div>
            {item.tags.name}<br />
            {item.tags.operator}<br />
            (click for details)
          </div>
        )
      }}
      renderIcon={item => <FontAwesomeIcon color={colors.train_stops} icon={faSubway} />}
      renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
    />
  }
  {showMarker.fitness_stuidos && 
    <MapMarkers
      data={cache.fitness_stuidos.elements}
      renderTooltip={item => <div>{item.tags.name}<br />(click for details)</div>}
      renderIcon={item => <FontAwesomeIcon color={colors.fitness_stuidos} icon={faDumbbell} />}
      renderLink={item => `https://www.openstreetmap.org/${item.type}/${item.id}`}
    />
  }
  {showMarker.daycares && 
    <MapMarkers
      data={cache.daycares}
      renderTooltip={item => <div>{item.name}<br />{item.address ? item.address.full : null}</div>}
      renderIcon={item => <FontAwesomeIcon color={colors.daycares} icon={faBaby} />}
      renderLink={item => item.address ? `https://www.openstreetmap.org/search?query=${item.address.full}` : '#'}
    />
  }
  {showMarker.markets && 
    <MapMarkers
      data={cache.markets}
      renderTooltip={item => <div>{item.title}<br />{item.opening_hours}<br />{item.location}</div>}
      renderIcon={item => <FontAwesomeIcon color={colors.markets} icon={faHome} />}
      renderLink={item => `https://www.openstreetmap.org/search?query=${item.location}`}
    />
  }
  {showMarker.playgrounds && 
    <MapMarkers
      data={cache.playgrounds}
      renderTooltip={item => <div>{item.name}<br />{item.location}</div>}
      renderIcon={item => <FontAwesomeIcon color={colors.playgrounds} icon={faChild} />}
      renderLink={item => `https://www.openstreetmap.org/search?query=${item.lat},${item.lon}`}
    />
  }
  {showMarker.supermarkets && 
    <MapMarkers
      data={cache.supermarkets.elements}
      renderTooltip={item => <div>{item.tags.name}<br />{item.tags.organic ? `organic: ${item.tags.organic}`: ''}</div>}
      renderIcon={item => <FontAwesomeIcon color={item.tags.organic ? 'green' : colors.supermarkets} icon={faShoppingBasket} />}
      renderLink={item => `https://www.openstreetmap.org/search?query=${item.lat},${item.lon}`}
    />
  }
  {showMarker.parks && 
    <MapMarkers
      data={cache.parks.filter(p => p.tags?.name)}
      renderTooltip={item => item.tags.name}
      renderIcon={item => <FontAwesomeIcon color={colors.parks} icon={faTree} />}
      renderLink={item => `https://www.openstreetmap.org/search?query=${item.lat},${item.lon}`}
    />
  }
</>

export default Markers;
