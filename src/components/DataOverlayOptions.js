import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import useInterval from '../hooks/useInterval'

const DataOverlayOptions = ({ 
  dataEntries, 
  cache, 
  selectedDataKey, 
  selectedX,
  selectedY,
  setSelectedX, 
  setSelectedY,
  selectDataOverlayCategory,
  loadings,
}) => {

  const selectedData = cache[selectedDataKey];
  const xKeys = selectedData ? Object.keys(selectedData) : []
  const yKeys = selectedData ? Object.keys(selectedData[xKeys[0]]) : []

  const [playingYears, setPlayingYears] = useState(false);

  const goToNextYear = () => {
    if(!selectedData) return;
    
    const index = xKeys.indexOf(selectedX);
    const indexNext = index + 1 > Object.keys(selectedData).length - 1 ? 0 : index + 1;
    console.log(index, indexNext)
    setSelectedX(xKeys[indexNext])
  }
  
  useInterval(() => goToNextYear(), playingYears ? 500 : null);
  
  return (
    <div style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 5, }}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Kategorie&nbsp;<span style={{ opacity: 0.5 }}>{dataEntries[selectedDataKey].title} ({Object.keys(dataEntries).length})</span></Accordion.Header>
          <Accordion.Body>
          {Object.keys(dataEntries).map((key) => 
              <Form.Check 
                key={key}
                type="radio"
                id={key}
                label={
                    <span style={{ textTransform: 'capitalize' }}>
                      {dataEntries[key].title}&nbsp;
                      {loadings[key] && <Spinner animation="border" size="sm" />}
                    </span>
                }
                checked={selectedDataKey === key}
                onChange={e => selectDataOverlayCategory(key)}
              />
          )}
          </Accordion.Body>
        </Accordion.Item>
        {yKeys.length > 1 && <Accordion.Item eventKey="1">
          <Accordion.Header>Unterkategorie:&nbsp;<span style={{ opacity: 0.5 }}>{selectedY} ({yKeys.length})</span></Accordion.Header>
          <Accordion.Body>
          {loadings[selectedDataKey] && <Spinner animation="border" size="sm" />}
          {!!selectedData && selectedData[selectedX] && Object.keys(selectedData[selectedX]).sort().map(y => 
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
        <Accordion.Item eventKey="2">
          <Accordion.Header>Jahr:&nbsp;<span style={{ opacity: 0.5 }}>{selectedX} ({xKeys.length})</span></Accordion.Header>
          <Accordion.Body>
          <Button style={{ marginBottom: 10, float: 'right' }} size="sm" onClick={() => setPlayingYears(playingYears => !playingYears)}>
            {playingYears ? <><FontAwesomeIcon icon={faPauseCircle} /> Pause</> : <><FontAwesomeIcon icon={faPlayCircle} /> Abspielen</>}
          </Button>
          {loadings[selectedDataKey] && <Spinner animation="border" size="sm" />}
          {!!selectedData && Object.keys(selectedData).reverse().map(x => 
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
      </Accordion>
    </div>
  )
}

export default DataOverlayOptions;