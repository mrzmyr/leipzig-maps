import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faSwimmingPool, faSwimmer, faChild, faBaby, faHome, faSubway, faTrain, faDumbbell, faShoppingBasket, faTree, faCouch } from '@fortawesome/free-solid-svg-icons'

import MapMarkers from './MapMarkers'
import { contrastColor } from 'contrast-color'

import { colors } from './MarkerToggles'
import { isAfter, isBefore, parse, sub } from 'date-fns';

const Markers = ({ 
  cache,
  showMarker, 
  apartmentOptions,
}) => <>
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
  {showMarker.ebay_apartments &&
    <MapMarkers
      data={cache.ebay_apartments}
      isVisible={item => {
        if(item.only_trade === true && apartmentOptions.show_trade === 'none') {
          return false;
        }

        if(item.only_trade !== true && apartmentOptions.show_trade === 'only') {
          return false;
        }

        if(
          apartmentOptions.configuration.length > 0 &&
          !apartmentOptions.configuration.every(d => item.configuration.includes(d))
        ) {
          return false;
        }

        if(apartmentOptions.owner_type === 'private_only' && item.user.private !== true) {
          return false;
        }

        if(apartmentOptions.owner_type === 'commercial_only' && item.user.private === true) {
          return false;
        }

        if(
          apartmentOptions.age !== null &&
          isBefore(parse(item.extra_info.date_created, 'dd.MM.yyyy', new Date()), sub(new Date(), { days: apartmentOptions.age }))
        ) {
          return false;
        }
        
        return (
          item.rooms_total >= apartmentOptions.rooms_min &&
          item.rooms_total <= apartmentOptions.rooms_max &&
          item.size >= apartmentOptions.size_min &&
          item.size <= apartmentOptions.size_max &&
          item.price_warm >= apartmentOptions.price_warm_min &&
          item.price_warm <= apartmentOptions.price_warm_max
        )
      }}
      renderTooltip={item =>
        <div style={{ minWidth: 200, maxWidth: 400, padding: '5px 10px', textAlign: 'left', fontSize: '0.8rem' }}>
          {/* <img src={item.image_urls[0]} alt={item.title} width="100" /><br /> */}
          <strong style={{ whiteSpace: 'pre-wrap' }}>{item.title}</strong> <br />
          Erstellt: {item.extra_info.date_created}<br />
          {item.rooms_total} Zimmer ({item.size}m²) <br />
          {item.floor && <div>{item.floor}. Etage</div>}
          <div>Preis: {item.price_warm}&nbsp;€ ({item.price_size_ratio}€/m²)</div>
        </div>
      }
      renderIcon={item => {
        if(!apartmentOptions.highlight_on) {
          return <FontAwesomeIcon color={colors.ebay_apartments} icon={faCouch} />;
        } else {
          if(!item[apartmentOptions.highlight_category]) {
            console.log(apartmentOptions.highlight_category, 'not found in item', item)
            return null;
          }
          
          const backgroundColor = apartmentOptions.highlight_scale(item[apartmentOptions.highlight_category]);
          const color = contrastColor({ bgColor: backgroundColor });
          const style = { 
            color,
            backgroundColor, 
            width: 20, 
            height: 20, 
            border: 'none', 
            borderRadius: 3, 
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px' 
          };
          
          if(apartmentOptions.highlight_category === 'price_warm') {
            return (
              <div style={{...style,  width: 40, transform: 'translateX(-50%)' }}>
                {item[apartmentOptions.highlight_category]} {apartmentOptions.highlight_unit}
              </div>
            )
          }

          if(apartmentOptions.highlight_category === 'price_size_ratio') {
            return (
              <div style={{...style,  width: 50, transform: 'translateX(-50%)' }}>
                {item[apartmentOptions.highlight_category]}&nbsp;{apartmentOptions.highlight_unit}
              </div>
            )
          }

          if(apartmentOptions.highlight_category === 'size') {
            return (
              <div style={{...style,  width: 60, transform: 'translateX(-50%)' }}>
                {item[apartmentOptions.highlight_category]} {apartmentOptions.highlight_unit}
              </div>
            )
          }

          return (
            <div style={style}>
              {item[apartmentOptions.highlight_category]} {apartmentOptions.highlight_unit}
            </div>
          )
        }
      }}
      renderLink={item => `${item.url}`}
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
