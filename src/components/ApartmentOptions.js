import chroma from 'chroma-js';
import 'rc-slider/assets/index.css';
import Form from 'react-bootstrap/Form';
import ColorScale from './ColorScale';

import Slider, { SliderTooltip } from 'rc-slider';
import { sub } from 'date-fns';
const { Handle, createSliderWithTooltip } = Slider;
const SliderWithTooltip = createSliderWithTooltip(Slider.Range);

const handleStyle = {
  borderColor: 'blue',
  height: 28,
  width: 28,
  backgroundColor: 'blue',
}

const RoomsSlider = ({
  data,
  setApartmentOptions
}) => {

  let rooms_numbers = data.filter(d => !isNaN(d.rooms_total)).map(d => d.rooms_total)

  const minRoomsTotal = data ? Math.min(...rooms_numbers) : 0;
  const maxRoomsTotal = data ? Math.max(...rooms_numbers) : 0;
  let roomsTotalMarks = {}
  for(let i = minRoomsTotal; i <= maxRoomsTotal; i++) {
    roomsTotalMarks[i] = i;
  }
  
  return (
    <div style={{
      padding: '5px 15px',
      marginBottom: 10
    }}>
      <Slider.Range
        min={minRoomsTotal} 
        max={maxRoomsTotal}
        defaultValue={[minRoomsTotal, maxRoomsTotal]}
        marks={roomsTotalMarks} 
        step={1}
        allowCross={false}
        style={{ height: 40 }}
        onAfterChange={e => setApartmentOptions(o => ({ ...o, rooms_min: e[0], rooms_max: e[1] }))}
      />
    </div>
  )
}

const PriceSlider = ({
  data,
  setApartmentOptions
}) => {

  let price_numbers = data.filter(d => !isNaN(d.price_warm)).map(d => d.price_warm)
  
  const min = data ? Math.min(...price_numbers) : 0;
  const max = data ? Math.max(...price_numbers) : 0;
  
  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
  
  return (
    <div style={{
      padding: '5px 15px',
      marginBottom: 10
    }}>
      <SliderWithTooltip
        min={0} 
        max={max}
        defaultValue={[0, max]} 
        allowCross={false}
        style={{ height: 40 }}
        handle={handle}
        marks={{ [0]: `${0} €`, [max]: `${max} €` }}
        step={100}
        tipFormatter={value => `${value}€`}
        onAfterChange={e => setApartmentOptions(o => ({ 
          ...o, 
          price_warm_min: e[0], 
          price_warm_max: e[1] 
        }))}
      />
    </div>
  )
}

const SizeSlider = ({
  data,
  setApartmentOptions
}) => {

  let numbers = data.filter(d => !isNaN(d.size)).map(d => d.size)
  const min = data ? Math.min(...numbers) : 0;
  const max = data ? Math.max(...numbers) : 0;
  
  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} m²`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
  
  return (
    <div style={{
      padding: '5px 15px',
      marginBottom: 10
    }}>
    <SliderWithTooltip
      min={min} 
      max={max}
      defaultValue={[min, max]} 
      allowCross={false}
      handle={handle}
      marks={{ [min]: `${min} m²`, [max]: `${max} m²` }}
      style={{ height: 40 }}
      step={10}
      tipFormatter={value => `${value}m²`}
      onAfterChange={e => setApartmentOptions(o => ({ 
        ...o, 
        size_min: e[0], 
        size_max: e[1] 
      }))}
    />
    </div>
  )
}

const TradeOptions = ({
  apartmentOptions,
  setApartmentOptions,
}) => {
  return (
    <div style={{
      padding: '5px 10px',
      marginBottom: 20,
    }}>
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={'showApartmentOptionsTradeOnly'}
        label={<span>Nur Tausch</span>}
        checked={apartmentOptions.show_trade === 'only'}
        onChange={e => {
          setApartmentOptions(o => ({
            ...o, 
            show_trade: 'only'
          }))
        }}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={'showApartmentOptionsTradeNone'}
        label={<span>Kein Tausch</span>}
        checked={apartmentOptions.show_trade === 'none'}
        onChange={e => {
          setApartmentOptions(o => ({ 
            ...o, 
            show_trade: 'none'
          }))
        }}
      />
    </div>
  )
}

const CreatorTypeOptions = ({
  apartmentOptions,
  setApartmentOptions,
}) => {
  return (
    <div style={{
      padding: '5px 10px',
      marginBottom: 20,
    }}>
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={'showApartmentOptionsOwnerTypeBoth'}
        label={<span>Alle</span>}
        checked={apartmentOptions.owner_type === null}
        onChange={e => {
          setApartmentOptions(o => ({
            ...o, 
            owner_type: null
          }))
        }}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={'showApartmentOptionsOwnerTypePrivate'}
        label={<span>Nur Privat</span>}
        checked={apartmentOptions.owner_type === 'private_only'}
        onChange={e => {
          setApartmentOptions(o => ({
            ...o, 
            owner_type: 'private_only'
          }))
        }}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={'showApartmentOptionsOwnerTypeCompany'}
        label={<span>Nur Gewerblich</span>}
        checked={apartmentOptions.owner_type === 'commercial_only'}
        onChange={e => {
          setApartmentOptions(o => ({ 
            ...o, 
            owner_type: 'commercial_only'
          }))
        }}
      />
    </div>
  )
}

const ConfigurationOptions = ({
  data,
  apartmentOptions,
  setApartmentOptions,
}) => {
  const configurationItems = [];

  if(data) {
    data.forEach(d => d.configuration.forEach(c => {
      if(!configurationItems.includes(c)) configurationItems.push(c)
    }))
  }
  
  return (
    <div style={{ 
      height: 300, 
      overflow: 'scroll', 
      border: '1px solid #EEE', 
      padding: '5px 10px',
      marginBottom: 10,
    }}>
      { configurationItems.filter(d => !!d).map(c => {
        return (
          <Form.Check
            key={c}
            style={{ paddingTop: 3, paddingBottom: 3 }}
            type="checkbox"
            id={`apartmentOptionsConfigruation${c}`}
            label={<span>{c}</span>}
            checked={apartmentOptions.configuration.includes(c)}
            onChange={e => {
              setApartmentOptions(o => {
                let newConfiguration = [...o.configuration];
                if(o.configuration.includes(c)) {
                  newConfiguration.splice(newConfiguration.indexOf(c), 1)
                } else {
                  newConfiguration.push(c)
                }
                return { ...o, configuration: newConfiguration }
              })
            }}
          />
        )
      }) }
    </div>
  )
}

const AgeOptions = ({
  apartmentOptions,
  setApartmentOptions,
}) => {
  
  return (
    <div style={{
      padding: '5px 10px',
      marginBottom: 10,
    }}>
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={`apartmentOptionsAgeAll`}
        label={<span>Alle</span>}
        checked={apartmentOptions.age === null}
        onChange={e => {
          setApartmentOptions(o => ({ ...o, age: null }))
        }}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={`apartmentOptionsAgeOneDay`}
        label={<span>Vor einem Tag erstellt</span>}
        checked={apartmentOptions.age === 1}
        onChange={e => {
          setApartmentOptions(o => ({ ...o, age: 1 }))
        }}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={`apartmentOptionsAgeThreeDay`}
        label={<span>Vor 3 Tagen erstellt</span>}
        checked={apartmentOptions.age === 3}
        onChange={e => {
          setApartmentOptions(o => ({ ...o, age: 3 }))
        }}
      />
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="radio"
        id={`apartmentOptionsAgeSevenDay`}
        label={<span>Vor 7 Tagen erstellt</span>}
        checked={apartmentOptions.age === 7}
        onChange={e => {
          setApartmentOptions(o => ({ ...o, age: 7 }))
        }}
      />
    </div>
  )
}

const HighlightOptions = ({
  data,
  apartmentOptions,
  setApartmentOptions,
}) => {
  
  let numbers_size = data.filter(d => !isNaN(d.size)).map(d => d.size)
  const sizeMin = data ? Math.min(...numbers_size) : 0;
  const sizeMax = data ? Math.max(...numbers_size) : 0;

  let numbers_price = data.filter(d => !isNaN(d.price_warm)).map(d => d.price_warm)
  const priceMin = data ? Math.min(...numbers_price) : 0;
  const priceMax = data ? Math.max(...numbers_price) : 0;
  
  let numbers_rooms = data.filter(d => !isNaN(d.rooms_total)).map(d => d.rooms_total)
  const roomsMin = data ? Math.min(...numbers_rooms) : 0;
  const roomsMax = data ? Math.max(...numbers_rooms) : 0;

  let numbers_price_size_ratio = data.filter(d => !isNaN(d.price_size_ratio)).map(d => d.price_size_ratio)
  const priceSizeRatioMin = data ? Math.min(...numbers_price_size_ratio) : 0;
  const priceSizeRatioMax = data ? Math.max(...numbers_price_size_ratio) : 0;
  
  return (
    <div style={{
      padding: '5px 10px',
      marginBottom: 10,
    }}>
      <Form.Check
        style={{ paddingTop: 3, paddingBottom: 3 }}
        type="checkbox"
        id={'showApartmentOptionsHighlight'}
        label={<span>Hervorheben aktivieren</span>}
        checked={apartmentOptions.highlight_on}
        onChange={e => {
          setApartmentOptions(o => ({ 
            ...o, 
            highlight_on: !o.highlight_on,
            highlight_category: 'price_warm',
            highlight_scale: chroma.scale('YlOrRd').domain([priceMin, priceMax]),
            highlight_min: priceMin,
            highlight_max: priceMax,
            highlight_unit: '€',
          }))
        }}
      />
      { apartmentOptions.highlight_on &&
        <div>
          <Form.Check
            type="radio"
            id="highlightPrice"
            label="Preis"
            checked={apartmentOptions.highlight_category === 'price_warm'}
            onChange={e => setApartmentOptions(o => ({ ...o, 
              highlight_category: 'price_warm',
              highlight_scale: chroma.scale('YlOrRd').domain([priceMin, priceMax]),
              highlight_min: priceMin,
              highlight_max: priceMax,
              highlight_unit: '€',
          }))}
          />
          <Form.Check
            type="radio"
            id="highlightRooms"
            label="Räume"
            checked={apartmentOptions.highlight_category === 'rooms_total'}
            onChange={e => setApartmentOptions(o => ({ 
              ...o, 
              highlight_category: 'rooms_total',
              highlight_scale: chroma.scale('PuBu').domain([roomsMin, roomsMax]),
              highlight_min: roomsMin,
              highlight_max: roomsMax,
              highlight_unit: '',
            }))}
          />
          <Form.Check
            type="radio"
            id="highlightSize"
            label="Größe"
            checked={apartmentOptions.highlight_category === 'size'}
            onChange={e => setApartmentOptions(o => ({ 
              ...o, 
              highlight_category: 'size',
              highlight_scale: chroma.scale('RdPu').domain([sizeMin, sizeMax]),
              highlight_min: sizeMin,
              highlight_max: sizeMax,
              highlight_unit: 'm²',
            }))}
          />
          <Form.Check
            type="radio"
            id="highlightPriceSizeRation"
            label="Quadratmeterpreis"
            checked={apartmentOptions.highlight_category === 'price_size_ratio'}
            onChange={e => setApartmentOptions(o => ({ 
              ...o, 
              highlight_category: 'price_size_ratio',
              highlight_scale: chroma.scale('OrRd').domain([priceSizeRatioMin, priceSizeRatioMax]),
              highlight_min: priceSizeRatioMin,
              highlight_max: priceSizeRatioMax,
              highlight_unit: '€/m²',
            }))}
          />
        </div>
      }
    </div>
  )
}

const ApartmentOptions = ({ 
  data,
  setApartmentOptions,
  apartmentOptions,
}) => {
  return (
    <div style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 5, }}>
      <p className="h6">Hervorheben</p>
      <HighlightOptions data={data} setApartmentOptions={setApartmentOptions} apartmentOptions={apartmentOptions} />
      <p className="h6">Filter: Räume</p>
      <RoomsSlider data={data} setApartmentOptions={setApartmentOptions} />
      <p className="h6">Filter: Preis (Warm)</p>
      <PriceSlider data={data} setApartmentOptions={setApartmentOptions} />
      <p className="h6">Filter: Größe</p>
      <SizeSlider data={data} setApartmentOptions={setApartmentOptions} />
      <p className="h6">Filter: Tausch</p>
      <TradeOptions setApartmentOptions={setApartmentOptions} apartmentOptions={apartmentOptions} />
      <p className="h6">Filter: Nutzer Typ</p>
      <CreatorTypeOptions setApartmentOptions={setApartmentOptions} apartmentOptions={apartmentOptions} />
      <p className="h6">Filter: Erstellt am</p>
      <AgeOptions setApartmentOptions={setApartmentOptions} apartmentOptions={apartmentOptions} />
      <p className="h6">Filter: Ausstattung</p>
      <ConfigurationOptions data={data} setApartmentOptions={setApartmentOptions} apartmentOptions={apartmentOptions} />
      <hr />
    </div>
  )
}

export default ApartmentOptions;